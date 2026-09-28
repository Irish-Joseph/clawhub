// @vitest-environment node
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { inventoryPlugins, type InventoryInput } from "./inventory";

const mit = readFileSync(new URL("../../LICENSE", import.meta.url), "utf8");
const commit = "a".repeat(40);
const prefix = "third_party/notes/";
const marker = `${prefix}.cursor-plugin/plugin.json`;
const mcp = '{"mcpServers":{"notes":{"type":"http","url":"https://example.com/mcp"}}}';
function input(): InventoryInput {
  return {
    snapshots: [
      {
        repo: "cursor/plugins",
        repositoryId: 22,
        ownerId: 20,
        commit,
        updatedAt: "2026-09-01T00:00:00Z",
        files: {
          ".cursor-plugin/marketplace.json": JSON.stringify({
            plugins: [{ name: "notes", source: "./third_party/notes" }],
          }),
          [prefix + "LICENSE"]: mit,
          [marker]: JSON.stringify({
            name: "notes",
            author: { name: "Cursor" },
            mcpServers: "./.mcp.json",
            category: "productivity",
          }),
          [prefix + ".mcp.json"]: mcp,
        },
      },
    ],
    manifest: {
      version: 1,
      registries: [{ registry: "cursor", repo: "cursor/plugins", ref: "main" }],
      sources: [
        {
          integration: "example",
          job: "notes",
          repo: "cursor/plugins",
          path: "third_party/notes",
          ref: "main",
          publisher: "cursor",
          authorship: "registry",
          format: "cursor",
          registry: "cursor",
          repositoryId: 22,
          ownerId: 20,
          ownershipEvidence: "https://github.com/cursor/plugins",
          categories: ["productivity"],
        },
      ],
      openclaw: [],
    },
    catalog: [],
  };
}
const candidate = async (data: InventoryInput) =>
  (await inventoryPlugins(data)).candidates.find((c) => c.path === "third_party/notes")!;
