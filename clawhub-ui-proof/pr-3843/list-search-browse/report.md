# List-only catalogs with persistent search

Skills and Plugins now have an always-visible, full-width search field immediately under the title. Card/grid rendering and its toggle are removed, including for old `view=grid` and `view=cards` links. The visible slash key badge is removed, and search has 12px vertical padding with a stable 56px minimum height. Search clearing never collapses the field. `/` focuses it; Escape clears it while preserving focus. Category navigation and topic filters remain available.

## Comparable real browser proof

Baseline: `c68cccc69f`, the previous PR implementation. Candidate: the exact commit in summary.json. Anonymous Chromium, dark theme, actual ClawHub at `http://127.0.0.1:3049`, backed by local Convex at `http://127.0.0.1:3210`. No mocked result data or synthetic screenshots.

The baseline and candidate use identical URLs and local fixtures:

- `/skills?tab=new`: existing old community skill `local-truncation-plugin-runtime-integration-skill`, owned by `local`, with a long name/summary. The copied aggregate skill count remains stale at 2; one public skill is visible.
- `/plugins?featured=true&category=computer-use`: twelve nonfeatured plugins seeded through the existing public-corpus seed mutation with public names/descriptions and synthetic `category-proof` owner/statistics.

| Page | Viewport | Before | After |
| --- | --- | --- | --- |
| Skills | 1440×1000 | [Before](baseline/skills-desktop.png) | [After](candidate/skills-desktop.png) |
| Plugins | 1440×1000 | [Before](baseline/plugins-desktop.png) | [After](candidate/plugins-desktop.png) |
| Skills | 390×844 | [Before](baseline/skills-mobile.png) | [After](candidate/skills-mobile.png) |
| Plugins | 390×844 | [Before](baseline/plugins-mobile.png) | [After](candidate/plugins-mobile.png) |

The desktop Skills title-to-results distance decreases from 90px to 84px; search fills the former empty toolbar row. On mobile, the expanded search and category picker occupy separate full-width rows. The search field matches its catalog container width at mobile (390×844), tablet (768×1024), laptop (1366×768), and desktop (1440×1000), without horizontal overflow or page exceptions.

## Additional coverage

- Typical/content-heavy: the paired screenshots cover the twelve plugin rows with long descriptions and the long skill name.
- Empty search: type `zzzz-no-catalog-match` into the real search field, wait for the actual empty result, then clear and confirm all fixture rows return. [Skills desktop](candidate/skills-empty-desktop.png), [skills mobile](candidate/skills-empty-mobile.png), [plugins desktop](candidate/plugins-empty-desktop.png), [plugins mobile](candidate/plugins-empty-mobile.png).
- Loading: select a category, hold its real outgoing catalog request at the browser boundary, inspect the loading component, then resume the request unchanged. Search stays visible and no card/view controls appear. [Skills desktop](candidate/skills-loading-desktop.png), [skills mobile](candidate/skills-loading-mobile.png), [plugins desktop](candidate/plugins-loading-desktop.png), [plugins mobile](candidate/plugins-loading-mobile.png).
- Desktop/mobile interaction assertions: old grid URLs render lists; `/` focuses search; typing navigates and produces an empty result; clearing restores the catalog without hiding search; Escape clears while retaining focus; category controls remain usable.
- All published screenshots were inspected. Permissions and error behavior are unchanged and are covered by the existing tests. No timing or animation behavior was added, so screenshots capture the changed layout; interaction assertions cover the retained search behavior.

Capture commands: `node .artifacts/list-search-browse/capture.mjs candidate`, `node .artifacts/list-search-browse/interactions.mjs`, and `node .artifacts/list-search-browse/loading.mjs`.

## Validation

- Focused browse routes: 163 tests passed. Search-attribution clear/retype regression also passed after updating its expected control label and removing the obsolete open-search click.
- Production build and app/schema/CLI/admin types: passed (`bun run ci:types-build`).
- Formatting, lint, dead-code, llms, peer, and release-workflow pin checks: passed.
- Autoreview: clean (`.agents/skills/autoreview/scripts/autoreview --mode local --stream-engine-output`); no findings. The final search polish and dependency patch updates also passed autoreview with no findings.
- `bun run ci:static`: passed. Patch updates to fast-uri 3.1.7 and undici 7.29.1 clear the previous dependency advisories.
- `bun run ci:unit`: passed, 7,241 tests passed and 3 skipped; coverage passed.
