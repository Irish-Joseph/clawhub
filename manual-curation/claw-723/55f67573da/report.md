# CLAW-723: manual company-integration curation

Status: In Progress. This is a replacement for the retired scraping stack, not approval to publish production packages or merge. Research date: September 27–28, 2026. Base: `b0e34a98cd56581f770989ef3713455a0e00fd87`.

## Implemented subset

Two independently authored OpenClaw connection bundles use official company-maintained services: **GoDaddy Domains** (`infrastructure`) and **Excalidraw** (`media`). Each contains only two manifests, endpoint configuration, original README and MIT notice. No upstream code, logos, hooks, skills, proxies or marketplace credentials are copied. “Official service” does not mean the provider authored or endorsed this OpenClaw adapter. The provider’s service terms remain separate from the adapter license.

Draft replacement stack: [bundle definitions #3833](https://github.com/openclaw/clawhub/pull/3833) → [acceptance proof and operator documentation #3834](https://github.com/openclaw/clawhub/pull/3834). Both remain drafts while the wider audit is incomplete.

The new worktree is `clawhub-claw-723-manual`. The new gh-stack has a bundle layer and an acceptance-test/operator-doc layer. There is no scraper, catalog synchronization, precedence engine, production mutation or Plugins-page redesign.

Eight old scraping PRs were closed without merging: [3639](https://github.com/openclaw/clawhub/pull/3639), [3641](https://github.com/openclaw/clawhub/pull/3641), [3642](https://github.com/openclaw/clawhub/pull/3642), [3644](https://github.com/openclaw/clawhub/pull/3644), [3645](https://github.com/openclaw/clawhub/pull/3645), [3824](https://github.com/openclaw/clawhub/pull/3824), [3828](https://github.com/openclaw/clawhub/pull/3828), [3830](https://github.com/openclaw/clawhub/pull/3830). Merged prerequisite 3635, old worktrees/branches, existing dirty work and the unrelated OpenClaw stack were preserved.

## Main-agent consolidation: all 33 seeds

“Included” below means included in this draft implementation, not approved for production publication. “Pending” means a viable candidate that is not packaged; no working-auth claim is made. Research-only eligibility tables later in this report are subordinate to these decisions.

| Candidate | Auth route | Current decision and exact remaining work |
|---|---|---|
| Ahrefs | MCP key, Bearer | Blocked: Lite+ entitlement and supported OpenClaw path; no subscription purchased. |
| Brevo | MCP-specific Bearer token | Pending test account and MCP token; ordinary API key is not interchangeable. |
| Buffer | User key, Bearer | Pending: free signup form reached, password/Terms step not completed. Read-only account/channel proof still required. |
| Coda / Docs | MCP-restricted PAT, Bearer | Pending credentials at current Superhuman Docs endpoint. |
| Daloopa | `X-API-KEY` | Blocked: no authorized API/MCP entitlement. |
| Excalidraw | None | Included: OpenClaw discovery of 5 tools and real `read_me` call; catalog/download/install proof below. |
| Fireflies | User key, Bearer | Pending free-account/API entitlement and read-only test meeting query. |
| GitHub | User token, Bearer | Authenticated SDK tools/list and public LICENSE read succeeded (27 tools). Native OpenClaw `mcp add` probe failed with an unresolved environment placeholder; secure bundle credential configuration is not yet proven. Not packaged. |
| GoDaddy | None | Included: OpenClaw discovery of 2 tools and real `domains_check_availability` for example.com; catalog/download/install proof below. No domain purchase or DNS operation. |
| Guru | `Bearer EMAIL:TOKEN` | Pending account/admin token entitlement. OAuth allowlisting route excluded. |
| Hunter | `X-API-Key` | Pending free test account and read-only Discover proof. |
| Meltwater | `apikey` | Blocked: paid MCP entitlement; old Cursor wrapper absent from current Marketplace root. |
| Playwright | Local, no auth | Excluded from this service batch: substantial built-in browser overlap and local execution, rather than hosted service connection. |
| PostHog | MCP-preset PAT, Bearer | Pending account/project-scoped read-only proof. Company plugin telemetry hooks/other assets are not imported. |
| Profound | API key or possible DCR | Key route blocked by Enterprise/support approval. OAuth route remains unqualified; do not call it managed OAuth by assumption. |
| Semrush | API key / DCR | Excluded pending clarification: provider documents review for other agents and paid units. |
| Similarweb | `api-key` | Blocked: unavailable API-access subscription/credits. |
| Smartsheet | User token, Bearer | Blocked: Business/Enterprise/AWM entitlement; region must match account. |
| Statsig | `statsig-api-key` | Pending read-only Console key; SDK keys are incorrect. |
| Wrike | Permanent access token, Bearer | Pending account test and API-app UI review; PAT is not inherently a managed OAuth client. |
| Ashby | DCR candidate | Blocked: Cloudflare 1010 browser_signature_banned during ordinary discovery, plus recruiting-workspace access. No bypass attempted. |
| Brex | Public DCR | Registration returned 201, public `none`, no secret, loopback accepted. Auth/tools blocked on authorized financial account/Developer API entitlement; no financial account created. |
| Calendly | Public DCR | Native OpenClaw registration retry failed with InvalidClientMetadataError. Blocked on public-client metadata/callback compatibility; no account login or tools. |
| Circleback | Public DCR | Reuse existing company-owned `@circleback/openclaw-plugin` 0.1.6; do not add a same-job duplicate. License still needs review before copying source. |
| Clay | Public DCR | Registration returned 201, no secret, loopback accepted. Pending account and workspace Unknown-client policy; no provider allowlist assumption. |
| Customer.io | Public DCR | Registration returned 201, no secret, loopback accepted. Pending admin enablement/account; request read scope. Company plugin has MIT source, but no bytes copied. |
| Intercom | Public DCR | Native OpenClaw reached authorization URL after an earlier script discovery 403. No user login/tool call. |
| Juicebox | Public DCR | Blocked: MCP requires paid plan; none purchased. |
| Klaviyo | Public DCR | Registration returned 201, no secret, loopback accepted. Pending test-account read-only authorization/tools. |
| Mercury | Public DCR | Native OpenClaw reached authorization URL. Auth/tools require authorized financial account or sanctioned test environment; none created. |
| Outreach | DCR with secret-only metadata | Excluded from current public-client path: advertises only client_secret_post, while OpenClaw registers none. No managed-app or secret exception added. |
| Upwork | Public DCR | Native OpenClaw reached authorization URL, resolving the unusual registration-URL question at that stage. No account login, proposals, spending or tools. |
| Notion | Public DCR | Native OpenClaw reached authorization URL. Signup email filled; Continue accepts Terms and needs action-time confirmation under Computer Use policy. No completed account/login/tools. All 14 company skills withheld: no applicable LICENSE or manifest license verified. |

## Evidence levels and blockers

- Real accountless tools: GoDaddy availability lookup and Excalidraw `read_me` returned `isError: false`. Native OpenClaw 2026.9.6 separately discovered their tools without diagnostics.
- GitHub authenticated proof used Patrick's existing GitHub CLI authorization only in process memory. The official `/mcp/readonly` service listed 27 tools and read public `openclaw/clawhub` LICENSE. No private repository content, token, or response body is in the evidence. Copilot model/agent runtime, workflow bundle, repository synchronization and Crawlora search listings are different jobs; their names alone do not suppress GitHub remote MCP.
- DCR metadata, actual client registration, browser authorization, token exchange and working tools are separate stages. No DCR provider completed token exchange or tool calls in this session. Direct registration checks for Brex, Clay, Customer.io and Klaviyo used OpenClaw's public-client metadata and exact `http://127.0.0.1:8989/oauth/callback`; each returned 201 without a secret. Native retries supersede initial discovery failures where noted. Pending OAuth state was cleared through OpenClaw logout after each probe.
- The requested original **59-package set / 27 unresolved identities was not found** in the preserved CLAW-723 worktrees, bounded temporary/artifact searches, or Linear issue. Patrick has been asked for its path/link/names. The preserved snapshot has 79 Cursor wrappers: subtracting the 32 seeds gives **47**, not 27. Those 47 are audited in a clearly separate appendix below; this does not claim to reconcile the missing historical set.
- Main-agent 1Password metadata lookup used the MacBook approval route. No saved test credentials for these service candidates were found in the selected account. Agents received no credentials and performed only read-only research. No paid plans, sensitive workspace writes, or provider approval requests were made.
- A fresh read-only ClawHub catalog snapshot contained **2,195 packages**. No GoDaddy/Excalidraw name match was found; Circleback's company package exists. This is a bounded catalog/source comparison, not proof that every package's tools have been semantically evaluated. Unrelated/community packages are retained.
- Before production release, replace simulated local verdicts with normal live security checks. The publication test explicitly identifies **simulated ClawScan and TruffleHog**. Plugin Inspector is real. VirusTotal was skipped because no key was configured; no VirusTotal pass is claimed.

## Validation

All six required ClawHub gates passed: `ci:static`, `ci:unit` (7,259 passed / 3 skipped), `ci:types-build`, `ci:packages`, `ci:e2e-http`, and `ci:playwright-smoke` (18 passed). The focused `test:pw:local-auth -- --project=chromium --retries=0 e2e/local-auth/curated-company-bundles.pw.test.ts` passed (58.4 seconds) with actual OCM installation enabled. Current-head `bunx tsc --noEmit` passed. Final autoreview on `55f67573da` passed with no accepted/actionable findings; its independent TruffleHog diff scan was clean.

The real local `http://127.0.0.1:55890/plugins?new=true` catalog changed from zero curated fixtures to two. Local Convex ran at ports 55891/55892. The test checked pending visibility/download denial, normal publication admission, current categories, every downloaded filename and byte, and real package detail pages. Both OpenClaw CLI installs succeeded. Browser screenshots were inspected directly, not reconstructed.

After installation, a separate probe loaded the installed bundles through OpenClaw 2026.9.6's actual session MCP runtime, with **all separately configured MCP servers removed in memory**. It discovered GoDaddy and Excalidraw, reported no diagnostics, and successfully called domain availability / read_me. This rules out a config override masking a broken bundle. Autoreview initially claimed the native manifests shadowed Cursor markers; source inspection and this runtime proof disproved it. Native precedence applies when explicit package entrypoints exist; these bundles have none. README now explains that invariant.

Download receipts:

```json
[
  {
    "name": "godaddy-mcp",
    "version": "1.0.0",
    "files": 5,
    "sha256": "ef3655a74ddec780bb8f71deabbb0d8e98cac844ebabcbb3de81e8176dda7e3d",
    "simulatedSecurity": [
      "ClawScan",
      "TruffleHog"
    ]
  },
  {
    "name": "excalidraw-mcp",
    "version": "1.0.0",
    "files": 5,
    "sha256": "1882bb7cce590eae8fbe0721824414e37b5aad7fc274e99fb9cb8d92ca25a9ae",
    "simulatedSecurity": [
      "ClawScan",
      "TruffleHog"
    ]
  }
]
```

Installed bundle runtime proof:

```json
{
  "openclaw": "2026.9.6",
  "configOverrides": false,
  "installedBundleDefinitionsOnly": true,
  "servers": [
    "excalidraw",
    "godaddy"
  ],
  "diagnostics": [],
  "calls": [
    {
      "server": "godaddy",
      "tool": "domains_check_availability",
      "isError": false,
      "contentBlocks": 1
    },
    {
      "server": "excalidraw",
      "tool": "read_me",
      "isError": false,
      "contentBlocks": 1
    }
  ]
}

```

OpenClaw installation output (local simulated security overview omitted here, retained in the logs):

```text
│ Details: http://127.0.0.1:55890/plugins/godaddy-mcp/security-audit?version=1.0.0     │
╰──────────────────────────────────────────────────────────────────────────────────────╯
Downloading bundle godaddy-mcp@1.0.0 from ClawHub…
Extracting /private/tmp/openclaw/openclaw-clawhub-package-FedZXe/godaddy-mcp.zip…
Installing to /Users/patrickerichsen/Git/openclaw/clawhub-claw-723-manual/.artifacts/manual-curation/ocm/envs/manual-integrations-proof/.openclaw/extensions/godaddy-mcp…
Installed plugin: godaddy-mcp
Saved for the next Gateway start.
│ Details: http://127.0.0.1:55890/plugins/excalidraw-mcp/security-audit?version=1.0.0  │
╰──────────────────────────────────────────────────────────────────────────────────────╯
Downloading bundle excalidraw-mcp@1.0.0 from ClawHub…
Extracting /private/tmp/openclaw/openclaw-clawhub-package-ZyrCcA/excalidraw-mcp.zip…
Installing to /Users/patrickerichsen/Git/openclaw/clawhub-claw-723-manual/.artifacts/manual-curation/ocm/envs/manual-integrations-proof/.openclaw/extensions/excalidraw-mcp…
Installed plugin: excalidraw-mcp
Saved for the next Gateway start.
```

Final commits:

```text
66f5474017 feat: curate official accountless company MCP bundles
fde87a7730 test: prove curated bundles through catalog download and install
55f67573da docs: explain curated bundle manifest precedence
```
 Initial runs proved both exact-byte downloads and OpenClaw installs, then failed the Featured-vs-New catalog assertion. That assertion was corrected. Subsequent runs failed closed at Plugin Inspector on ENOSPC; reproducible package caches were cleared before retrying. No security gate was disabled.


---

## Read-only research appendix: key-candidates.md

# CLAW-723 manual curation: 20 provisional key/no-auth candidates

Research date: 2026-09-28 UTC. Read-only primary-source audit. No credentials accessed, accounts created, DCR registrations submitted, or authenticated tool calls made. **Include** below means eligible for implementation/testing, not certified or approved to ship. Account/authentication/tool proof, normal ClawHub security gates, and a current duplicate check remain required.

## Findings that change the provisional list

- “No OAuth” does not mean no authentication. Only GoDaddy and Excalidraw are remote no-auth offerings in this batch. Playwright is local no-auth software, with substantial overlap with OpenClaw's bundled browser.
- Most Cursor listings in this batch are **Cursor-authored wrappers**. Their upstream company-owned MCP service is an official offering; the wrapper is not company-authored. New ClawHub bundles must be independently authored endpoint/configuration adapters with separate maintainer and service-provider provenance. Do not transplant/relabel the Cursor plugin.
- PostHog also has an actual company-maintained Marketplace plugin, `PostHog/ai-plugin`. Its hooks include session telemetry; importing that whole plugin is inappropriate for a minimal endpoint integration.
- Ahrefs, Daloopa, Meltwater, Similarweb, and Smartsheet have paid/entitlement prerequisites. Profound API-key access requires Enterprise and support enablement. Semrush documents individual review for other AI-agent integrations. A 401/405 or an OAuth discovery document establishes none of these entitlements.
- GoDaddy is the best simple accountless end-to-end candidate. Buffer, Hunter, Coda/Docs, PostHog, and Statsig have documented user-token paths worth testing; GitHub has a first-party PAT path with broad, distinct repository capabilities.

## Decision matrix

| Candidate | Auth classification for proposed adapter | Decision at research stage | Category | Specific next proof/blocker |
|---|---|---|---|---|
| Ahrefs | User MCP key (Bearer); OAuth also offered | Blocked | Sales & marketing | Existing Lite+ entitlement and permitted OpenClaw client path; no paid signup |
| Brevo | User MCP-specific token (Bearer) | Include for testing | Sales & marketing | Generate MCP token, read-only tool smoke; regular API key is wrong |
| Buffer | User API key (Bearer) | Include for testing | Sales & marketing | Free account + verified email; read account/channels only |
| Coda / Superhuman Docs | User PAT restricted to MCP (Bearer) | Include for testing | Documents & files | Use new Docs host; create MCP read token; verify plan limits |
| Daloopa | User API key (`X-API-KEY`) | Blocked | Finance & payments | Existing API/MCP entitlement; no paid subscription or partner provisioning |
| Excalidraw | No auth, remote | Include for testing | Media | Tools/resources in OpenClaw; MCP App rendering optional; license caveat below |
| Fireflies | User API key (Bearer) | Include for testing | Inbox & collaboration | Account/API entitlement and read-only transcript tools; never upload real meetings for proof |
| GitHub | User PAT (Bearer) | Include for testing | Developer tools | Least-privilege read token; public repo tool smoke; distinct from Copilot |
| GoDaddy | No auth, remote | Include for testing | Infrastructure | Initialize/list tools + domain availability call; no purchase |
| Guru | User email + API token combined in Bearer | Include for testing | Context | Account/admin token entitlement; avoid OAuth allowlisting route |
| Hunter | User API key (`X-API-Key`) | Include for testing | Sales & marketing | Free account key; free Discover/read-only query |
| Meltwater | User API token (`apikey`) | Blocked | Data & analytics | Subscription must include MCP package; fresh Marketplace listing absent |
| Playwright | No auth, local stdio | Exclude from initial service batch | Computer use | Local browser tool, not hosted service; substantial built-in overlap |
| PostHog | User PAT (Bearer); OAuth also offered | Include for testing | Data & analytics | MCP Server preset, project pinning/read-only filter; no telemetry hooks |
| Profound | Provider approval for API key; OAuth advertised | Blocked | Data & analytics | Key route excluded; independently verify DCR + account entitlement for OAuth route |
| Semrush | DCR or user API key; other-agent review documented | Exclude pending provider clarification | Sales & marketing | Docs require individual review for other agents; paid API units |
| Similarweb | User API key (`api-key`) | Blocked | Data & analytics | Existing API-access subscription/credits; no paid signup |
| Smartsheet | User API token (Bearer) | Blocked | Productivity | Business/Enterprise/AWM entitlement; choose account region |
| Statsig | User Console API key (`statsig-api-key`) | Include for testing | Data & analytics | Read-only Console key, not SDK client/server key |
| Wrike | User Permanent Access Token (Bearer) | Include for testing, inspect onboarding | Productivity | Token creation uses API-app UI; no OAuth client/secret needed for requests |

## Source, auth, licensing and security evidence

### Ahrefs

[Cursor discovery](https://cursor.com/marketplace/cursor/ahrefs) leads to Cursor's wrapper. The [provider MCP documentation](https://docs.ahrefs.com/en/mcp/docs/introduction) establishes company maintenance, `https://api.ahrefs.com/mcp/mcp`, Lite-or-higher access, unit charges, and manually generated MCP keys. A key adapter needs `Authorization: Bearer <MCP_KEY>`; do not substitute a normal unrelated key. Crucially, that same page disallows generic standalone HTTP/custom-bridge use and links an OpenClaw setup guide. Test via that supported OpenClaw path, not ad hoc data extraction. No paid plan may be created in this task. A new adapter can contain original metadata/config only; no provider or Cursor code/logo needs redistribution.

### Brevo

[Cursor discovery](https://cursor.com/marketplace/cursor/brevo). [Brevo's MCP guide](https://developers.brevo.com/docs/mcp-protocol) documents the provider-operated `https://mcp.brevo.com/v1/brevo/mcp`, Bearer **MCP token**, and 27 modules. [Token creation instructions](https://help.brevo.com/hc/en-us/articles/209467485-Create-and-manage-your-API-keys) distinguish MCP tokens and warn that converting the created key deactivates its ordinary-key form. Use a separate named test token and original configuration. This includes campaigns, contacts, CRM, senders and webhooks; publish/send/delete tools need gating. A contacts-only endpoint is available if narrower scope is selected deliberately.

### Buffer

[Cursor discovery](https://cursor.com/marketplace/cursor/buffer). [Provider MCP setup](https://developers.buffer.com/guides/integrations/mcp.html) explicitly supports native HTTP `https://mcp.buffer.com/mcp` plus `Authorization: Bearer <BUFFER_API_KEY>`. [Buffer's offering](https://buffer.com/mcp) says MCP is available on Free. [API-key setup](https://support.buffer.com/en-us/articles/how-to-create-your-buffer-api-key-ShIgYVwM6j) requires verified email and documents permissions. User-key auth avoids registered OAuth clients. Prefer `get_account`/`list_channels` proof. Writes can immediately publish, schedule or delete real social content; keep proof read-only. Original adapter only, service remains proprietary; do not infer server MIT from Cursor.

### Coda / Superhuman Docs

[Cursor discovery](https://cursor.com/marketplace/cursor/coda). [Current provider setup](https://help.superhuman.com/hc/en-us/articles/46210076980365-Connect-to-the-Superhuman-Docs-MCP) supersedes old `coda.io` setup: use `https://docs.superhuman.com/apis/mcp`. Existing Coda connections temporarily work but new features are on Docs. PAT must have **restriction type MCP**, with desired read/write access, and be sent as `Authorization: Bearer <TOKEN>`. Use read access for proof and honor document/folder access restrictions. Current docs support OAuth too, but no DCR assumption is needed for this accepted PAT route. No copied client, logo or provider code; independently authored metadata/config.

### Daloopa

[Cursor discovery](https://cursor.com/marketplace/cursor/daloopa). [Provider integration guide](https://docs.daloopa.com/docs/mcp-integrations) identifies `https://mcp.daloopa.com/server/mcp`. [Authentication](https://docs.daloopa.com/docs/mcp-authentication) permits **direct `X-API-KEY: <KEY>`**, avoiding both OAuth and the separate 24-hour bearer exchange. Financial datasets/filings remain subscription data. [Partner trial provisioning](https://docs.daloopa.com/docs/partnerships) explicitly needs authorized partner access and sales setup; do not use it as a public signup workaround. Block live validation until an allowed existing/free entitlement is available. Original endpoint adapter does not grant redistribution rights to datasets.

### Excalidraw

[Cursor discovery](https://cursor.com/marketplace/cursor/excalidraw). [Company-owned MCP repository](https://github.com/excalidraw/excalidraw-mcp) recommends `https://mcp.excalidraw.com`; final MCP URL is `https://mcp.excalidraw.com/mcp`. Remote public diagram MCP is separate from authenticated Excalidraw+ workspaces. README and [package metadata](https://github.com/excalidraw/excalidraw-mcp/blob/main/package.json) say MIT; GitHub's license API is null and the root has no standalone LICENSE. Therefore reference the hosted endpoint with independently authored adapter text; do not blindly copy the server. The package has postinstall/runtime dependencies irrelevant to remote use. Do not forward Cursor-specific `X-Cursor-Plugin`. OpenClaw MCP Apps are opt-in; basic tools can work without claiming an interactive UI has been tested.

### Fireflies

[Cursor discovery](https://cursor.com/marketplace/cursor/fireflies). [Fireflies MCP help](https://guide.fireflies.ai/articles/8272956938-learn-about-the-fireflies-mcp-server-model-context-protocol) documents the company's `https://api.fireflies.ai/mcp` with `Authorization: Bearer <API_KEY>` and where Developer Settings exposes the key. OAuth is optional for this adapter. [Provider overview](https://fireflies.ai/blog/fireflies-mcp-server) confirms API-key access to meeting metadata/transcripts and standard API terms. API/data entitlement still needs actual free/test-account validation; “try for free” is not proof every MCP capability is free. Meeting data is sensitive; list/search synthetic test meetings only, never bulk-export user meetings. Original adapter, not a copied proprietary server.

### GitHub

[Cursor discovery](https://cursor.com/marketplace/cursor/github). [GitHub's own MCP repository](https://github.com/github/github-mcp-server) is MIT-licensed and supports repos, issues, PRs, Actions, code/security and collaboration. [Host-integration contract](https://github.com/github/github-mcp-server/blob/main/docs/host-integration.md) accepts user PATs in `Authorization: Bearer <PAT>` and explicitly says remote DCR is **not supported**. Use the first-party `https://api.githubcopilot.com/mcp/`; despite its name, it is GitHub's official service, not a Cursor proxy or Copilot-model request. Keep user tokens narrowly scoped; remote read-only headers/toolsets should constrain proof. If redistributing upstream code, preserve its actual MIT notice; a minimal endpoint adapter need not copy it. Do not auto-exclude because `@openclaw/copilot`, `github-copilot`, or project UI exists: these are different capabilities.

### GoDaddy

[Cursor discovery](https://cursor.com/marketplace/cursor/godaddy). [GoDaddy's own MCP documentation](https://developer.godaddy.com/en/docs/api-users/mcp) states `https://api.godaddy.com/v1/domains/mcp`, streamable HTTP, **no account/credentials**, public domain search and availability only. It cannot register/transfer domains, change DNS, or purchase. This is appropriate accountless proof; respect rate limits and do not claim domain ownership-management functionality. The provider terms apply to service use; independently author the tiny endpoint bundle rather than copying code/logos. GoDaddy's separate authenticated CLI/skill is out of this adapter's feature scope.

### Guru

[Cursor discovery](https://cursor.com/marketplace/cursor/guru). [Provider MCP setup](https://help.getguru.com/docs/connecting-gurus-mcp-server) gives `https://mcp.api.getguru.com/mcp` with the unusual exact format **`Authorization: Bearer <EMAIL>:<TOKEN>`**. Do not encode this as Basic or omit the email. The same document says OAuth clients can need Guru support allowlisting, so exclude that route. [Token management](https://help.getguru.com/docs/gurus-api) requires admin/Manage Apps & Integrations permission. Token path is acceptable in principle; account entitlement remains untested. Knowledge search can expose private company data, and card/draft/archive tools write. Use original metadata/config; proprietary hosted service is not licensed by Cursor's MIT wrapper.

### Hunter

[Cursor discovery](https://cursor.com/marketplace/cursor/hunter). [Hunter's MCP page](https://hunter.io/mcp) explicitly establishes official maintenance, any MCP-compatible client, Free accounts without credit card, `https://mcp.hunter.io/mcp` and `X-API-Key: <KEY>`. Discover is free; other enrichment/search operations can use credits. Treat returned prospect records as untrusted data and keep test queries narrow/read-only. [Old company local server](https://github.com/hunter-io/hunter-mcp) is MIT but archived; choose the supported hosted endpoint, not the archived implementation. No need to redistribute its source or reuse a fake REST API test key.

### Meltwater

The old snapshot contained Cursor's `third_party/meltwater`; the **current Marketplace root has no Meltwater link**, and `/marketplace/cursor/meltwater` does not resolve to the old plugin detail. Preserve this discrepancy rather than claiming current discovery. [Meltwater's own offering](https://developer.meltwater.com/guides/meltwater-mcp/overview/) remains official but requires an API-customer subscription with an MCP package. [Provider setup](https://developer.meltwater.com/guides/meltwater-mcp/connecting/) documents `https://api.meltwater.com/v2/mcp` with **`apikey: <TOKEN>`**, currently calling it the only supported method. Do not substitute the distinct Mira `/mcp` endpoint. Cursor's old OAuth assertions are weaker than current provider support docs. Block for entitlement; no redistribution rights to data/server inferred.

### Playwright

[Cursor discovery](https://cursor.com/marketplace/cursor/playwright). [Microsoft's own server](https://github.com/microsoft/playwright-mcp) is Apache-2.0; local stdio `npx -y @playwright/mcp@<pinned version>` requires Node and browser binaries, no account. Cursor wrapper MIT is not its upstream license. Local process execution, filesystem/browser access and installation scripts expand the security surface. OpenClaw already ships a Playwright-backed browser with isolated profiles, navigation/actions/snapshots/screenshots/downloads and browser skill. This is an official developer tool, but not a third-party hosted service integration, and adds major capability overlap. Recommend excluding from the initial curated service batch, keeping it in the audit instead of silently shipping a duplicate browser.

### PostHog

[Company Marketplace listing](https://cursor.com/marketplace/posthog) points to [PostHog/ai-plugin](https://github.com/PostHog/ai-plugin), pinned by Marketplace at `db4a86632293ca66eec9a6d278786ddb22c1787e`; this differs from [Cursor's URL-only wrapper](https://cursor.com/marketplace/cursor/posthog-mcp). [Provider MCP overview](https://posthog.com/docs/model-context-protocol) establishes free hosted `https://mcp.posthog.com/mcp`, although AI-powered tools may incur PostHog AI spend. [Auth/safety FAQ](https://posthog.com/docs/model-context-protocol/faq) supports `Authorization: Bearer <PAT>` with **MCP Server preset**, project/organization pinning and read-only tool filtering. Do not import the company plugin's session telemetry hooks or 70+ unrelated assets; its GitHub license metadata is null. Independently author the minimal adapter. PostHog's [MIT pi client](https://github.com/PostHog/posthog-pi) provides additional first-party PAT evidence, not permission to copy unrelated plugin files.

### Profound

[Cursor discovery](https://cursor.com/marketplace/cursor/profound). [Provider connection guide](https://docs.tryprofound.com/mcp/connection-tutorials/connect-ai-coding-tools) uses `https://mcp.tryprofound.com/mcp`. [Authentication](https://docs.tryprofound.com/mcp/authentication) advertises OAuth 2.1; long-lived Bearer API keys need **Enterprise plus support-provided API access**. Therefore the seed's key/no-OAuth path fails the no-provider-approval rule. Mark blocked unless a separate DCR path is verified and a permitted existing/free account can authenticate. Analytics can be read-only but agent tools create/publish/run definitions. Do not claim verified OAuth/DCR or licensing for copied server code; original adapter only after auth qualification.

### Semrush

[Cursor discovery](https://cursor.com/marketplace/cursor/semrush). [Provider MCP documentation](https://developer.semrush.com/api/v4/introduction/semrush-mcp/) supports `https://mcp.semrush.com/v2/mcp`, automatic client registration and alternate **`Authorization: Apikey <KEY>`** (not Bearer). It requires eligible paid plans/API units and explicitly says requests to connect other AI agents/LLM tools are reviewed individually. Classify provider-approval ambiguity as excluded pending clarification rather than treating successful metadata discovery as authorization. Do not create a paid plan or contact sales within this task. Read-only SEO data still consumes units and remains subject to data-use restrictions.

### Similarweb

[Cursor discovery](https://cursor.com/marketplace/cursor/similarweb). [Provider overview](https://developers.similarweb.com/docs/similarweb-mcp) documents `https://mcp.similarweb.com`, an API-access subscription (API-only/Business/Enterprise), active key and data-credit charges. [Provider client setup](https://developers.similarweb.com/docs/cursor-mcp-integration) uses **`api-key: <KEY>`**, not Authorization. Connect directly via OpenClaw HTTP rather than carrying a redundant `mcp-remote` process. Block live test for entitlement under the no-paid-plans instruction. Existing `@crawlora-org/similarweb` snapshot listing is a third-party package; compare endpoints/tools/owner before choosing whether it is a duplicate. Original adapter does not convey rights to redistribute provider datasets.

### Smartsheet

[Cursor discovery](https://cursor.com/marketplace/cursor/smartsheet). [Current provider installation guide](https://developers.smartsheet.com/ai-mcp/smartsheet/install-the-smartsheet-mcp-server) requires Business/Enterprise/Advanced Work Management and an API token for generic clients. US `https://mcp.smartsheet.com`, EU `.eu`, AU `.au`; choose the user's region deliberately. User token goes in `Authorization: Bearer <TOKEN>`. Prior nested `/mcp-server/install-the-smartsheet-mcp-server` docs path is stale/404. Block test until permitted entitlement exists; do not buy a plan. Sheet/row/workspace operations include destructive writes. Use independently authored endpoint/config metadata and preserve region/data sensitivity.

### Statsig

[Cursor discovery](https://cursor.com/marketplace/cursor/statsig). [Provider Cursor guide](https://docs.statsig.com/integrations/mcp/cursor) documents `https://api.statsig.com/v1/mcp` plus an alternative **`statsig-api-key: <CONSOLE_API_KEY>`**. Its Markdown representation contains the collapsed key setup omitted by some rendered scrapers. OAuth issues a Personal Console API Key and needs org-role permission, but direct read-only Console keys avoid assuming DCR support. [Key types](https://docs.statsig.com/access-management/api-keys) distinguish Console from client SDK/server secret keys. Choose read-only Console access for proof; whole-entity update tools can delete omitted fields. Original metadata/config only; provider runtime remains separate.

### Wrike

[Cursor discovery](https://cursor.com/marketplace/cursor/wrike). [Generic client setup](https://developers.wrike.com/docs/setup-other-mcp-clients-with-wrike-mcp) specifies `https://mcp.wrike.com/v2` with **`Authorization: Bearer <PERMANENT_ACCESS_TOKEN>`**, recommending PAT for clients needing DCR. [Current PAT instructions](https://developers.wrike.com/docs/mcp-legacy-authentication-pat) create/open an API app in Apps & Integrations, then generate a user token. No OAuth client ID/secret or callback is needed for this token path; however the onboarding UI uses “app” terminology, so inspect it and stop if it actually requires managed OAuth registration/approval. Tokens inherit broad user permissions and never expire. Read-only workspace listing proof; no task/comment writes. Original adapter, not an OAuth app or copied server.

## OpenClaw compatibility and deduplication evidence

Read-only local sources inspected in `/Users/patrickerichsen/Git/openclaw/openclaw`:

- `docs/cli/mcp.md`: saved remote definitions support `url`, native `headers`, OAuth, `probe`, tools and credential configuration. OAuth and static Authorization are different paths: `auth: "oauth"` ignores static Authorization. A user-key adapter must not also force OAuth. Use the repository's actual SecretRef/credential configuration mechanics during implementation; this audit does not assert an interpolation syntax works without tests.
- `docs/tools/browser.md`: built-in Playwright-backed navigation, click/type, snapshots, screenshots/PDFs/downloads and isolated profiles substantially overlap Playwright MCP.
- `extensions/github-copilot` and `docs/providers/github-copilot.md`: model-provider/runtime functionality is not GitHub's repository/issue/PR/Actions MCP offering. Similar brand names are insufficient deduplication.
- No direct name match found for the other service providers in the inspected extension paths. This is absence of a named native extension, not proof all skills/packages are absent.

Existing saved production snapshot: `clawhub-claw-723-priority/.artifacts/local-crawl/production-catalog.json`, fetched `2026-09-28T00:09:01.717Z`, 2,194 packages. Exact name/display-name scan found potential GitHub alternatives (`@chris-openclaw/github-workflow`, `@liwmj/openclaw-gh-sync`, `@crawlora-org/github`) and `@crawlora-org/similarweb`; no direct named matches for the other 18 except unrelated “freebie-hunter”. This is a **snapshot-level lead**, not live semantic deduplication. Fetch current package details and compare provider endpoint, tool coverage, ownership and package identity before publishing; do not delete third-party packages because their names overlap.

## License/provenance rule for implementation

For hosted proprietary MCP offerings, docs establish an official provider endpoint and supported connection method, not an open-source license for the server. A small original OpenClaw/ClawHub connection bundle should name its own maintainer and license, identify the provider and official docs separately, and preserve service terms. Do not copy Cursor READMEs, logos, hooks, skills or author fields unless their own licensing and intent are explicitly reviewed. Native MCP transport avoids a new proxy and avoids claiming that ClawHub maintains the upstream service. Company source ownership is established by provider-domain documentation (all hosted rows) or company-owned repository (Microsoft/GitHub/Excalidraw/PostHog); the Marketplace badge alone is insufficient.

No security scan results or successful authenticated tool calls are claimed in this report. Read-only research is not an end-to-end validation gate.


---

## Read-only research appendix: dcr-candidates.md

# CLAW-723: company-maintained OAuth/DCR candidate audit

Research date: 2026-09-27 Pacific / 2026-09-28 UTC. Scope: Ashby, Brex, Calendly, Circleback, Clay, Customer.io, Intercom, Juicebox, Klaviyo, Mercury, Outreach, Upwork, Notion. Read-only research; no accounts, credentials, DCR registrations, consent flows, tool calls, or external writes performed by this researcher.

## Decision conventions

- **Include candidate** means the company-maintained service and documented authentication meet selection criteria. It does **not** mean authenticated OpenClaw compatibility has been proved or the package is approved to publish.
- **Blocked** means a specific entitlement, access, licensing, or compatibility issue prevents acceptance now. Provider-side registration approval is distinct from a customer's normal workspace-admin settings.
- These are provider-maintained MCP offerings. Except where a company repository is identified below, the reviewed Cursor package is a **Cursor-authored wrapper**, not company-authored code. Do not import or relabel that wrapper. A fresh minimal endpoint bundle must attribute its own author/maintainer accurately and separately identify the upstream service company.
- Provider docs authorizing MCP client connections are evidence for using their endpoint. They are not licenses to redistribute provider source code, logos, documentation, or skills. Original configuration/README content should avoid that copying. Service terms still govern use; no legal approval is implied.

## Summary

| Candidate | Auth classification | Endpoint | Proposed category | Decision at research stage |
|---|---|---|---|---|
| Ashby | DCR documented; live discovery blocked | `https://mcp.ashbyhq.com/mcp/v1` | Productivity / integrations | **Blocked:** Cloudflare browser-signature denial; eligible-org account and admin enablement also required |
| Brex | DCR metadata + user API token | `https://api.brex.com/mcp` | Finance & payments | **Include candidate**, but account/API agreement/early-access entitlement must be available before authentication proof |
| Calendly | DCR only | `https://mcp.calendly.com/` | Scheduling | **Include candidate**; verify OpenClaw loopback callback acceptance |
| Circleback | DCR | `https://circleback.ai/api/mcp` | Inbox & collaboration / productivity | **Blocked as a new duplicate:** official OpenClaw package already exists; assess reuse before adding another |
| Clay | DCR | `https://api.clay.com/v3/mcp` | Sales & marketing | **Include candidate**; workspace must allow unknown MCP clients |
| Customer.io | DCR | `https://mcp.customer.io/mcp` | Sales & marketing | **Include candidate**; company-owned MIT plugin available |
| Intercom | DCR or user bearer token | `https://mcp.intercom.com/mcp` | Inbox & collaboration | **Include candidate**; token scopes or user OAuth consent required |
| Juicebox | DCR | `https://mcp.juicebox.ai/v1` | Productivity / integrations | **Blocked:** MCP requires paid-plan entitlement; no purchase permitted |
| Klaviyo | DCR; separate local server supports API key | `https://mcp.klaviyo.com/mcp` | Sales & marketing | **Include candidate**, prefer remote read-only query parameter for testing |
| Mercury | DCR | `https://mcp.mercury.com/mcp` | Finance & payments | **Include candidate**, but banking account entitlement and live discovery fallback need proof |
| Outreach | DCR, server metadata requires `client_secret_post` | `https://api.outreach.io/mcp/` | Sales & marketing | **Blocked:** OpenClaw currently registers public `none` clients; test before acceptance |
| Upwork | DCR | `https://mcp.upwork.com/mcp` | Productivity / integrations | **Include candidate**, use read-only account test; avoid paid actions/Connects |
| Notion | DCR | `https://mcp.notion.com/mcp` | Documents & files / productivity | **Include endpoint candidate**; **block copying bundled skills** pending license permission |

The category labels above reflect the requested refreshed catalog taxonomy, not the legacy broad Cursor `integrations` category. Main implementer must map them to current schema slugs. This audit did not change categories or files in any existing tree.

## Evidence by candidate

### Ashby

[Ashby's official MCP guide](https://docs.ashbyhq.com/ashby-mcp-server-beta) identifies the company-hosted URL, client-agnostic operation and DCR support. OAuth is per user. An org admin must enable MCP, then elevated-access users can connect. All full Ashby plans qualify; analytics-only organizations do not. Recruiting reads and writes inherit user permissions.

The endpoint and three well-known metadata paths returned HTTP 403 with Cloudflare error 1010, `browser_signature_banned`, on 2026-09-28T01:45:01Z. The response explicitly said owner action is required. No bypass or further retries were attempted after inspecting the batch. This is not evidence of successful OAuth or a requirement to register a manual OAuth app. Main may test using the ordinary OpenClaw client; if denied there, the exact blocker is provider access, plus an entitled Ashby workspace. Do not create a synthetic recruitment/company identity.

No company-owned distributable plugin repository/license was verified. Avoid the community Ashby implementations. Use original endpoint configuration only if access is proved.

### Brex

[Brex support](https://www.brex.com/support/using-brex-in-ai-apps) explicitly describes its official hosted MCP, OAuth and user/API-token authentication. Admin prerequisites include enabling the early-access feature and accepting the Developer API agreement; Developer API access is required. Those are customer setup requirements, not evidence that an OpenClaw OAuth app must be manually provisioned.

Live [authorization metadata](https://api.brex.com/.well-known/oauth-authorization-server) returned HTTP 200 with registration `https://api.brex.com/v3/clients`, `none` and `client_secret_post`, and S256. This proves advertised DCR, not successful registration or entitlement.

Use OpenClaw native DCR; an API-token alternative must send `Authorization: Bearer` through the user credential mechanism and limited scopes. Prefer account/expense reads. Financial and expense writes must not run as research. No distributable company plugin license was verified; author minimal configuration instead of copying Cursor assets. Review the [Brex access agreement](https://www.brex.com/legal/developer-portal) through the normal authorized account flow; no paid/banking account application is implied by eligibility.

### Calendly

[Calendly's MCP guide](https://developer.calendly.com/docs/mcp/calendly-mcp-server) states that Calendly operates the hosted server and requires OAuth 2.1 DCR with PKCE; PATs and static developer-console OAuth applications are not supported for MCP. Registration needs no registration token and uses public `token_endpoint_auth_method: none`.

Metadata GETs succeeded. [Authorization metadata](https://calendly.com/.well-known/oauth-authorization-server) advertises `https://calendly.com/oauth/register`, `none`, and S256. Protected-resource metadata is `https://mcp.calendly.com/.well-known/oauth-protected-resource`.

The docs require exact HTTPS redirects in production and say localhost/127.0.0.1 HTTP may be accepted depending on environment policy. **Do not assume OpenClaw's loopback callback works until a real DCR attempt.** Scope includes scheduling read and write. Test availability or existing event types, not bookings/cancellations. No company plugin source license was established; do not copy Cursor wrapper or branding.

### Circleback

[Circleback support](https://support.circleback.ai/en/articles/13249081-circleback-mcp) explicitly documents Streamable HTTP and DCR at the official endpoint. [Its plan announcement](https://circleback.ai/releases/new-plans) says the free plan includes MCP/API/CLI access, with limited history. Live metadata advertises `https://circleback.ai/api/oauth/register`, `none`/`client_secret_post`, S256 and `user` scope.

There are two company-owned repositories: [Cursor plugin](https://github.com/circlebackai/cursor-plugin) and [existing OpenClaw plugin](https://github.com/circlebackai/openclaw-plugin). The latter's package is `@circleback/openclaw-plugin` version `0.1.6`, depends on `@circleback/cli` `0.4.0`, and declares plugin API >=2026.3.24-beta.2. **Do not add a duplicate without comparing the production package snapshot and existing native offering.**

The Cursor manifest declares MIT, but its repository tree has no LICENSE file. The OpenClaw repository also has no LICENSE file or package license field. Do not silently infer blanket code/asset redistribution permission. Direct use of the official endpoint can remain a separately assessed option if the existing integration has a capability gap. Meeting/email content is sensitive; test account metadata or empty fixture searches only.

### Clay

[Clay's platform guide](https://university.clay.com/docs/connect-to-clay-mcp) verifies ownership and open DCR without Clay-side approval. Public native/CLI clients use `none` and PKCE; confidential web clients use a secret. HTTP loopback and private-use scheme callbacks are accepted. Register once and retain credentials; registration is rate-limited. Refresh tokens rotate. MCP session IDs must be echoed.

The workspace admin's `Unknown` client option governs DCR clients; disabling it blocks initial auth and refresh. That is a workspace policy, not mandatory provider allowlisting. Live [metadata](https://api.clay.com/.well-known/oauth-authorization-server) advertises `https://api.clay.com/oauth/register`, S256 and `mcp` scope.

OpenClaw should use native DCR, preserve its existing secure credential store, and send session headers through its SDK. Tools can consume enrichment credits and execute custom functions; begin with read-only discovery/account context. No company-owned redistributable plugin source/license was established; configure the endpoint independently.

### Customer.io

[Company setup docs](https://docs.customer.io/ai/plugins/cursor-grok-bot/) link its [company-owned Cursor plugin](https://github.com/customerio/cursor-plugin), whose GitHub repository reports MIT. The [company Claude plugin](https://github.com/customerio/claude-plugin) also has an actual MIT LICENSE and uses `https://mcp.customer.io/mcp`. Both are company offerings; there is no need to copy `cursor/plugins/third_party/customer-io`.

[MCP docs](https://docs.customer.io/ai/mcp/get-started/) describe account-admin enablement and per-user role restrictions. Default scope is `read`; sensitive reads, draft writes, live writes and configuration are separate permissions. The new company-plugin docs say the home region is selected automatically after OAuth using the single connector, while the generic IDE page still lists US/EU endpoints. Prefer the company plugin's canonical URL; record this documentation inconsistency if testing EU accounts.

Live [metadata](https://mcp.customer.io/.well-known/oauth-authorization-server) advertises `/oauth2/register`, `none` and S256. Native OpenClaw DCR should request only `read` initially. Validate with `cio_auth_status` and read-only workspace enumeration. MIT notices must accompany any copied company plugin content; remote service terms remain separate.

### Intercom

[Intercom developer docs](https://developers.intercom.com/docs/guides/mcp) verify the hosted service and explicitly support automatic OAuth or direct bearer-token authentication. Documented permissions include contacts/companies, conversations, and articles; article capabilities can write. The remote HTTP endpoint is preferable to the legacy SSE transport and does not require distributing an `mcp-remote` subprocess wrapper.

Live [authorization metadata](https://mcp.intercom.com/.well-known/oauth-authorization-server) advertises `https://mcp.intercom.com/register`, `none`, `client_secret_basic`, `client_secret_post`, and S256. Native OpenClaw OAuth is the primary candidate; user bearer-token header is a separate mode and should never be combined with `auth: oauth` because OpenClaw ignores static Authorization headers in that mode.

No company-owned plugin repository license was established. Do not label the Cursor-authored wrapper as Intercom-authored. Test read-only identity/list/search on the new account, and avoid exposing support conversations from a real organization in proof artifacts.

### Juicebox

[Official Juicebox docs](https://docs.juicebox.ai/juicebox-mcp) verify ownership, exact endpoint, OAuth DCR and per-user permissions. **MCP is available only on paid plans.** Some shortlist/candidate/project tools require Business specifically. Detailed candidate exports may consume plan limits; agent creation can start sourcing automatically.

Live [metadata](https://mcp.juicebox.ai/.well-known/oauth-authorization-server) returned registration `https://mcp.juicebox.ai/api/oauth/register`, public `none`, S256, and scopes `analytics:read`, `agents:write`. This supports protocol eligibility but does not remove the paid entitlement barrier.

Decision: **blocked for live authentication/testing unless an existing authorized account already has the required entitlement**. Do not buy a plan. If available, request `analytics:read`, then schema or an empty test report; avoid agent creation, sourcing and candidate exports. No company-owned redistributable plugin repository/license was established. An original endpoint bundle can be reconsidered after authenticated proof, with the account requirement visible.

### Klaviyo

[Official connection docs](https://developers.klaviyo.com/en/docs/connect_to_the_klaviyo_mcp_server) recommend the hosted endpoint, Streamable HTTP and OAuth DCR. A separate local-server install supports `PRIVATE_API_KEY`; that does not establish bearer-key support on the hosted endpoint. Do not conflate those modes.

Live [metadata](https://mcp.klaviyo.com/.well-known/oauth-authorization-server) advertises `/register`, `none` and S256. For initial OpenClaw proof, use `https://mcp.klaviyo.com/mcp?read-only=true`; optionally disable tools exposing user-generated content or restrict `toolsets` to required read scopes. These provider-supported options reduce write and prompt-injection exposure.

No company plugin source was selected for redistribution in this audit. The remote original-configuration route avoids runtime downloads and copied code. Authenticate a free/test account and enumerate or read fixture-owned lists only. Use current source metadata to avoid duplicate servers/packages.

### Mercury

[Mercury's connection guide](https://docs.mercury.com/docs/connecting-mercury-mcp) explicitly supports DCR without prior application provisioning. Native clients use `none` with loopback callback; web clients may get a secret. It documents two discovery quirks: missing `resource_metadata` challenge pointer and root-only protected-resource metadata. Request `offline_access` if refresh is needed.

Live [authorization metadata](https://mcp.mercury.com/.well-known/oauth-authorization-server) advertised `/register`, `none`/`client_secret_basic`, S256, `read`/`offline_access`. Verify the OpenClaw SDK discovers the root metadata before treating it as supported.

[Mercury security guidance](https://docs.mercury.com/docs/security-best-practices) describes read-only financial access; this still exposes sensitive balances, recipients and statements. An existing authorized bank account or genuine sanctioned test environment is needed. Do not create a fictitious business account or publish real financial response bodies. No company source-code redistribution license was established; package original endpoint configuration only.

### Outreach

[Outreach authentication docs](https://developers.outreach.io/mcp-server/authentication) explicitly promise DCR, OAuth 2.1 and PKCE with no manually registered app, and per-user RBAC. [Official setup](https://support.outreach.io/support/solutions/articles/159000429132-ask-outreach-via-chatgpt) specifies `https://api.outreach.io/mcp/` and blank optional client fields.

However, the live [authorization metadata](https://api.outreach.io/.well-known/oauth-authorization-server) returned only `token_endpoint_auth_methods_supported: ["client_secret_post"]`, registration `/mcpOAuth/register`, S256 and `prospects.all`. Current local OpenClaw `src/agents/mcp-oauth-provider.ts` creates registration metadata with `token_endpoint_auth_method: none`. **This mismatch needs a real OpenClaw registration test; do not claim compatibility merely because the server advertises DCR.** A dynamically issued secret is different from manually provisioning an OAuth app, but whether current OpenClaw can negotiate it is unresolved.

Decision: blocked on compatibility and an entitled test account. Do not add a manual OAuth-app exception. No company source license verified. If later accepted, use read-only identity/schema operations; sales writes may send outreach or delete records.

### Upwork

[Upwork's official MCP page](https://www.upwork.com/ai/mcp) says the service is built and maintained by Upwork, uses OAuth 2.1 DCR, and is free with any Upwork account. No manual OAuth app is needed. Financial actions complete on upwork.com; proposals can spend Connects.

Live [metadata](https://mcp.upwork.com/.well-known/oauth-authorization-server) advertises registration `https://www.upwork.com/register`, public `none` and S256, with auth/token endpoints on official Upwork domains. **Main must verify this unusual registration URL using native OpenClaw DCR** rather than assume it is the ordinary human signup endpoint or manually post guessed fields.

Use read-only account/talent discovery on a legitimate free test account. Do not submit proposals, jobs, contracts or purchases during proof. [Upwork support](https://support.upwork.com/hc/en-us/articles/55446516654611-How-to-use-Upwork-with-AI-agents-through-MCP) links API/MCP terms and directs questions about custom scheduled/hosted workflows to support; no recurring automation is in this task. No company source redistribution license established; minimal original config only.

### Notion and its skills

[Notion's own repository](https://github.com/makenotion/cursor-notion-plugin) identifies the official company plugin, a Notion Labs author, direct Notion MCP, and 14 integration skills. [Notion client docs](https://developers.notion.com/guides/mcp/build-mcp-client) document DCR, PKCE, token refresh and secure storage, with public `none` client registration. Live [metadata](https://mcp.notion.com/.well-known/oauth-authorization-server) advertises `/register`, `none`, S256, `default` scope. Prefer Streamable HTTP at `/mcp`; the service also offers `/sse`.

**Endpoint: include candidate, pending actual OpenClaw connection and read-only tools proof.** Use existing OpenClaw OAuth flow; do not create a manually provisioned Notion public OAuth application. `notion-get-tool-access` can identify plan-dependent operations before using them.

**Skills: block redistribution pending license evidence.** The repository's GitHub license field is null, recursive tree contains no LICENSE file, and plugin manifest has no license field. Notion ownership does not grant us a redistribution license. All 14 target third-party Notion workspaces rather than internal Notion engineering, so their subject matter fits scope: search, find, create-page, create-task, create-database-row, database-query, tasks-setup, tasks-build, tasks-plan, tasks-explain-diff, knowledge-capture, meeting-intelligence, research-documentation, spec-to-implementation. Write/task skills require fixture-only review and content inspection after permission is resolved. Do not inherit a license from unrelated Notion/OpenAI repositories.

## Live discovery evidence and OpenClaw implications

All 12 non-Ashby URLs below were fetched read-only and returned HTTP 200 JSON containing the listed registration endpoint on this audit date. **No registration was performed. No user authenticated. No tools/list or tools/call succeeded or was attempted.** The Ashby error is described above.

| Provider | Metadata URL | Registration endpoint | Public `none` advertised? |
|---|---|---|---|
| Brex | `https://api.brex.com/.well-known/oauth-authorization-server` | `https://api.brex.com/v3/clients` | Yes |
| Calendly | `https://calendly.com/.well-known/oauth-authorization-server` | `https://calendly.com/oauth/register` | Yes |
| Circleback | `https://circleback.ai/.well-known/oauth-authorization-server` | `https://circleback.ai/api/oauth/register` | Yes |
| Clay | `https://api.clay.com/.well-known/oauth-authorization-server` | `https://api.clay.com/oauth/register` | Yes |
| Customer.io | `https://mcp.customer.io/.well-known/oauth-authorization-server` | `https://mcp.customer.io/oauth2/register` | Yes |
| Intercom | `https://mcp.intercom.com/.well-known/oauth-authorization-server` | `https://mcp.intercom.com/register` | Yes |
| Juicebox | `https://mcp.juicebox.ai/.well-known/oauth-authorization-server` | `https://mcp.juicebox.ai/api/oauth/register` | Yes |
| Klaviyo | `https://mcp.klaviyo.com/.well-known/oauth-authorization-server` | `https://mcp.klaviyo.com/register` | Yes |
| Mercury | `https://mcp.mercury.com/.well-known/oauth-authorization-server` | `https://mcp.mercury.com/register` | Yes |
| Outreach | `https://api.outreach.io/.well-known/oauth-authorization-server` | `https://api.outreach.io/mcpOAuth/register` | **No**, only `client_secret_post` |
| Upwork | `https://mcp.upwork.com/.well-known/oauth-authorization-server` | `https://www.upwork.com/register` | Yes |
| Notion | `https://mcp.notion.com/.well-known/oauth-authorization-server` | `https://mcp.notion.com/register` | Yes |

OpenClaw local read-only reference: `/Users/patrickerichsen/Git/openclaw/openclaw/docs/cli/mcp.md` documents `mcp set`, `mcp login`, and `mcp doctor <name> --probe`. An ordinary saved configuration is `{ "url": "<official endpoint>", "transport": "streamable-http", "auth": "oauth", "oauth": { "scope": "<least required>" } }`. Do not add static Authorization headers to OAuth configurations. The client provider currently registers public `none` clients, uses authorization-code plus refresh-token grants, and persists credentials through its existing state store. The default legacy loopback callback is `http://127.0.0.1:8989/oauth/callback`; current login runtime may choose a stored/configured callback. Main must use the actual runtime's CLI and callback, not assume this source checkout matches the installed runtime.

A filename/manifest search of the existing OpenClaw core `extensions` tree did not find a built-in package for these 13 names. That is narrower than proving no equivalent exists in ClawHub. Circleback is an explicit external native equivalent. Main must compare the production snapshot, package identities and official source URLs before final inclusion; no catalog-wide deduplication claim is made here.

## Highest-value next tests for the main agent

1. Notion, Customer.io, Circleback, Calendly: provider ownership is strong, ordinary free/test accounts appear plausible, and DCR should run without a manual app. Resolve Circleback duplication and Notion skill rights separately.
2. Clay, Intercom, Klaviyo, Upwork: use native DCR then read-only tests, recording workspace policy/entitlement. Upwork registration URL and Calendly callback are real compatibility checks, not assumptions.
3. Brex/Mercury/Ashby/Juicebox/Outreach: attempt only ordinary authorized account/runtime paths. Record existing-entitlement, provider-denial or DCR mismatch blockers; do not buy plans, bypass Cloudflare or invent financial/business identities.

No candidate is authenticated-test-passed, security-scanned, packaged, or publication-approved by this research report.


---

## Read-only research appendix: unresolved-candidates.md

# CLAW-723 — unresolved-set search and separate candidate appendix

Audit date: 2026-09-27. Research only; no accounts, credentials, DCR registrations, OAuth grants, tool calls, package publishes, Git changes or Linear writes were performed by this researcher.

## Critical limitation: the original 27 cannot yet be identified

The requested prior **59-package auth audit was not found**. Searched CLAW-723 worktree `.artifacts` trees, bounded main-checkout artifact/tmp paths, and bounded `/tmp` filenames. Located the preserved 79-entry Cursor snapshot and older 426-entry cross-registry inventory; neither establishes which 59 were in that separate auth audit. The main agent also found no identities in Linear and has requested the source list. **Do not present the table below as the original 27.** There is no defensible count reconciliation until that baseline is supplied.

The available pinned Cursor snapshot is `cursor/plugins@ecc249f1e306fc64ddf83c7bed16cacf7c2239db`, recorded updated 2026-09-25T23:04:33Z. Subtracting the supplied 32 seeds yields **47 other wrappers**, not 27. Excluding proxy endpoints alone also does not reconcile the 59 count. This appendix audits those 47 separately so research can continue while the exact set is located.

Snapshot evidence: `.artifacts/cursor-only/cursor-snapshot.json` in the preserved `clawhub-claw-723-cursor-only` worktree. This is discovery evidence only. All these wrapper manifests name Cursor as author; their MIT label does **not** prove integrated-company authorship. Where vendor docs prove an official company-maintained MCP service, the candidate is that service with a new minimal OpenClaw-authored bundle, not the copied Cursor wrapper. If selection strictly requires a company-authored *plugin repository*, rather than a company-maintained MCP offering, rows without a company repo remain ownership-blocked.

## Read this table correctly

- **Include for validation** means the provider/source/auth combination merits main-agent testing; it is not approved to ship or claimed to work. Final selection still requires callback, authentication, tool, security and license proof.
- **Blocked** means evidence or access is incomplete; it does not mean the provider necessarily requires a managed app.
- **Exclude** means current evidence violates a named scope rule.
- DCR in this report means an unauthenticated public metadata GET advertised a registration endpoint. No client was registered. `none` and `S256` are compatibility signals, not proof that registration/callback/token exchange succeeds or that allowlisting is absent.
- License policy: for URL-only hosted services, no server/source/docs/logo bytes are redistributed; author the bundle metadata under the project license, attribute service ownership accurately, and preserve provider terms. Any copied code/skills require a separately pinned applicable license. No row is a completed security scan.
- OpenClaw config: DCR candidates need direct HTTP URL and OpenClaw's existing OAuth/DCR flow, no copied `CLIENT_ID`, secret, or Cursor `placement` setting. Token candidates need an explicit secret field with the documented Authorization/header mapping. Excluded/unknown rows get no active config.

## Separate 47-wrapper appendix

| Candidate | Auth bucket | Category | Decision | Provider/source evidence and remaining work |
|---|---|---|---|---|
| Amplemarket (`amplemarket`) | DCR | `sales-marketing` | **Include for validation** | [Official docs/source](https://knowledge.amplemarket.com/articles/8022685319-connecting-to-the-amplemarket-mcp-server). Vendor documents its own MCP and arbitrary clients; app.amplemarket.com metadata advertises public DCR + S256. CRM reads/writes; validate with a free/test account. Endpoint: `https://mcp.amplemarket.com/mcp`. |
| Attio (`attio`) | DCR | `sales-marketing` | **Include for validation** | [Official docs/source](https://docs.attio.com/mcp/overview). Vendor-hosted MCP; public DCR + S256 advertised. Read and write CRM tools; choose read-only proof. Existing community @superagnt/attio-crm is related, not evidence of an official equivalent. Endpoint: `https://mcp.attio.com/mcp`. |
| beehiiv (`beehiiv`) | DCR | `sales-marketing` | **Include for validation** | [Official docs/source](https://www.beehiiv.com/support/article/39255979546263-getting-started-with-the-beehiiv-mcp). Vendor docs explicitly allow any MCP client; public DCR + S256 advertised. Free plans can read; writing requires paid plan. No paid plan is needed for a read-only proof. Endpoint: `https://mcp.beehiiv.com/mcp`. |
| Coinbase (`coinbase`) | provider approval/allowlisting | `finance-payments` | **Exclude** | [Official docs/source](https://docs.cdp.coinbase.com/coinbase-for-agents/overview). Vendor explicitly says DCR and CIMD clients still require allowlisting. CLI/API-key fallback is a different integration, outside this hosted-MCP candidate. Do not trade or fund test accounts. Endpoint: `https://agents.coinbase.com/mcp`. |
| Craft (`craft`) | DCR | `documents-files` | **Include for validation** | [Official docs/source](https://www.craft.do/imagine/guide/mcp). Vendor documents arbitrary MCP clients and space consent. Path-specific metadata advertises public DCR + S256. Validate scoped space access; no copied scripts needed. Endpoint: `https://mcp.craft.do/my/mcp`. |
| Docusign (`docusign`) | managed OAuth app required | `documents-files` | **Exclude** | [Official docs/source](https://developers.docusign.com/platform/auth/confidential-authcode-get-token/). Cursor manifest requires client ID and secret; live metadata has no registration endpoint. Vendor authentication docs require an integration key/redirect URI. MCP landing page rendered no text; this is not a completed alternative-auth audit. Endpoint: `https://mcp.docusign.com/mcp`. |
| eToro Trading (`etoro-trading`) | DCR | `finance-payments` | **Blocked** | [Official docs/source](https://api-portal.etoro.com/core/vibe-code/cursor). Official docs confirm the endpoint and public API tools. eToro issuer advertises public DCR + S256. Need verify custom-client/entitlement restrictions and availability of a free demo account; only demo/read-only tools are suitable for validation. Endpoint: `https://mcp.public-api.etoro.com`. |
| Fathom (`fathom`) | DCR | `inbox-collaboration` | **Include for validation** | [Official docs/source](https://developers.fathom.ai/mcp-docs). Vendor explicitly offers official hosted MCP for any compatible client. Public DCR + S256 advertised. Meeting data sensitive; start with user-info or empty list in a test account. Endpoint: `https://api.fathom.ai/mcp`. |
| Finance (`finance`) | Cursor proxy | `finance-payments` | **Exclude** | [Official docs/source](https://grok.com/connectors). Endpoint is connectors-gateway.grok.com, another AI product gateway. Bucket uses the requested Cursor-proxy label but this is specifically Grok; not an official integrated-data-provider endpoint. Endpoint: `https://connectors-gateway.grok.com/gateway/v1/finance/mcp`. |
| Gamma (`gamma`) | provider approval/allowlisting | `documents-files` | **Exclude** | [Official docs/source](https://developers.gamma.app/mcp/gamma-mcp-server.md). Vendor supports DCR but requires a custom-access request with approved redirect URIs. HTTPS public hostnames only; localhost and loopback rejected. Public DCR advertisement alone is insufficient. Endpoint: `https://mcp.gamma.app/mcp`. |
| Gmail (`gmail`) | unknown | `inbox-collaboration` | **Blocked** | [Official docs/source](https://github.com/cursor/plugins/tree/main/third_party/gmail). Pinned wrapper points to gmailmcp.googleapis.com, not Cursor proxy. No company-authored plugin/source or usable auth metadata established here. Google domain alone does not prove arbitrary OpenClaw clients can connect. Existing community Gmail/GWS packages need capability comparison. Endpoint: `https://gmailmcp.googleapis.com/mcp/v1`. |
| Gong (`gong`) | provider approval/allowlisting | `sales-marketing` | **Exclude** | [Official docs/source](https://help.gong.io/docs/about-gong-mcp-server). Vendor says automatic clients must use an approved redirect URI; private manual mode uses assigned client ID/secret. Metadata advertises DCR but only confidential client auth. Read-only service, but admission rule fails. Endpoint: `https://mcp.gong.io/mcp`. |
| Google Calendar (`google-calendar`) | unknown | `scheduling` | **Blocked** | [Official docs/source](https://github.com/cursor/plugins/tree/main/third_party/google-calendar). Pinned wrapper points to calendarmcp.googleapis.com. No official arbitrary-client auth path or company plugin source established; do not assume DCR. Existing Google Meet functionality is a different surface. Endpoint: `https://calendarmcp.googleapis.com/mcp/v1`. |
| Google Cloud BigQuery (`google-cloud-bigquery`) | user key/token | `data-analytics` | **Blocked** | [Official docs/source](https://docs.cloud.google.com/bigquery/docs/use-bigquery-mcp). Official Google docs support Google Cloud identities/IAM and user credentials, including service-account/ADC access tokens; OAuth app is one route, not universally required. Need a free test project, IAM, token-refresh integration and billing/no-cost check. tools/list alone is unauthenticated discovery, not query proof. Endpoint: `https://bigquery.googleapis.com/mcp`. |
| Google Docs (`google-docs`) | Cursor proxy | `documents-files` | **Exclude** | [Official docs/source](https://github.com/cursor/plugins/tree/main/third_party/google-docs). api.cursor.com/rest-mcp endpoint; fails direct-provider rule. Endpoint: `https://api.cursor.com/rest-mcp/google-docs/mcp`. |
| Google Drive (`google-drive`) | unknown | `documents-files` | **Blocked** | [Official docs/source](https://github.com/cursor/plugins/tree/main/third_party/google-drive). Pinned wrapper points to drivemcp.googleapis.com. Official source/client auth and access requirements not established. Do not substitute unrelated community Drive server. Endpoint: `https://drivemcp.googleapis.com/mcp/v1`. |
| Google Sheets (`google-sheets`) | Cursor proxy | `documents-files` | **Exclude** | [Official docs/source](https://github.com/cursor/plugins/tree/main/third_party/google-sheets). api.cursor.com/rest-mcp endpoint; fails direct-provider rule. Endpoint: `https://api.cursor.com/rest-mcp/google-sheets/mcp`. |
| Google Slides (`google-slides`) | Cursor proxy | `documents-files` | **Exclude** | [Official docs/source](https://github.com/cursor/plugins/tree/main/third_party/google-slides). api.cursor.com/rest-mcp endpoint; fails direct-provider rule. Endpoint: `https://api.cursor.com/rest-mcp/google-slides/mcp`. |
| HubSpot (`hubspot`) | managed OAuth app required | `sales-marketing` | **Exclude** | [Official docs/source](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/integrate-with-the-remote-hubspot-mcp-server). Vendor requires creating an MCP connector, receiving client ID/secret, and registering callback. Metadata supports client_secret_post only and has no DCR registration endpoint. Endpoint: `https://mcp.hubspot.com`. |
| Interactive Brokers (`interactive-brokers`) | DCR | `finance-payments` | **Blocked** | [Official docs/source](https://www.interactivebrokers.com/en/trading/ai-integrations.php). Public metadata advertises DCR + none + S256. Vendor landing page timed out; custom-client approval, brokerage entitlement and demo availability remain unverified. No account or trades attempted. Endpoint: `https://api.ibkr.com/v1/api/mcp-public`. |
| Jotform (`jotform`) | DCR | `productivity` | **Include for validation** | [Official docs/source](https://www.jotform.com/mcp/). Official Jotform-hosted MCP; public-client registration + S256 advertised, scopes readOnly/full. Prefer readOnly; verify DCR callback and read-only tools with free account. Endpoint: `https://mcp.jotform.com`. |
| MailerLite (`mailerlite`) | DCR | `sales-marketing` | **Include for validation** | [Official docs/source](https://developers.mailerlite.com/mcp). Official vendor docs support arbitrary streamable-HTTP clients. Public DCR + S256 advertised. Tools include sends/deletes/automations; validation must stick to account status/list reads. Endpoint: `https://mcp.mailerlite.com/mcp`. |
| Mem (`mem`) | DCR | `documents-files` | **Include for validation** | [Official docs/source](https://docs.mem.ai/mcp/overview). Official Mem notes MCP; public DCR + S256 advertised with content.read/content.write scopes. Scope to reads. Mem is not Mem0; the existing official @mem0/openclaw-mem0 is a different product. Endpoint: `https://mcp.mem.ai/mcp`. |
| Navan (`navan`) | DCR | `productivity` | **Blocked** | [Official docs/source](https://developer.navan.com/mcp/). Public protected-resource discovery points to login.navan.com with DCR + none + S256. Vendor docs failed to render; custom-client access, account entitlement and any booking/payment restrictions remain unverified. Endpoint: `https://mcp.navan.com/mcp`. |
| OneDrive (`onedrive`) | Cursor proxy | `documents-files` | **Exclude** | [Official docs/source](https://github.com/cursor/plugins/tree/main/third_party/onedrive). api.cursor.com/rest-mcp endpoint; fails direct-provider rule. Endpoint: `https://api.cursor.com/rest-mcp/onedrive/mcp`. |
| Otter.ai (`otter`) | DCR | `inbox-collaboration` | **Include for validation** | [Official docs/source](https://help.otter.ai/hc/en-us/articles/35287607569687-Otter-MCP-Server). Vendor documents arbitrary MCP-compatible clients. Issuer metadata advertises public DCR + S256. Read-only meeting/user-info tools; validate fresh test account. Endpoint: `https://mcp.otter.ai/mcp`. |
| Outlook Calendar (`outlook-calendar`) | Cursor proxy | `scheduling` | **Exclude** | [Official docs/source](https://github.com/cursor/plugins/tree/main/third_party/outlook-calendar). api.cursor.com/rest-mcp endpoint; fails direct-provider rule. Endpoint: `https://api.cursor.com/rest-mcp/outlook-calendar/mcp`. |
| Outlook (`outlook`) | Cursor proxy | `inbox-collaboration` | **Exclude** | [Official docs/source](https://github.com/cursor/plugins/tree/main/third_party/outlook). api.cursor.com/rest-mcp endpoint; fails direct-provider rule. Endpoint: `https://api.cursor.com/rest-mcp/outlook/mcp`. |
| Plaud (`plaud`) | DCR | `inbox-collaboration` | **Blocked** | [Official docs/source](https://docs.plaud.ai/plaud-mcp-cli/mcp). Provider supports official MCP; public DCR + S256 advertised on hosted endpoint. Vendor public docs prefer local package for arbitrary clients and hosted marketplace connections; validate hosted arbitrary-client permission and test-account recording entitlement. No device purchase authorized. Endpoint: `https://mcp.plaud.ai/mcp`. |
| Readwise (`readwise`) | DCR | `documents-files` | **Include for validation** | [Official docs/source](https://docs.readwise.io/tools/mcp). Official MCP docs support arbitrary clients; public DCR + S256 advertised. Vendor recommends its own CLI for OpenClaw, so compare that equivalent before publishing an MCP wrapper. Endpoint: `https://mcp2.readwise.io/mcp`. |
| Robinhood (`robinhood`) | DCR | `finance-payments` | **Blocked** | [Official docs/source](https://robinhood.com/us/en/support/articles/agentic-trading-overview/). Provider docs permit manual custom-connector URL; public DCR + none + S256 advertised. Requires brokerage/Agentic account and identity verification; validate no real trades or deposits. Free test entitlement unverified. Endpoint: `https://agent.robinhood.com/mcp/trading`. |
| Salesforce (`salesforce`) | managed OAuth app required | `sales-marketing` | **Exclude** | [Official docs/source](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/cursor.html). Official setup requires external client app plus callback and consumer key; wrapper requires tenant-specific MCP URL/client ID. Do not reuse Cursor app credentials. Old crawler also had license block; no artifacts copied. Endpoint: `${SALESFORCE_MCP_URL}`. |
| SharePoint (`sharepoint`) | Cursor proxy | `documents-files` | **Exclude** | [Official docs/source](https://github.com/cursor/plugins/tree/main/third_party/sharepoint). api.cursor.com/rest-mcp endpoint; fails direct-provider rule. Endpoint: `https://api.cursor.com/rest-mcp/sharepoint/mcp`. |
| Shopify (`shopify-store`) | unknown | `sales-marketing` | **Blocked** | [Official docs/source](https://grok.com/connectors). Endpoint setup.shopify.com is provider-owned but wrapper homepage points to Grok connectors. Protected-resource metadata exists; discovery at advertised authorization base did not resolve. Need public custom-client official offering evidence. Existing official @shopify/ai-toolkit is developer tooling, not automatically a store-management equivalent. Endpoint: `https://setup.shopify.com/mcp`. |
| S&P Global (`sp-global`) | provider approval/allowlisting | `finance-payments` | **Exclude** | [Official docs/source](https://docs.kensho.com/llmreadyapi/overview). Kensho/S&P docs require requesting access via marketplace/sales. Metadata advertises DCR but confidential methods only. Paid dataset entitlement/access approval blocks free validation. Endpoint: `https://kfinance.kensho.com/integrations/mcp`. |
| Teams (`teams`) | Cursor proxy | `inbox-collaboration` | **Exclude** | [Official docs/source](https://github.com/cursor/plugins/tree/main/third_party/teams). api.cursor.com/rest-mcp endpoint. Existing official msteams and teams-meetings overlap but proxy exclusion already decides this candidate. Endpoint: `https://api.cursor.com/rest-mcp/teams/mcp`. |
| TinyFish (`tinyfish`) | user key/token | `web` | **Include for validation** | [Official docs/source](https://docs.tinyfish.ai/mcp-integration). Official docs explicitly support Authorization: Bearer user API key at hosted endpoint. Prefer this route over unverified OAuth. Existing community TinyFish search overlaps search only; browser automation is broader. No paid credits purchased. Endpoint: `https://agent.tinyfish.ai/mcp`. |
| Todoist (`todoist`) | DCR | `productivity` | **Include for validation** | [Official docs/source](https://github.com/Doist/todoist-mcp). Doist-owned MIT-licensed official MCP repo documents hosted endpoint and arbitrary clients. Issuer advertises public DCR + S256. Existing community @alejdg/todoist-ai-tools is related, not an official-provider duplicate. Endpoint: `https://ai.todoist.net/mcp`. |
| Trello (`trello`) | unknown | `productivity` | **Blocked** | [Official docs/source](https://github.com/atlassian/trello-mcp-server). Atlassian-owned Apache-2.0 repo documents hosted OAuth for any MCP app and any Trello plan, but this audit could not resolve usable auth-server metadata (503 at path attempt). Do not mislabel as managed OAuth. Existing community openclaw-trello requires capability comparison. Endpoint: `https://mcp.trello.com/v1`. |
| Typeform (`typeform`) | DCR | `productivity` | **Include for validation** | [Official docs/source](https://developers.typeform.com/developers/get-started/mcp/). Official endpoint metadata advertises public DCR + S256; initial docs URL failed rendering. Validate company source and callback before selecting; tools include form/respondent writes, so request read scopes. Endpoint: `https://api.typeform.com/mcp`. |
| Webull (`webull`) | DCR | `finance-payments` | **Blocked** | [Official docs/source](https://developer.webull.com/apis/docs/AI-friendly-Resources/mcp/). Vendor documents OAuth remote endpoint and arbitrary code clients; public DCR + none + S256 advertised. Brokerage account/trading-password entitlement required; no account/identity/trade proof yet. Endpoint: `https://api.webull.com/mcp`. |
| Workable (`workable`) | DCR | `productivity` | **Include for validation** | [Official docs/source](https://workable.readme.io/reference/workable-mcp-server). Vendor explicitly documents RFC7591 DCR without manual credentials. Registration endpoint and S256 advertised; token auth methods omitted, so actual registration must validate OpenClaw compatibility. Start get_accounts before account-scoped HR data. Endpoint: `https://mcp.workable.com/mcp`. |
| X Ads (`x-ads`) | managed OAuth app required | `sales-marketing` | **Exclude** | [Official docs/source](https://docs.x.com/x-ads-api/introduction). Pinned wrapper uses a preconfigured Cursor client ID; metadata has no DCR. Requires separate own app/ads entitlement or confirmation of acceptable user-token route. Cannot ship Cursor credential. Endpoint: `https://ads-api.x.com/mcp`. |
| X Money (`x-money`) | unknown | `finance-payments` | **Blocked** | [Official docs/source](https://x.com/i/money). Live issuer advertises private_key_jwt only, no DCR. No public arbitrary-client onboarding found; product page failed fetch. Cursor manifest restricts Cursor to never, Grok/Sand only. Not a launch candidate. Endpoint: `https://mcp.money.x.com/mcp`. |
| X (`x`) | managed OAuth app required | `inbox-collaboration` | **Exclude** | [Official docs/source](https://docs.x.com/tools/mcp). Vendor MCP docs offer app-only bearer tokens but those originate from a developer app; user-context bridge requires own app/client credentials. No public DCR advertised. Do not reuse the baked-in Cursor client ID; do not call this a standalone personal API-key path. Endpoint: `https://api.x.com/mcp`. |
| Xero (`xero`) | managed OAuth app required | `finance-payments` | **Exclude** | [Official docs/source](https://github.com/XeroAPI/xero-mcp-server). XeroAPI-owned MIT repo requires own developer credentials/custom connection client ID+secret. Existing community Xero package does not change auth exclusion. Endpoint: `npx`. |
| Zoom (`zoom`) | managed OAuth app required | `inbox-collaboration` | **Exclude** | [Official docs/source](https://developers.zoom.us/docs/mcp/servers/connect-to-zoom-mcp-servers/). Zoom official docs explicitly say manual registration only, no DCR/CIMD, own General app and secret. Existing @openclaw/zoom-meetings covers meeting calls; MCP docs/transcripts are not identical, but auth rule excludes it. Endpoint: `https://mcp.zoom.us/mcp/zoom/streamable`. |

## Public DCR discovery observations

Read-only HTTPS GETs on 2026-09-27. All listed rows advertised S256. Public-client `none` was advertised unless explicitly marked otherwise. These are **not successful registration/authentication results**.

| Candidate | Discovery document | Advertised registration endpoint | Caveat |
|---|---|---|---|
| Amplemarket | [metadata](https://app.amplemarket.com/.well-known/oauth-authorization-server) | `https://app.amplemarket.com/oauth/register` | Registration + callback + OAuth + tools still untested |
| Attio | [metadata](https://mcp.attio.com/.well-known/oauth-authorization-server) | `https://app.attio.com/oauth/register` | Registration + callback + OAuth + tools still untested |
| beehiiv | [metadata](https://mcp.beehiiv.com/.well-known/oauth-authorization-server) | `https://mcp.beehiiv.com/register` | Registration + callback + OAuth + tools still untested |
| Coinbase | [metadata](https://login.coinbase.com/.well-known/oauth-authorization-server) | `https://login.coinbase.com/oauth2/register` | Vendor approval required despite DCR |
| Craft | [metadata](https://mcp.craft.do/my/.well-known/oauth-authorization-server) | `https://mcp.craft.do/my/auth/register` | Path-specific metadata |
| eToro | [metadata](https://www.etoro.com/.well-known/oauth-authorization-server) | `https://www.etoro.com/api/sso/v1/register` | Account/approval rules unverified |
| Fathom | [metadata](https://api.fathom.ai/.well-known/oauth-authorization-server) | `https://api.fathom.ai/mcp/oauth/register` | Registration + callback + OAuth + tools still untested |
| Gamma | [metadata](https://auth.gamma.app/.well-known/oauth-authorization-server) | `https://auth.gamma.app/oauth/register` | Approved public HTTPS callback required |
| Gong | [metadata](https://mcp.gong.io/.well-known/oauth-authorization-server) | `https://app.gong.io/oauth2/register` | No none method; approved redirect or manual credentials |
| Interactive Brokers | [metadata](https://api.ibkr.com/.well-known/oauth-authorization-server) | `https://api.ibkr.com/oauth2/register` | Entitlement/allowlisting unverified |
| Jotform | [metadata](https://mcp.jotform.com/.well-known/oauth-authorization-server) | `https://oauth2.jotform.com/register-public-client` | Prefer readOnly scope |
| MailerLite | [metadata](https://mcp.mailerlite.com/.well-known/oauth-authorization-server) | `https://mcp.mailerlite.com/register` | Registration + callback + OAuth + tools still untested |
| Mem | [metadata](https://mcp.mem.ai/.well-known/oauth-authorization-server) | `https://api.mem.ai/oauth2/register` | Prefer content.read |
| Navan | [metadata](https://login.navan.com/.well-known/oauth-authorization-server) | `https://login.navan.com/oidc/register` | Entitlement unverified |
| Otter | [metadata](https://otter.ai/.well-known/oauth-authorization-server) | `https://otter.ai/oauth/register` | Registration + callback + OAuth + tools still untested |
| Plaud | [metadata](https://mcp.plaud.ai/.well-known/oauth-authorization-server) | `https://mcp.plaud.ai/register` | Hosted arbitrary-client permission unverified |
| Readwise | [metadata](https://mcp2.readwise.io/.well-known/oauth-authorization-server) | `https://readwise.io/o/register/` | Registration + callback + OAuth + tools still untested |
| Robinhood | [metadata](https://agent.robinhood.com/.well-known/oauth-authorization-server) | `https://agent.robinhood.com/oauth/trading/register` | Brokerage/Agentic account required |
| S&P/Kensho | [metadata](https://kfinance.kensho.com/.well-known/oauth-authorization-server) | `https://kfinance.kensho.com/integrations/register` | No none method; dataset access approval |
| Todoist | [metadata](https://todoist.com/.well-known/oauth-authorization-server) | `https://todoist.com/oauth/register` | Registration + callback + OAuth + tools still untested |
| Typeform | [metadata](https://api.typeform.com/.well-known/oauth-authorization-server) | `https://api.typeform.com/oauth/register` | Registration + callback + OAuth + tools still untested |
| Webull | [metadata](https://api.webull.com/.well-known/oauth-authorization-server) | `https://u1suserauth.webullfintech.com/api/userauth/oauth/client/register` | Brokerage entitlement required |
| Workable | [metadata](https://mcp.workable.com/.well-known/oauth-authorization-server) | `https://mcp.workable.com/oauth/register` | token_endpoint_auth_methods_supported omitted |

HubSpot metadata returned only `client_secret_post` and no registration endpoint. Zoom returned `client_secret_basic` and no registration endpoint. Docusign returned no registration endpoint. X/X Ads returned no registration endpoint. X Money returned only `private_key_jwt` and no registration endpoint. A missing discovery field by itself is not a universal negative proof; exclusions above also cite vendor setup requirements where available.

## License and duplication details

- [Doist/todoist-mcp](https://github.com/Doist/todoist-mcp) is company-owned and MIT licensed. It documents the hosted official server and arbitrary-client OAuth. No code copied.
- [Atlassian/trello-mcp-server](https://github.com/atlassian/trello-mcp-server) is company-owned and Apache-2.0 licensed. It documents OAuth for any MCP client and any Trello plan; API tokens are explicitly unsupported for Trello MCP. No code copied.
- [XeroAPI/xero-mcp-server](https://github.com/XeroAPI/xero-mcp-server) is company-owned and MIT licensed, but requires developer app credentials. License acceptance does not override the authentication exclusion.
- [Zoom's own plugin](https://github.com/zoom/zoom-plugin/blob/main/skills/zoom-mcp/concepts/oauth-setup.md) independently confirms the OAuth app path. No code/skills copied or licensed for redistribution in this audit.
- Remaining URL-only service candidates have provider-owned docs/endpoints; company repository ownership and redistributable plugin/skill license have **not** been established merely by finding a Cursor-authored wrapper. Do not mark these as company-authored packages.

Deduplication inspection used the preserved 2,194-package production metadata snapshot (`clawhub-claw-723-priority/.artifacts/local-crawl/production-catalog.json`) and current local OpenClaw extension manifest filenames. This is a preliminary capability screen, not a fresh production catalog verification. Relevant overlaps: community Attio, Gmail/GWS, HubSpot, Salesforce, Todoist, Trello, TinyFish-search and Xero; official Shopify AI Toolkit (developer tooling), Microsoft Teams / Teams Meetings, and Zoom Meetings. No same-name equivalence is assumed. Mem0 is not Mem. Before publishing, compare provider endpoint + tool purpose + package identity against the fresh catalog and re-use an equivalent canonical listing where appropriate.

## Current Marketplace items outside the available 79-wrapper snapshot

The current [Cursor Marketplace](https://cursor.com/marketplace) visibly lists many company-owned offerings outside `cursor/plugins/third_party`. They are separate discovery candidates, **not additions to the implementation list and not claimed to be absent from the missing 59-package baseline**.

| Listing | Evidence | Classification |
|---|---|---|
| [Turso](https://cursor.com/marketplace/turso) | Listing names Turso and links [tursodatabase/turso-mcp](https://github.com/tursodatabase/turso-mcp); MIT repository documents direct `https://mcp.turso.ai/mcp`, OAuth 2.1 + PKCE and arbitrary MCP clients. | Outside available 79 snapshot; no registration/auth/tool proof. Infrastructure. SQL writes require explicit test fixtures. |
| [Coralogix](https://cursor.com/marketplace/coralogix-ltd) | Current Marketplace listing describes official observability server. Listing-detail fetch timed out on retry; ownership/license/auth not fully audited. | Separate candidate, blocked pending complete official source/auth review. |
| [Linear](https://cursor.com/marketplace/linear) | Current Marketplace lists Linear workspace MCP integration. Detail fetch timed out on retry. | Separate candidate; ownership/license/auth and existing OpenClaw project integration duplication not completed. |
| [Sentry](https://cursor.com/marketplace/sentry) | Current Marketplace lists Sentry MCP+skills. Detail fetch timed out on retry. | Separate candidate; no automatic implementation expansion. |

These examples are not an exhaustive Marketplace inventory. Building a replacement scraper to enumerate them is outside the new scope.

## Main-agent next checks

1. Obtain the original 59 names/snapshot before claiming the requested 27 are all audited.
2. Validate DCR with OpenClaw's actual callback. Do not treat the metadata observations as successful registration.
3. Account testing and all credential handling stay with the main agent; test reads first, never real finance trades or production workspace writes.
4. Resolve the distinction between company-maintained hosted offering and company-authored plugin repository explicitly in final selection/provenance. A new OpenClaw-authored minimal configuration must not be labeled vendor-authored.
5. Preserve license/provenance, scan, catalog, download, and installation gates for each package ultimately selected. This report performs none of those runtime gates.
