# Computer use category regression proof

- Baseline: b0e34a98cd. Candidate: 7d58c9c54b91f8f115afc43063371818cbda23bc.
- URL: http://127.0.0.1:3049/plugins?featured=true&category=computer-use
- Real ClawHub frontend and isolated local Convex, using the same 12 Computer use package fixtures on both revisions. Public names/descriptions, synthetic category-proof owner and deterministic local statistics. No production writes.
- Desktop 1440×1000 and mobile 390×844: baseline renders No plugins found; candidate redirects away from Featured and renders all 12 plugins with All selected.
- Verified category selection from global Featured through the desktop sidebar and mobile dropdown, true empty topic results, and no horizontal overflow.
- All four screenshots inspected. Loading/error/pagination-specific screenshots omitted because this change does not alter loading/error presentation or pagination controls; stale cursor clearing is covered by the route regression test. Twelve entries also cover a populated content-heavy list.
- Browser harness: node .artifacts/plugin-category-filter/capture.mjs (baseline source and candidate source exchanged in the local dev server, restored in finally; no response mocking).
- Gates: 83 route tests; 7,262 full-suite tests; ci:static; ci:types-build; clean autoreview.
