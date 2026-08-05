# Customer page responsive audit

Audited the `/customers/` experience at 393 × 852 and 1920 × 1080 after the story-card, list-mode, and quote-carousel refinements.

1. Mobile hero and video rail — healthy
   - The hero, proof metrics, CTAs, and first video card reflow without horizontal page overflow.
2. Mobile story browsing — healthy after correction
   - The story area previously created a 754px implicit grid track inside a 351px content area.
   - The base grid now uses an explicit `minmax(0, 1fr)` track, and the sidebar/content children can shrink.
   - Search, filters, view controls, and all story cards now stay inside the 393px viewport.
3. Story card hierarchy — healthy
   - Grid cards use content-driven outcome areas, so longer evidence labels no longer clip.
   - List cards are compact rows and intentionally omit the person/role or outcome/description footer.
4. Quote carousel — healthy
   - Three centered dots show quote position; the active dot is visually distinct.
   - Each dot exposes a descriptive label and pressed state. Selecting a dot resets the seven-second rotation.
   - Long attribution roles reflow without compressing the name into narrow fragments.
5. Widescreen hero and video rail — healthy
   - The page retains the homepage experiment container width and deliberate carousel edge reveal.
6. Widescreen story library — healthy
   - Grid cards remain unclipped; list rows are consistently compact and materially faster to scan.
7. Final proof board — healthy
   - The bento board reads as atmospheric proof, uses deliberate edge masking, and retains a visible pause/play control.

## Evidence limits

The audit verifies rendered reflow, horizontal overflow, visible hierarchy, quote selection state, and control labeling. It is not a full WCAG conformance review, screen-reader certification, or automated contrast audit.

## Captures

- `01-mobile-top.png`
- `02-mobile-story-grid.png`
- `03-mobile-story-list.png`
- `04-mobile-quotes.png`
- `05-mobile-proof-board.png`
- `06-widescreen-top.png`
- `07-widescreen-story-list.png`
- `08-widescreen-story-grid.png`
- `09-widescreen-quotes.png`
- `10-widescreen-proof-board.png`
