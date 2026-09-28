# Category-only skill and plugin browsing

The Skills and Plugins browse pages show their full category catalogs without Featured, Trending, Official, or New tabs. Old feed selectors no longer filter results or reuse a feed cursor. Search, topics, category ordering, and list/grid controls remain available.

## Real browser comparison

- Baseline: `b0e34a98cd` (`origin/main` at branch creation).
- Candidate: `codex/category-only-browse` (exact commit recorded in summary.json).
- Runtime: actual ClawHub at `http://127.0.0.1:3049`, backed by local Convex at `http://127.0.0.1:3210`; anonymous browser session, dark theme, Chromium. No mocked catalog responses.
- Plugins route: `/plugins?featured=true&category=computer-use`.
- Skills route: `/skills?tab=new`.
- Fixtures held constant for before/after: 12 nonfeatured Computer use plugins seeded through `devSeed:seedPublicCorpusBatch` with public names/descriptions and a synthetic `category-proof` owner/statistics; the existing old community skill `local-truncation-plugin-runtime-integration-skill` owned by `local`, last updated three weeks ago, exercises a long title and summary.
- The plugin baseline shows zero results under Featured; the candidate shows all 12 matching plugins. The skill baseline shows zero results under New; the candidate shows the older skill. The local aggregate skill count is stale (2); only one visible public skill exists in this fixture snapshot.

| Page | Viewport | Before | After |
| --- | --- | --- | --- |
| Plugins | 1440×1000 | [Before](baseline/plugins-desktop.png) | [After](candidate/plugins-desktop.png) |
| Skills | 1440×1000 | [Before](baseline/skills-desktop.png) | [After](candidate/skills-desktop.png) |
| Plugins | 390×844 | [Before](baseline/plugins-mobile.png) | [After](candidate/plugins-mobile.png) |
| Skills | 390×844 | [Before](baseline/skills-mobile.png) | [After](candidate/skills-mobile.png) |

## Additional states and interactions

- Typical/content-heavy: the comparisons above cover twelve plugin rows with long descriptions and a long skill name at both screenshot viewports.
- Empty: `/{plugins,skills}?topic=nonexistent-proof-topic` returns a true empty result, retains categories, and offers an add action. [Plugins desktop](candidate/plugins-empty-desktop.png), [plugins mobile](candidate/plugins-empty-mobile.png), [skills desktop](candidate/skills-empty-desktop.png), [skills mobile](candidate/skills-empty-mobile.png).
- Loading: select Computer use on Plugins or Development on Skills, hold the actual outgoing catalog request at the browser network boundary, inspect the real loading component, then resume the request. No response body is substituted. [Plugins desktop](candidate/plugins-loading-desktop.png), [plugins mobile](candidate/plugins-loading-mobile.png), [skills desktop](candidate/skills-loading-desktop.png), [skills mobile](candidate/skills-loading-mobile.png).
- Both pages: no feed radio buttons at 390×844, 768×1024, 1366×768, and 1440×1000; no horizontal document overflow or page exceptions.
- Desktop/mobile: list/grid buttons and search disclosure work; mobile category choices remain available; selecting Computer use from the full plugin catalog shows all 12 plugins.
- All published screenshots were visually inspected. Fresh browser contexts and a restarted development server prevented stale module proof.
- Permission/error visual variants were not changed. Pagination, request failures/retry, SSR fallback, stale category hydration, and cancellation are covered by focused regression tests. No timing/animation behavior changed, so stable screenshots are the primary proof.

Capture commands: `node .artifacts/category-only-browse/capture.mjs` and `node .artifacts/category-only-browse/loading.mjs`.

## Validation

- Focused route tests: 137 passed.
- `bun run ci:types-build`: passed, including app/schema/CLI/admin types and production build.
- Formatting, lint, dead-code checks, llms check, peer check, and release-workflow pin check: passed.
- `.agents/skills/autoreview/scripts/autoreview --mode local --stream-engine-output`: clean final run. Accepted and fixed one request-cancellation finding; no remaining actionable findings.
- `bun run ci:static`: blocked at dependency audit by the unchanged lockfile: two high advisories for fast-uri 3.1.6 and one moderate advisory for undici 7.29.0. No dependency files changed.
- `bun run ci:unit`: passed; 7,238 tests passed, 3 skipped. Earlier runs hit an intermittent Node `setTypeOfService EINVAL` in the unchanged `scripts/playwright-local-convex.test.ts`; all test assertions passed, and a repeat completed cleanly.
