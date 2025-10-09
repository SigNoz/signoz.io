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
  csv: 'scripts/data/interlinking.csv',
  root: process.cwd(),
  dryRun: false,
  limit: Infinity, // successful row insertions cap
  sourceLimit: Infinity, // unique sources to modify cap
  onlySource: null, // URL filter
  saveEvery: 50, // rows between CSV saves
  forceReprocess: false, // process rows even if status exists
};

for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--csv') options.csv = args[++i];
  else if (a === '--root') options.root = args[++i];
  else if (a === '--dry-run') options.dryRun = true;
  else if (a === '--limit') options.limit = Number(args[++i] || '0') || Infinity;
  else if (a === '--source-limit') options.sourceLimit = Number(args[++i] || '0') || Infinity;
  else if (a === '--only-source') options.onlySource = args[++i];
  else if (a === '--save-every') options.saveEvery = Number(args[++i] || '50');
  else if (a === '--force-reprocess') options.forceReprocess = true;
  else if (a === '--help') {
    console.log(`Usage: node scripts/interlinker.mjs [--csv scripts/data/interlinking.csv] [--dry-run] [--limit N] [--source-limit N] [--only-source URL] [--save-every N] [--force-reprocess]\n`);
    process.exit(0);
  }
}

// ---------------- CSV PARSER/WRITER ----------------
// Denylisted keywords (case-insensitive) that should never be linked
const KEYWORD_DENYLIST = new Set([
  'prometheus or',
]);
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
  // Build blocks using precise offsets that respect \r\n vs \n
  // Build line objects with correct start/end offsets
  const lines = [];
  let pos = 0;
  const re = /\r?\n/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const lineText = content.slice(pos, m.index);
    const end = re.lastIndex; // includes the newline(s)
    lines.push({ text: lineText, start: pos, end });
    pos = end;
  }
  // last line
  if (pos <= content.length) {
    const lineText = content.slice(pos);
    lines.push({ text: lineText, start: pos, end: content.length });
  }

  let inFront = false;
  let inFence = false;
  const blocks = [];
  let cur = [];

  for (let i = 0; i < lines.length; i++) {
    const L = lines[i];
    const line = L.text;
    const trimmed = line.trim();
    if (i === 0 && trimmed === '---') { inFront = true; continue; }
    if (inFront) { if (trimmed === '---') inFront = false; continue; }
    if (trimmed.startsWith('```')) { inFence = !inFence; continue; }
    if (inFence) {
      if (cur.length) { blocks.push(cur); cur = []; }
      continue;
    }
    if (/^\s*>/.test(line)) { if (cur.length) { blocks.push(cur); cur = []; } continue; }
    if (/^\s*\[[^\]]+\]:\s*\S+/.test(line)) { if (cur.length) { blocks.push(cur); cur = []; } continue; }
    if (/^\s*#/.test(line) || /^\s*\|/.test(line) || /^\s*</.test(line)) { if (cur.length) { blocks.push(cur); cur = []; } continue; }

    if (trimmed === '') { if (cur.length) { blocks.push(cur); cur = []; } }
    else { cur.push(L); }
  }
  if (cur.length) blocks.push(cur);

  // Map to {text, start, end, hasLink, words, startWord, endWord, index}
  let cum = 0;
  const out = blocks.map((linesArr, idx) => {
    const start = linesArr[0].start;
    const end = linesArr[linesArr.length - 1].end;
    const text = linesArr.map(o => o.text).join('\n');
    const hasLink = /\]\([^)]*\)/.test(text) || /https?:\/\//.test(text) || /\[[^\]]+\]\[[^\]]+\]/.test(text);
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const startWord = cum;
    const endWord = cum + words;
    cum = endWord;
    return { text, start, end, hasLink, words, startWord, endWord, index: idx };
  });
  return out;
}

