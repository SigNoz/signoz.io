# Customer video rail design QA

- Source visual truth: `/Users/yuvraj/Library/Application Support/CleanShot/media/media_wc0f4MwVHk/CleanShot 2026-08-04 at 16.12.27@2x.png`
- Browser-rendered implementation: `/Users/yuvraj/.codex/worktrees/customer-space-1127/design-qa-video-rail.png`
- Focused comparison: `/Users/yuvraj/.codex/worktrees/customer-space-1127/design-qa-comparison-rail.png`
- Route: `http://localhost:3108/customers/?qa=video-rail-final`
- State: first video selected, video not playing, next story visible
- Reference: 3024 x 1964 px at 2x density, representing 1512 x 982 CSS px
- Implementation viewport: 1280 x 720 CSS px at devicePixelRatio 2; browser capture is 1276 x 718 px
- Normalization: the reference rail and implementation rail were cropped to their visible content regions and normalized to 1000 px width for the focused comparison

## Full-view comparison evidence

The reference and implementation both use a dominant 16:9 media story with a deliberate partial preview of the next story. Navigation sits below the media and pairs circular previous/next controls with a long position bar. The implementation intentionally retains the SigNoz dark theme, tokens, typography, video thumbnails, and existing customer content instead of copying the reference brand styling.

## Focused region comparison evidence

`design-qa-comparison-rail.png` compares the source rail and final implementation in one image. The primary media-to-preview ratio, horizontal browsing direction, caption placement, control order, and progress treatment are visibly aligned. The final caption content uses one centered axis for the company logo, outcome, and slide count.

## Required fidelity surfaces

- Fonts and typography: existing SigNoz type scale and optical weights are preserved. Caption text is compact enough to remain secondary to the media and truncates before colliding with the slide count.
- Spacing and layout rhythm: the first slide occupies 72% of the desktop rail, the next story remains visibly discoverable, and the 16 px inter-card gap matches the reference's compact rhythm. Controls align to the rail edge.
- Colors and visual tokens: all implementation colors use the existing Tailwind SigNoz tokens. The dark treatment is an intentional product-system adaptation of the light reference.
- Image quality and asset fidelity: real YouTube max-resolution thumbnails, customer logos, and Lucide controls are used. No placeholder or handcrafted image assets are present.
- Copy and content: the original customer outcomes and company names are retained; the section does not introduce new claims.

## Comparison history

1. Earlier implementation finding [P1]: each slide occupied the full rail and split video from a separate detail panel, so it lacked the source's visual momentum and next-story preview.
   - Fix: replaced the split panel with a continuous 72% desktop media rail, embedded captions, visible next slide, and reference-ordered controls.
   - Post-fix evidence: `design-qa-comparison-rail.png`.
2. Earlier implementation finding [P2]: the caption group and slide count used different bottom baselines.
   - Fix: normalized the caption row to one vertically centered axis.
   - Post-fix evidence: `design-qa-video-rail.png`.

## Interaction and runtime checks

- Next advances from video 1 to video 2.
- Next loops from video 3 back to video 1.
- Progressbar state updates with the active slide.
- Static thumbnails transition to the embedded YouTube player on play.
- Browser console errors: 0.
- Production build: passed.

## Findings

No actionable P0, P1, or P2 fidelity issues remain for the requested rail redesign.

## Follow-up polish

- [P3] Recheck the amount of the next-card preview at very wide breakpoints after the surrounding page width is finalized.

final result: passed
