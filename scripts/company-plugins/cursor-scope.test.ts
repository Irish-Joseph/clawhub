// @vitest-environment node
import { expect, it } from "vitest";
import { curatedManifestSchema } from "./contract";
const source = {
  integration: "notes",
  job: "reading",
  repo: "cursor/plugins",
  path: "third_party/notes",
  ref: "main",
  publisher: "cursor",
  authorship: "registry",
  format: "cursor",
  registry: "cursor",
  repositoryId: 1,
  ownerId: 2,
  ownershipEvidence: "https://github.com/cursor/plugins",
  categories: ["productivity"],
};
it.each([
  { repo: "openai/plugins", registry: "openai", publisher: "openai", format: "codex" },
  {
    repo: "anthropics/claude-plugins-official",
    registry: "claude",
    publisher: "anthropic",
    format: "claude",
    path: "external_plugins/notes",
  },
  { repo: "company/plugins", authorship: "company", publisher: "company" },
  { repo: "nousresearch/hermes-agent" },
  { path: "plugins/internal" },
  { path: "third_party/../internal" },
])("rejects out-of-scope import sources: %j", (overrides) => {
  expect(
    curatedManifestSchema.safeParse({
      version: 1,
      registries: [],
      sources: [{ ...source, ...overrides }],
      openclaw: [],
    }).success,
  ).toBe(false);
});
it("accepts a Cursor-authored third-party wrapper", () => {
  expect(
    curatedManifestSchema.safeParse({
      version: 1,
      registries: [{ registry: "cursor", repo: "cursor/plugins", ref: "main" }],
      sources: [source],
      openclaw: [],
    }).success,
  ).toBe(true);
});
it.each(["claude", "openai"])("rejects obsolete %s discovery configurations", (registry) => {
  expect(
    curatedManifestSchema.safeParse({
      version: 1,
      registries: [{ registry, repo: "cursor/plugins", ref: "main" }],
      sources: [],
      openclaw: [],
    }).success,
  ).toBe(false);
});
