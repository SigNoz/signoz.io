#!/usr/bin/env node
// Interlinker: Adds helpful interlinks to Markdown/MDX based on CSV mapping.
// Constraints:
// - Do not change existing links
// - Do not add inside code blocks, inline code, tables, headings, HTML/JSX tags
// - Cap links per article = floor(totalWords/200)
// - Only one instance per target URL per source
// - Prefer one link per paragraph; avoid paragraphs that already contain a link when possible
// - Track status per CSV row: interlink_status, status_reason

import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';

// ---------------- CLI ----------------
const args = process.argv.slice(2);
const options = {
  csv: 'interlinking.csv',
  root: process.cwd(),
  dryRun: false,
  limit: Infinity,
  onlySource: null, // URL filter
  saveEvery: 50, // rows
};

for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--csv') options.csv = args[++i];
  else if (a === '--root') options.root = args[++i];
  else if (a === '--dry-run') options.dryRun = true;
  else if (a === '--limit') options.limit = Number(args[++i] || '0') || Infinity;
  else if (a === '--only-source') options.onlySource = args[++i];
  else if (a === '--save-every') options.saveEvery = Number(args[++i] || '50');
  else if (a === '--help') {
    console.log(`Usage: node scripts/interlinker.mjs [--csv interlinking.csv] [--dry-run] [--limit N] [--only-source URL] [--save-every N]\n`);
    process.exit(0);
  }
}

// ---------------- CSV PARSER/WRITER ----------------
function parseCSV(text) {
  // Robust-enough CSV parser supporting quoted fields with commas and newlines.
  const rows = [];
  let i = 0;
  const N = text.length;
  let row = [];
  let field = '';
  let inQuotes = false;
  while (i < N) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < N && text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        } else {
          inQuotes = false;
          i++;
          continue;
        }
      } else {
        field += ch;
        i++;
        continue;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
        i++;
        continue;
      }
      if (ch === ',') {
        row.push(field);
        field = '';
        i++;
        continue;
      }
      if (ch === '\n' || ch === '\r') {
        // Handle CRLF/CR/LF
        // Consume \r\n as single newline
        if (ch === '\r' && i + 1 < N && text[i + 1] === '\n') i++;
        row.push(field);
        field = '';
        rows.push(row);
        row = [];
        i++;
        continue;
      }
      field += ch;
      i++;
    }
  }
  // flush last field/row if any content (in case no trailing newline)
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function stringifyCSV(rows) {
  const escape = (v) => {
    if (v == null) v = '';
    v = String(v);
    const needs = v.includes(',') || v.includes('\n') || v.includes('\r') || v.includes('"');
    if (needs) {
      return '"' + v.replace(/"/g, '""') + '"';
    }
    return v;
  };
  return rows.map(r => r.map(escape).join(',')).join('\n') + '\n';
}

// ---------------- Helpers ----------------
const DATA_DIR = path.join(options.root, 'data');

function urlToPath(u) {
  try {
    const url = new URL(u);
    let p = url.pathname; // e.g. /blog/slug/
    if (p.endsWith('/')) p = p.slice(0, -1);
    // Map to data/<path>.mdx or .md
    let guess = path.join(DATA_DIR, p) + '.mdx';
    if (fs.existsSync(guess)) return guess;
    guess = path.join(DATA_DIR, p) + '.md';
    if (fs.existsSync(guess)) return guess;
    // fallback: index.mdx inside folder
    guess = path.join(DATA_DIR, p, 'index.mdx');
    if (fs.existsSync(guess)) return guess;
    guess = path.join(DATA_DIR, p, 'index.md');
    if (fs.existsSync(guess)) return guess;
    return null;
  } catch (e) {
    return null;
  }
}

function stripFrontMatterAndIneligibleLines(content) {
  const lines = content.split(/\r?\n/);
  let inFront = false;
  let fenceCount = 0;
  let inFence = false;
  const eligible = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (i === 0 && line.trim() === '---') { inFront = true; continue; }
    if (inFront) {
      if (line.trim() === '---') { inFront = false; }
      continue;
    }
    if (line.trim().startsWith('```')) { inFence = !inFence; continue; }
    if (inFence) continue; // skip code fences
    if (/^\s*#/.test(line)) continue; // skip headings
    if (/^\s*\|/.test(line)) continue; // skip tables
    if (/^\s*</.test(line)) continue; // skip JSX/HTML tags
    eligible.push(line);
  }
  return eligible.join('\n');
}

function wordCountEligible(content) {
  const text = stripFrontMatterAndIneligibleLines(content);
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function containsUrl(content, targetUrl) {
  // Simple check if targetUrl already present anywhere in file
  return content.includes(targetUrl);
}

function blockify(content) {
  // Build text blocks (paragraph-ish) where we can modify
  const lines = content.split(/\r?\n/);
  let inFront = false;
  let inFence = false;
  const blocks = [];
  let cur = [];
  let lineStartIndex = 0;
  let idx = 0;
  const lineStartPositions = [];
  for (const line of lines) {
    lineStartPositions.push(idx);
    idx += line.length + 1; // + newline
  }
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const startPos = lineStartPositions[i];
    if (i === 0 && line.trim() === '---') { inFront = true; continue; }
    if (inFront) { if (line.trim() === '---') inFront = false; continue; }
    if (line.trim().startsWith('```')) { inFence = !inFence; continue; }
    if (inFence) {
      if (cur.length) { blocks.push(cur); cur = []; }
      continue;
    }
    if (/^\s*#/.test(line) || /^\s*\|/.test(line) || /^\s*</.test(line)) {
      if (cur.length) { blocks.push(cur); cur = []; }
      continue;
    }
    if (line.trim() === '') {
      if (cur.length) { blocks.push(cur); cur = []; }
    } else {
      if (cur.length === 0) lineStartIndex = startPos;
      cur.push({ line, startPos });
    }
  }
  if (cur.length) blocks.push(cur);
  // Map to {text, start, end, hasLink}
  return blocks.map(linesArr => {
    const start = linesArr[0].startPos;
    const end = linesArr[linesArr.length - 1].startPos + linesArr[linesArr.length - 1].line.length;
    const text = linesArr.map(o => o.line).join('\n');
    const hasLink = /\]\([^)]*\)/.test(text) || /https?:\/\//.test(text);
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return { text, start, end, hasLink, words };
  });
}

