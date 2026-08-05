# Customer page final desktop audit

Audit scope: `/customers/` at 1440 x 900, covering the hero, video carousel, customer-story browsing, quote transition, and final proof board.

## Verdict

The page has a clear desktop flow and a consistent visual system. One release-blocking layout defect remains in expanded story cards, and list mode still does not provide the compact browsing advantage its toggle implies.

## Steps

1. Hero and video carousel — Healthy. The hero hierarchy is clear, metrics and CTAs align well, and the carousel visibly exposes the next story. The next control loops from video 3 back to video 1.
2. Story library entry — Mostly healthy. The heading, filters, search, and grid are easy to scan. Search returned the expected Kernel story, and control labels and pressed states are exposed semantically.
3. Expanded story cards — Needs a fix. The Hindu card clips its final explanatory line. The card is 330px tall with hidden overflow; its fixed 112px outcome area needs 148px for this content.
4. List view — Needs refinement. It keeps one story per row but retains too much card height and blank space, so it is not materially faster to browse than grid view.
5. Quote transition — Mostly healthy. The quote hierarchy, dual tone, attribution, and source link read clearly. Reduced-motion disables autoplay, but the seven-second automatic rotation has no pause mechanism for other users.
6. Final proof board — Healthy. The board feels deliberately atmospheric, edge masking communicates continuity, and pause/resume plus previous/next controls work.

## Priority recommendations

1. Replace the grid card's fixed `h-28` outcome area with content-driven sizing, or increase the grid card minimum height and remove hidden clipping.
2. Make list rows genuinely compact: one horizontal information row with a tighter vertical rhythm, or remove the mode toggle.
3. Preserve the clean quote design while adding a small pause affordance or pause-on-hover/focus behavior for the auto-changing content.

## Evidence limits

This was a desktop visual and interaction audit. Mobile reflow, browser zoom, screen-reader output, and a complete keyboard-focus pass were not tested. Screenshot review alone does not establish full WCAG compliance.