function addEquivalent(data: InventoryInput) {
  data.manifest.sources.push({ ...data.manifest.sources[0], path: "third_party/notes-v2" });
  for (const [path, value] of Object.entries(data.snapshots[0].files))
    if (path.startsWith(prefix))
      data.snapshots[0].files[path.replace(prefix, "third_party/notes-v2/")] = value;
}
describe("Cursor company integration inventory", () => {
  it("includes Cursor-authored wrappers with accurate provenance", async () => {
    expect(await candidate(input())).toMatchObject({
      status: "selected",
      publisher: "cursor",
      authorship: "registry",
      declaredAuthor: { name: "Cursor" },
      commit,
      categories: ["productivity"],
      license: { status: "eligible" },
      capabilities: { runnable: ["mcpServers"], omitted: [] },
    });
  });
  it("ignores internal plugins and external repository pointers", async () => {
    const data = input();
    data.snapshots[0].files[".cursor-plugin/marketplace.json"] = JSON.stringify({
      plugins: [
        { name: "notes", source: "./third_party/notes" },
        { name: "internal", source: "plugins/internal" },
        { name: "external", source: { repo: "company/plugins", path: "third_party/external" } },
      ],
    });
    expect((await inventoryPlugins(data)).candidates.map((c) => c.name)).toEqual(["notes"]);
  });
  it("reports unsafe third_party paths without hiding valid candidates", async () => {
    const data = input();
    data.snapshots[0].files[".cursor-plugin/marketplace.json"] = JSON.stringify({
      plugins: [
        { name: "unsafe", source: "third_party/../escape" },
        { name: "notes", source: "third_party/notes" },
      ],
    });
    const report = await inventoryPlugins(data);
    expect(report.candidates.find((c) => c.name === "unsafe")).toMatchObject({
      status: "blocked",
      reasons: ["Unsafe registry source path"],
    });
    expect(report.candidates.filter((c) => c.status === "selected")).toHaveLength(1);
  });
  it("collapses repeated marketplace entries for the same source", async () => {
    const data = input();
    const entry = { name: "notes", source: "third_party/notes" };
    data.snapshots[0].files[".cursor-plugin/marketplace.json"] = JSON.stringify({
      plugins: [entry, entry],
    });
    const report = await inventoryPlugins(data);
    expect(report.candidates.filter((c) => c.status === "selected")).toHaveLength(1);
    expect(report.candidates.find((c) => c.status === "superseded")?.reasons).toContain(
      "Exact source duplicate",
    );
  });
  it("requires one reviewed preference for same-job Cursor duplicates regardless of order", async () => {
    for (const reverse of [false, true]) {
      const data = input();
      addEquivalent(data);
      if (reverse) data.manifest.sources.reverse();
      expect(
        (await inventoryPlugins(data)).candidates.every((c) => c.status === "needs-decision"),
      ).toBe(true);
      const preferred = data.manifest.sources.find((s) => s.path === "third_party/notes-v2")!;
      preferred.preferred = true;
      preferred.decisionReason = "Reviewed successor for this job";
      expect(
        (await inventoryPlugins(data)).candidates
          .filter((c) => c.status === "selected")
          .map((c) => c.path),
      ).toEqual(["third_party/notes-v2"]);
    }
  });
  it("collapses exact duplicates even when distinct same-job sources need a decision", async () => {
    const data = input();
    addEquivalent(data);
    const entry = { name: "notes", source: "third_party/notes" };
    data.snapshots[0].files[".cursor-plugin/marketplace.json"] = JSON.stringify({
      plugins: [entry, entry],
    });
    const report = await inventoryPlugins(data);
    expect(report.candidates.filter((c) => c.status === "needs-decision")).toHaveLength(2);
    expect(report.candidates.filter((c) => c.status === "superseded")).toHaveLength(1);
  });
  it("reports unsafe external pointers without following them", async () => {
    const data = input();
    data.snapshots[0].files[".cursor-plugin/marketplace.json"] = JSON.stringify({
      plugins: [{ name: "unsafe", source: { repo: "company/plugins", path: "../escape" } }],
    });
    const report = await inventoryPlugins(data);
    expect(report.candidates.find((c) => c.name === "unsafe")).toMatchObject({
      status: "blocked",
      reasons: ["Unsafe registry source path"],
    });
  });
  it("keeps a distinct primary job", async () => {
    const data = input();
    addEquivalent(data);
    data.manifest.sources[1].job = "meeting-notes";
    expect(
      (await inventoryPlugins(data)).candidates.filter((c) => c.status === "selected"),
    ).toHaveLength(2);
  });
  it("suppresses an existing ClawHub equivalent but does not suppress an absent package", async () => {
    const data = input();
    data.manifest.openclaw = [
      {
        integration: "example",
        job: "notes",
        package: "@openclaw/notes",
        evidence: "https://github.com/openclaw/openclaw",
      },
    ];
    expect((await candidate(data)).status).toBe("selected");
    data.catalog = [{ name: "@openclaw/notes" }];
    expect(await candidate(data)).toMatchObject({
      status: "existing-openclaw",
      canonical: "@openclaw/notes",
    });
  });
  it("suppresses bundled equivalents and reports missing catalog parity without requesting licenses", async () => {
    const data = input();
    data.snapshots[0].files[prefix + "LICENSE"] = "All rights reserved";
    data.manifest.openclaw = [
      {
        integration: "example",
        job: "notes",
        bundledId: "notes",
        package: "@openclaw/notes",
        evidence: "https://github.com/openclaw/openclaw",
      },
    ];
    const report = await inventoryPlugins(data);
    expect(report.candidates[0]).toMatchObject({ status: "existing-openclaw", canonical: "notes" });
    expect(report.parityGaps).toHaveLength(1);
    expect(report.permissionNeeded).toHaveLength(0);
  });
  it("rejects conflicting canonical identities", async () => {
    const data = input();
    const equivalent = {
      integration: "example",
      job: "notes",
      bundledId: "notes",
      evidence: "https://github.com/openclaw/openclaw",
    };
    data.manifest.openclaw = [equivalent, { ...equivalent, bundledId: "different" }];
    await expect(inventoryPlugins(data)).rejects.toThrow("Duplicate OpenClaw identity");
  });
  it("blocks a repository transfer", async () => {
    const data = input();
    data.snapshots[0].ownerId = 999;
    expect(await candidate(data)).toMatchObject({
      status: "blocked",
      reasons: ["Verified repository/owner identity changed"],
    });
  });
  it.each([
    undefined,
    "MIT License\nCopyright 2026 Example\nPermission is hereby granted",
    mit + "\nUse is restricted to personal projects.",
  ])("withholds missing, partial or restricted license evidence", async (license) => {
    const data = input();
    delete data.snapshots[0].files[prefix + "LICENSE"];
    if (license) data.snapshots[0].files[prefix + "LICENSE"] = license;
    expect((await candidate(data)).status).toBe("blocked");
  });
  it("does not infer bundle-wide permission from an individual skill license", async () => {
    const data = input();
    delete data.snapshots[0].files[prefix + "LICENSE"];
    data.snapshots[0].files[prefix + "skills/notes/LICENSE"] = mit;
    expect((await candidate(data)).license?.status).toBe("blocked");
  });
  it("accepts a plugin-local MIT license under a differently licensed repository", async () => {
    const data = input();
    data.snapshots[0].files.LICENSE = "Apache License, Version 2.0";
    expect((await candidate(data)).license?.status).toBe("eligible");
  });
  it.each([
    "SPDX-License-Identifier: MIT\nSPDX-License-Identifier: GPL-3.0-only",
    "All rights reserved",
  ])("blocks contradictory nested licensing while retaining notices", async (license) => {
    const data = input();
    data.snapshots[0].files[prefix + "skills/private/LICENSE"] = license;
    data.snapshots[0].files.NOTICE = "Required attribution";
    const result = await candidate(data);
    expect(result.status).toBe("blocked");
    expect(result.license?.notices).toContain("NOTICE");
  });
  it("hashes inherited notices and keeps native categories authoritative", async () => {
    const data = input();
    data.snapshots[0].files.NOTICE = "First";
    data.snapshots[0].files[prefix + "openclaw.plugin.json"] = JSON.stringify({
      id: "notes",
      categories: ["memory"],
    });
    const before = await candidate(data);
    data.snapshots[0].files.NOTICE = "Second";
    expect((await candidate(data)).contentHash).not.toBe(before.contentHash);
    expect(before.categories).toEqual(["memory"]);
  });
  it("withholds plural skills.md files", async () => {
    const data = input();
    delete data.snapshots[0].files[prefix + ".mcp.json"];
    data.snapshots[0].files[marker] = JSON.stringify({ name: "notes" });
    data.snapshots[0].files[prefix + "skills/notes/skills.md"] = "# Notes";
    const result = await candidate(data);
    expect(result.status).toBe("blocked");
    expect(result.capabilities.runnable).not.toContain("skills");
  });
  it.each(["{}", "{"])("withholds malformed plugin identity %s", async (value) => {
    const data = input();
    data.snapshots[0].files[marker] = value;
    expect((await candidate(data)).status).toBe("blocked");
  });
  it.each([
    "{",
    "{}",
    '{"mcpServers":{"notes":{}}}',
    '{"mcpServers":{"notes":{"url":"https://"}}}',
  ])("withholds malformed MCP definitions %s", async (value) => {
    const data = input();
    data.snapshots[0].files[prefix + ".mcp.json"] = value;
    const result = await candidate(data);
    expect(result.status).toBe("blocked");
    expect(result.capabilities.runnable).not.toContain("mcpServers");
  });
});
