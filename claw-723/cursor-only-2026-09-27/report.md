# CLAW-723 — Cursor-only validation proof

The existing ClawHub stack now accepts only company/product integrations under `cursor/plugins/third_party`, including Cursor-authored wrappers. Anthropic, OpenAI, Hermes and additional company-repository discovery are excluded. Cross-registry precedence is removed. Cursor/existing-catalog deduplication, licensing, provenance, current categories, immutable updates and publication/security gates remain enforced.

## Real preview and baseline comparison

- User preview: http://localhost:54662/plugins (MacBook loopback tunnel); actual runtime http://127.0.0.1:55880.
- Baseline: `ec1d459396`, the prior running preview with five OpenAI and 78 Cursor crawl fixtures plus 2,194 production snapshot listings.
- Candidate: `8be2316a1619aaf9fa1057ba7e47ec078483c1ed`; its tree exactly matches validated integration `3fc501fecf`, based on upstream main `b0e34a98cd`.
- Result: **2,277 → 2,272** catalog entries. All **2,194 production snapshot listings** retained; **78 Cursor**, **zero OpenAI crawl fixtures**. The five OpenAI versions return 404 through the public download route after guarded local fixture soft-deletion. Their archived records are retained.
- Fresh source commit: `ecc249f1e306fc64ddf83c7bed16cacf7c2239db`; **79 scoped, 78 eligible, one blocked Salesforce entry** (invalid/empty MCP capability). All 78 sources remain unchanged, so the real reviewed sync apply creates no new versions.
- Desktop 1440×900 and mobile 390×844: OpenAI before/after, Cursor profile, Attio provenance/detail, combined production catalog/current categories. Zero page errors and zero horizontal overflow. The redundant Source author line is absent; original source attribution remains in the bundle.

| State | Desktop | Mobile | Evidence |
|---|---|---|---|
| Removed fixtures / empty | [before](baseline/openai-desktop.png) → [after](candidate/openai-desktop.png) | [before](baseline/openai-mobile.png) → [after](candidate/openai-mobile.png) | Plugins 5 → 0 |
| Cursor catalog | [capture](candidate/cursor-desktop.png) | [capture](candidate/cursor-mobile.png) | Plugins 78 |
| Package detail | [capture](candidate/attio-desktop.png) | [capture](candidate/attio-mobile.png) | Cursor repository and current category |
| Production context | [capture](candidate/catalog-desktop.png) | [capture](candidate/catalog-mobile.png) | Existing catalog retained |

The before/after uses the same route, anonymous session, light theme and viewport; only the authorized fixture removal changes the data. No page redesign is included. Transient loading/error/disabled UI is outside this source-scope change; security withholding is independently exercised by the local-auth acceptance test. Screenshots were opened and inspected. Codex in-app browser automation was unavailable; isolated Playwright drove the real running app.

## Package download and immutability

**78 real public API downloads, 631 files verified byte-for-byte by SHA-256** against the original published bundles. Every source content hash and commit matches the fresh crawl; every provenance record says `cursor/plugins` with registry authorship. Download receipts with archive hashes are in `summary.json`.

The five retired OpenAI packages and the blocked Salesforce package return 404. No archive was rewritten to apply newer category metadata; catalog categories preserve the ongoing refresh.

## OpenClaw installation

Official OpenClaw **2026.9.6** in the separate OCM scratch environment `cursor-only-proof`, with its gateway/service disabled:

```sh
OPENCLAW_CLAWHUB_URL=http://127.0.0.1:55880 openclaw plugins install clawhub:@cursor/attio-service-integration@1.0.0 --force --accept-capabilities
OPENCLAW_CLAWHUB_URL=http://127.0.0.1:55880 openclaw plugins install clawhub:@cursor/google-docs-service-integration@1.1.0 --force --accept-capabilities
openclaw plugins list --json
```

Both commands downloaded and installed the actual ClawHub bundles. `plugins list --json` reported enabled, loaded, Cursor-format bundles: Attio (`mcpServers`) and Google Docs (`skills`, `mcpServers`), with no missing dependencies. This proves installation and runtime recognition; it does not claim authenticated calls to Attio or Google. The disposable environment and its scratch runtime were removed afterward; shared OCM environments were untouched.

**Security simulation disclosure:** local ClawScan/VirusTotal verdicts are simulated and labeled `LOCAL PREVIEW FIXTURE` in the install audit. Real Plugin Inspector and ordinary catalog, download and installation paths were used. This is not live provider security certification. The local-auth acceptance fixture separately proves pending/blocked releases remain hidden and clean releases become downloadable, using simulated verdicts through the real worker protocol.

## Validation

Passed on the final integration tree:

- `bun run ci:static`
- `bun run ci:unit` — 7,327 passed, three skipped
- `bun run ci:types-build`
- `bun run ci:packages`
- `bun run ci:e2e-http`
- `bun run ci:playwright-smoke` — 18 passed
- Local-auth Cursor synchronization acceptance — one passed (real local Convex/browser)
- Focused inventory/import/prepare/reconcile/source-scope tests; guarded local cleanup, archived history and production snapshot preservation regressions
- Convex generated API typecheck, `git diff --check`, exact final stack/integration tree comparison

Autoreview findings on unsafe paths, precise fixture identity and exact duplicates were fixed. The final remaining finding was rejected as a false positive: the optional real OCM installation block is still present in the acceptance test; only the out-of-scope company-source replacement scenario was removed.

## Review series

- [499e722bb9 feat: inventory Cursor third-party company integrations](https://github.com/openclaw/clawhub/pull/3639)
- [db7c3ae6e7 feat: publish reviewed Cursor bundles with provenance and security gates](https://github.com/openclaw/clawhub/pull/3641)
- [2c4cbe1376 feat: preserve imported plugin attribution and ownership history](https://github.com/openclaw/clawhub/pull/3642)
- [b8fafefb65 feat: synchronize Cursor plugins as immutable scanned releases](https://github.com/openclaw/clawhub/pull/3644)
- [1e60d6c013 feat: curate the Cursor company integration catalog](https://github.com/openclaw/clawhub/pull/3645)
- [10a17c9e00 test: prove Cursor-only catalog and synchronization boundaries](https://github.com/openclaw/clawhub/pull/3824)
- [18136ec86c fix: refresh Cursor-only local crawl fixtures safely](https://github.com/openclaw/clawhub/pull/3828)
- [8be2316a16 fix: preserve empty plugin filenames in CLI uploads](https://github.com/openclaw/clawhub/pull/3830)

Production synchronization remains disabled (all proposed sources are unapproved). No PR was merged. Patrick’s approval is required before landing.
