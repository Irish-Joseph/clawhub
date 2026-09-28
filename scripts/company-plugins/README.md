# Cursor company integrations

The active crawl imports company/product integrations physically hosted under
`cursor/plugins/third_party/`, including Cursor-authored wrappers. Discovery does
not follow external repository pointers. Anthropic, OpenAI, Hermes, Cursor's
internal plugins, and additional company repositories are excluded. Stale source
configurations fail validation before discovery, import, or synchronization.

## Selection and provenance

`sources.json` records reviewed integration/job identities, repository and owner
IDs, category mappings, and approval state. Repository identity is checked against
GitHub on every crawl. The current inventory contains 79 proposals: 78 eligible
and Salesforce withheld because its MCP definition has no runnable capability.
All proposals remain unapproved for production synchronization.

Selection has no registry precedence:

1. Suppress an explicitly mapped existing ClawHub package or bundled OpenClaw
   integration serving the same primary job. Report missing catalog parity.
2. Collapse repeated discoveries of the same Cursor repository/path.
3. For multiple eligible Cursor paths with the same integration/job, require
   exactly one `preferred` source with a curator's `decisionReason`. Otherwise
   withhold the group for review. Distinct jobs remain separate packages.

Publish under `@cursor`, retain the upstream author declaration verbatim, and
record registry authorship without asserting that the represented company wrote
or endorsed the wrapper. `CLAWHUB_SOURCE.json` and release provenance retain the
exact commit, source path, content hash, author, ownership evidence, license
closure, and omitted capabilities. Historical company provenance remains readable;
it is not an active discovery or publication source.

## Licensing, capabilities and categories

Only complete, unambiguous MIT permission covering the imported source closure is
eligible. Preserve required license text and notices. Missing, conflicting,
restricted, or partial grants are withheld; registry membership grants no rights.
Source licenses and notices participate in the immutable content hash.

Only runnable OpenClaw capabilities are retained. Unsupported rules, agents,
commands and hooks are reported and omitted. Required notices survive pruning.
Conflicting format markers are removed so installation detects the Cursor format.
Package-owned native categories remain authoritative; otherwise use the curated
mapping into the current ClawHub category taxonomy. Category metadata changes do
not rewrite a previously published archive.

## Commands

```sh
bun run plugins:inventory --manifest scripts/company-plugins/sources.json --catalog catalog.json --output inventory.json
bun run plugins:sync --manifest scripts/company-plugins/sources.json --registry https://clawhub.ai --output sync-plan.json
```

Inspect the report and exact artifact digest before a manual `--apply` with the
`--approved-digest <sha256>` option. A changed plan is refused before publication.
Scheduled sync requires both `approved: true` and the reviewed
`approvedInitialHash`; unapproved discoveries never publish automatically. The
GitHub workflow also requires `COMPANY_PLUGIN_SYNC_ENABLED=true`, a dedicated
staff token and the Production environment gate. This change does not enable it.

Synchronization reuses existing releases for unchanged source bytes. Changed
bytes receive a new immutable version and security checks; if the upstream version
is already occupied, append the source-hash build suffix. A pending or blocked
release never replaces a clean release. Identity changes, downgrades, rollback to
historical content, and occupied fallback versions require review. Existing
unrelated ClawHub packages are never overwritten by an identity collision.

The normal publisher verifies the exact staged inventory, runs Plugin Inspector,
and requires prepublication worker checks even for official publishers. Pending
or malicious artifacts stay unavailable through catalog and download surfaces.

## Local acceptance and preview

```sh
bun run test:pw:local-auth -- e2e/local-auth/company-plugin-sync.pw.test.ts --project=chromium
```

This disposable-backend test checks catalog visibility, downloads, attribution,
unchanged synchronization, changed versions, and blocked updates. It explicitly
uses **simulated ClawScan/VirusTotal outcomes through the real worker protocol**;
these outcomes are not live-provider certification. Plugin Inspector and archive
publishing run normally. Set `COMPANY_PLUGIN_PROOF_OCM_ENV` to a disposable OCM
environment to additionally exercise the real OpenClaw `clawhub:` installer.

`devSeed:seedCompanyPluginImportFixtures` seeds only the Cursor publisher.
`devSeed:removeRetiredCompanyPluginCrawlFixtures` removes the five retired OpenAI
crawl fixtures (boltz-api-cli, expo, mixpanel-headless, supabase, temporal) through
normal soft deletion. It requires local dev auth and checks exact fixture names,
the local fixture owner, and stored OpenAI crawl provenance. It cannot remove the
production catalog snapshot's metadata-only rows. Re-running it is idempotent.

The interactive preview retains the 2,194-row production catalog snapshot for
context alongside the 78 eligible Cursor imports. Snapshot rows are not additional
crawl sources or downloadable local releases. Nothing in this workflow writes to
production or redesigns the Plugins page.