function paragraphHasInlineCode(text) {
  return /`[^`]+`/.test(text);
}

function pickBlockIndexNoLink(blocks) {
  // Earlier paragraphs first, without existing links
  return blocks.filter(b => !b.hasLink).sort((a, b) => a.index - b.index).map(b => b.index);
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

function getProtectedRanges(text) {
  const ranges = [];
  // Inline code: `...`
  let i = 0;
  while (i < text.length) {
    if (text[i] === '`') {
      const start = i;
      i++;
      while (i < text.length && text[i] !== '`') i++;
      const end = i < text.length ? i + 1 : text.length;
      ranges.push([start, end]);
      i = end;
      continue;
    }
    i++;
  }
  // Markdown links and images: ![alt](url) or [text](url)
  const linkRe = /!\[[^\]]*\]\([^\)]+\)|\[[^\]]+\]\([^\)]+\)/g;
  for (const m of text.matchAll(linkRe)) {
    ranges.push([m.index, m.index + m[0].length]);
  }
  // HTML anchors: <a ...>...</a>
  const htmlARe = /<a\b[^>]*>[\s\S]*?<\/a>/gi;
  for (const m of text.matchAll(htmlARe)) {
    ranges.push([m.index, m.index + m[0].length]);
  }
  // Any HTML tag (to protect attributes like alt, title, href, etc.)
  const htmlTagRe = /<[^>]+>/g;
  for (const m of text.matchAll(htmlTagRe)) {
    ranges.push([m.index, m.index + m[0].length]);
  }
  // Reference-style links: [text][id]
  const refRe = /\[[^\]]+\]\[[^\]]+\]/g;
  for (const m of text.matchAll(refRe)) {
    ranges.push([m.index, m.index + m[0].length]);
  }
  // Inline autolinks: <http://...>
  const angleRe = /<https?:\/\/[^>\s]+>/g;
  for (const m of text.matchAll(angleRe)) {
    ranges.push([m.index, m.index + m[0].length]);
  }
  // Plain URLs
  const urlRe = /https?:\/\/[^\s)]+/g;
  for (const m of text.matchAll(urlRe)) {
    ranges.push([m.index, m.index + m[0].length]);
  }
  // Email addresses
  const emailRe = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
  for (const m of text.matchAll(emailRe)) {
    ranges.push([m.index, m.index + m[0].length]);
  }
  // Sort & merge
  ranges.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const r of ranges) {
    if (!merged.length || r[0] > merged[merged.length - 1][1]) merged.push(r);
    else merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], r[1]);
  }
  return merged;
}

function isInRanges(pos, ranges) {
  let lo = 0, hi = ranges.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const [s, e] = ranges[mid];
    if (pos < s) hi = mid - 1; else if (pos >= e) lo = mid + 1; else return true;
  }
  return false;
}

function isWordChar(ch) {
  return /[\p{L}\p{N}_]/u.test(ch || '');
}

function findEligibleMatchInRange(content, startIdx, endIdx, keyword) {
  // Work on the original substring exactly as in file, preserving CRLF
  const blockText = content.slice(startIdx, endIdx);
  const kw = keyword.trim();
  if (!kw) return null;
  const protectedRanges = getProtectedRanges(blockText);
  const rx = new RegExp(escapeRegex(kw), 'giu');
  for (const m of blockText.matchAll(rx)) {
    const start = m.index;
    const end = start + m[0].length;
    const before = blockText[start - 1];
    const after = blockText[end];
    if (isWordChar(before) || isWordChar(after)) continue; // word boundaries
    if (isInRanges(start, protectedRanges) || isInRanges(end - 1, protectedRanges)) continue;
    // avoid crossing newlines in anchor text
    if (blockText.slice(start, end).includes('\n') || blockText.slice(start, end).includes('\r')) continue;
    return { start, end, text: blockText.slice(start, end) };
  }
  return null;
}