function paragraphHasInlineCode(text) {
  return /`[^`]+`/.test(text);
}

function pickBlockIndex(blocks, preferNoLink = true) {
  // Helper to sort blocks: prefer blocks without existing links
  return blocks
    .map((b, i) => ({ i, score: (b.hasLink ? 1 : 0) + (paragraphHasInlineCode(b.text) ? 2 : 0) }))
    .sort((a, b) => a.score - b.score)
    .map(o => o.i);
}

function contextMatchScore(text, context) {
  if (!context) return 0;
  const words = Array.from(new Set(context.toLowerCase().split(/[^a-z0-9]+/i).filter(w => w.length >= 4)));
  if (!words.length) return 0;
  const t = text.toLowerCase();
  let score = 0;
  for (const w of words) if (t.includes(w)) score++;
  return score;
}

function findEligibleMatchInBlock(blockText, keyword) {
  // Find a whole-word match not inside link text [] or inline code ``
  const kw = keyword.trim();
  if (!kw) return null;
  const rx = new RegExp(`(^|[^\\p{L}\\p{N}_])(${escapeRegex(kw)})(?![\\p{L}\\p{N}_])`, 'iu');
  const m = blockText.match(rx);
  if (!m) return null;
  const idx = m.index + m[1].length; // start of the actual match
  const end = idx + m[2].length;
  // Inside inline code?
  const before = blockText.slice(0, idx);
  const backticksBefore = (before.match(/`/g) || []).length;
  const backticksToEnd = (blockText.slice(0, end).match(/`/g) || []).length;
  if (backticksBefore % 2 === 1 || backticksToEnd % 2 === 1) return null;
  // Inside link text?
  const lastOpen = before.lastIndexOf('[');
  if (lastOpen !== -1) {
    const close = blockText.indexOf(']', lastOpen);
    const hasParen = close !== -1 && blockText[close + 1] === '(';
    if (lastOpen < idx && close !== -1 && idx <= close && hasParen) return null;
  }
  return { start: idx, end, text: m[2] };
}

function insertLinkIntoContent(content, block, match, targetUrl) {
  const beforeBlock = content.slice(0, block.start);
  const blockText = block.text;
  const afterBlock = content.slice(block.end);
  const beforeMatch = blockText.slice(0, match.start);
  const matchText = blockText.slice(match.start, match.end);
  const afterMatch = blockText.slice(match.end);
  const linked = `${beforeMatch}[${matchText}](${targetUrl})${afterMatch}`;
  const newBlockText = linked;
  const newContent = beforeBlock + newBlockText + afterBlock;
  const delta = newBlockText.length - blockText.length;
  return { newContent, delta };
}

async function main() {
  const csvPath = path.isAbsolute(options.csv) ? options.csv : path.join(options.root, options.csv);
  const raw = await fsp.readFile(csvPath, 'utf8');
  const rows = parseCSV(raw);
  if (rows.length === 0) {
    console.error('CSV appears empty.');
    process.exit(1);
  }
  const header = rows[0];
  const colIndex = (name) => header.indexOf(name);
  // Expected columns
  const COL_SOURCE_URL = colIndex('Source URL') !== -1 ? colIndex('Source URL') : colIndex('Source page');
  const COL_KEYWORD = colIndex('Keyword');
  const COL_CONTEXT = colIndex('Keyword context');
  const COL_TARGET = colIndex('Target page');
  if (COL_SOURCE_URL === -1 || COL_KEYWORD === -1 || COL_CONTEXT === -1 || COL_TARGET === -1) {
    console.error('CSV missing required columns: Source URL, Keyword, Keyword context, Target page');
    process.exit(1);
  }
  // Ensure status columns
  let COL_STATUS = colIndex('interlink_status');
  let COL_REASON = colIndex('status_reason');
  const addedCols = [];
  if (COL_STATUS === -1) { header.push('interlink_status'); COL_STATUS = header.length - 1; addedCols.push('interlink_status'); }
  if (COL_REASON === -1) { header.push('status_reason'); COL_REASON = header.length - 1; addedCols.push('status_reason'); }

  const stateBySource = new Map();
  const sourcesTouched = new Set();
  let processed = 0;
  let changesSinceSave = 0;

  async function loadSourceState(sourceUrl) {
    let st = stateBySource.get(sourceUrl);
    if (st) return st;
    const mdPath = urlToPath(sourceUrl);
    if (!mdPath) return { path: null };
    const content = await fsp.readFile(mdPath, 'utf8');
    const totalWords = wordCountEligible(content);
    const cap = Math.floor(totalWords / 200);
    return { path: mdPath, content, cap, added: 0, usedTargets: new Set(), blocks: null, wordsSinceLast: 1e9 };
  }

  function rebuildBlocks(st) {
    st.blocks = blockify(st.content);
  }

  async function writeSourceIfChanged(sourceUrl) {
    const st = stateBySource.get(sourceUrl);
    if (!st || !st.dirty) return;
    if (options.dryRun) return;
    await fsp.writeFile(st.path, st.content, 'utf8');
    st.dirty = false;
    sourcesTouched.add(st.path);
  }

  async function saveCSV() {
    if (options.dryRun) return;
    const out = stringifyCSV(rows);
    // backup once if not already
    const bak = csvPath + '.bak';
    if (!fs.existsSync(bak)) {
      await fsp.writeFile(bak, raw, 'utf8');
    }
    await fsp.writeFile(csvPath, out, 'utf8');
  }

  const status = (row, s, reason = '') => {
    row[COL_STATUS] = s;
    row[COL_REASON] = reason;
  };

  for (let r = 1; r < rows.length && processed < options.limit; r++) {
    const row = rows[r];
    // extend row if new columns added
    while (row.length < header.length) row.push('');

    const sourceUrl = row[COL_SOURCE_URL];
    const keyword = row[COL_KEYWORD];
    const context = row[COL_CONTEXT];
    const targetUrl = row[COL_TARGET];

    if (!sourceUrl || !keyword || !targetUrl) { status(row, 'skipped', 'missing_required_fields'); continue; }
    if (options.onlySource && sourceUrl !== options.onlySource) continue;

    // Skip already processed rows (resume)
    if (row[COL_STATUS]) continue;

    const st = await loadSourceState(sourceUrl);
    stateBySource.set(sourceUrl, st);
    if (!st.path) { status(row, 'skipped', 'source_not_found'); continue; }

    if (containsUrl(st.content, targetUrl)) {
      st.usedTargets.add(targetUrl);
      status(row, 'skipped', 'existing_target_present');
      continue;
    }

    if (st.usedTargets.has(targetUrl)) {
      status(row, 'skipped', 'duplicate_target');
      continue;
    }

    if (st.cap <= st.added) {
      status(row, 'skipped', 'cap_reached');
      continue;
    }

    // Build blocks lazily
    if (!st.blocks) rebuildBlocks(st);

    // Candidate blocks in preference order
    const order = pickBlockIndex(st.blocks);
    let best = null;
    let bestScore = -1;
    for (const idx of order) {
      const b = st.blocks[idx];
      // simple spacing rule: try to keep ~100 words between links if possible
      if (st.wordsSinceLast < 100 && !b.hasLink) {
        continue;
      }
      const match = findEligibleMatchInBlock(b.text, keyword);
      if (!match) continue;
      const score = contextMatchScore(b.text, context) - (b.hasLink ? 0.5 : 0);
      if (score > bestScore) { best = { idx, block: b, match }; bestScore = score; }
    }

    if (!best) {
      // fallback: allow block with links if no other
      for (const idx of order) {
        const b = st.blocks[idx];
        const match = findEligibleMatchInBlock(b.text, keyword);
        if (match) { best = { idx, block: b, match }; break; }
      }
    }

    if (!best) { status(row, 'skipped', 'not_found_or_ineligible'); continue; }

    // Apply replacement
    const { newContent, delta } = insertLinkIntoContent(st.content, best.block, best.match, targetUrl);
    st.content = newContent;
    st.added += 1;
    st.usedTargets.add(targetUrl);
    st.dirty = true;
    status(row, 'added', '');

    // Update blocks ranges due to delta: simplest is to rebuild
    rebuildBlocks(st);
    // Update wordsSinceLast (approx: use the block words)
    st.wordsSinceLast = 0;

    processed++;
    changesSinceSave++;

    if (!options.dryRun) await writeSourceIfChanged(sourceUrl);
    if (changesSinceSave >= options.saveEvery) {
      await saveCSV();
      changesSinceSave = 0;
    }
  }

  // Final save
  if (!options.dryRun) {
    await saveCSV();
  }

  console.log(`Processed rows: ${processed}.`);
  if (addedCols.length) console.log(`Added CSV columns: ${addedCols.join(', ')}`);
  if (sourcesTouched.size) {
    console.log('Updated sources:');
    for (const p of sourcesTouched) console.log(' - ' + p);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