function insertLinkIntoContent(content, block, match, targetUrl) {
  const beforeBlock = content.slice(0, block.start);
  const blockText = content.slice(block.start, block.end);
  const afterBlock = content.slice(block.end);
  const beforeMatch = blockText.slice(0, match.start);
  const matchText = blockText.slice(match.start, match.end);
  const afterMatch = blockText.slice(match.end);
  const newBlockText = `${beforeMatch}[${matchText}](${targetUrl})${afterMatch}`;
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
  const modifiedSources = new Set();
  let processed = 0; // successful row insertions
  let changesSinceSave = 0;

  function collectExistingAnchorTexts(content) {
    const s = new Set();
    // Markdown links
    for (const m of content.matchAll(/\[([^\]]+)\]\([^\)]+\)/g)) {
      const t = m[1].replace(/<[^>]+>/g, '').trim().toLowerCase();
      if (t) s.add(t);
    }
    // HTML anchors
    for (const m of content.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)) {
      const inner = m[1].replace(/<[^>]+>/g, '');
      const t = inner.trim().toLowerCase();
      if (t) s.add(t);
    }
    return s;
  }

  async function loadSourceState(sourceUrl) {
    let st = stateBySource.get(sourceUrl);
    if (st) return st;
    const mdPath = urlToPath(sourceUrl);
    if (!mdPath) return { path: null };
    const content = await fsp.readFile(mdPath, 'utf8');
    const totalWords = wordCountEligible(content);
    const cap = Math.floor(totalWords / 200);
    return { path: mdPath, content, cap, added: 0, usedTargets: new Set(), blocks: null, lastInsertWordPos: null, existingAnchorTexts: collectExistingAnchorTexts(content) };
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

    // Skip already processed rows unless forcing reprocess
    if (row[COL_STATUS] && !options.forceReprocess) continue;

    // Denylist check
    if (KEYWORD_DENYLIST.has(String(keyword).trim().toLowerCase())) {
      status(row, 'skipped', 'denylist_keyword');
      continue;
    }

    // Basic anchor quality
    const letters = /[A-Za-z]/.test(keyword);
    if (keyword.trim().length < 3 || !letters) { status(row, 'skipped', 'low_quality_anchor'); continue; }

    const st = await loadSourceState(sourceUrl);
    stateBySource.set(sourceUrl, st);
    if (!st.path) { status(row, 'skipped', 'source_not_found'); continue; }

    // Enforce source-limit: before first modification for a source
    if (!modifiedSources.has(st.path) && modifiedSources.size >= options.sourceLimit) {
      break; // stop processing
    }

    if (containsUrl(st.content, targetUrl)) {
      st.usedTargets.add(targetUrl);
      status(row, 'skipped', 'existing_target_present');
      continue;
    }

    // Skip if keyword already used as anchor anywhere
    const keywordKey = keyword.trim().toLowerCase();
    if (st.existingAnchorTexts && st.existingAnchorTexts.has(keywordKey)) {
      status(row, 'skipped', 'existing_anchor_for_keyword');
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
    const orderNoLink = pickBlockIndexNoLink(st.blocks);
    let best = null;
    let bestScore = -1;
    const contextWords = Array.from(new Set((context || '').toLowerCase().split(/[^a-z0-9]+/i).filter(w => w.length >= 4)));
    const requireContext = contextWords.length > 0;

    // Pass 1: prefer paragraphs without links, enforce spacing, avoid tiny intro
    for (const idx of orderNoLink) {
      const b = st.blocks[idx];
      if (b.index === 0 && b.words < 15) continue; // avoid very short intro
      if (st.lastInsertWordPos != null) {
        const dist = Math.abs(b.startWord - st.lastInsertWordPos);
        if (dist < 100) continue; // try to keep spacing
      }
      const match = findEligibleMatchInRange(st.content, b.start, b.end, keyword);
      if (!match) continue;
      const score = contextMatchScore(st.content.slice(b.start, b.end), context);
      if (score > bestScore) { best = { idx, block: b, match }; bestScore = score; }
    }

    // Pass 2: relax spacing if nothing found
    if (!best) {
      for (const idx of orderNoLink) {
        const b = st.blocks[idx];
        if (b.index === 0 && b.words < 15) continue;
        const match = findEligibleMatchInRange(st.content, b.start, b.end, keyword);
        if (match) { best = { idx, block: b, match }; bestScore = contextMatchScore(st.content.slice(b.start, b.end), context); break; }
      }
    }

    // Pass 3 (optional): if still nothing, allow blocks that already contain a link
    if (!best) {
      for (const b of st.blocks) {
        if (b.index === 0 && b.words < 15) continue;
        const match = findEligibleMatchInRange(st.content, b.start, b.end, keyword);
        if (match) { best = { idx: b.index, block: b, match }; bestScore = contextMatchScore(st.content.slice(b.start, b.end), context); break; }
      }
    }

    if (!best) { status(row, 'skipped', 'not_found_or_ineligible'); continue; }
    if (requireContext && bestScore <= 0) { status(row, 'skipped', 'context_mismatch'); continue; }

    // Apply replacement
    const { newContent, delta } = insertLinkIntoContent(st.content, best.block, best.match, targetUrl);
    st.content = newContent;
    st.added += 1;
    st.usedTargets.add(targetUrl);
    st.dirty = true;
    status(row, 'added', '');
    modifiedSources.add(st.path);
    if (st.existingAnchorTexts) st.existingAnchorTexts.add(keywordKey);

    // Update blocks ranges due to delta: simplest is to rebuild
    rebuildBlocks(st);
    st.lastInsertWordPos = best.block.endWord;

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
  if (modifiedSources.size !== Infinity) console.log(`Modified sources: ${modifiedSources.size}.`);
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
