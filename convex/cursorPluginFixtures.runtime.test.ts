/// <reference types="vite/client" />
/* @vitest-environment edge-runtime */
import { convexTest } from "convex-test";
import { makeFunctionReference } from "convex/server";
import { afterEach, expect, it, vi } from "vitest";
import { validateCuratedPluginPublisher } from "./lib/curatedPluginProvenance";
import schema from "./schema";
const modules = import.meta.glob("./**/*.ts");
const cleanup = makeFunctionReference<"mutation">(
  "devSeed:removeRetiredCompanyPluginCrawlFixtures",
);
afterEach(() => vi.unstubAllEnvs());
const enableLocal = () => {
  vi.stubEnv("DEV_AUTH_ENABLED", "1");
  vi.stubEnv("CONVEX_DEPLOYMENT", "anonymous:cursor-proof");
  vi.stubEnv("CONVEX_SITE_URL", "http://127.0.0.1:3211");
};
it("refuses fixture cleanup outside local dev auth", async () => {
  vi.stubEnv("DEV_AUTH_ENABLED", "0");
  await expect(convexTest(schema, modules).mutation(cleanup, {})).rejects.toThrow("local dev auth");
});
it("removes only verified retired crawl fixtures, preserving production catalog metadata and history", async () => {
  enableLocal();
  const t = convexTest(schema, modules);
  const ids = await t.run(async (ctx) => {
    const owner = await ctx.db.insert("users", { handle: "cli-admin", role: "admin" });
    const fields = {
      displayName: "Expo",
      ownerUserId: owner,
      family: "bundle-plugin" as const,
      channel: "community" as const,
      isOfficial: false,
      tags: {},
      scanStatus: "clean" as const,
      stats: { downloads: 0, installs: 0, stars: 0, versions: 1 },
      createdAt: 1,
      updatedAt: 1,
    };
    const pkg = await ctx.db.insert("packages", {
      ...fields,
      name: "@openai/expo-service-integration",
      normalizedName: "@openai/expo-service-integration",
    });
    const snapshot = await ctx.db.insert("packages", {
      ...fields,
      name: "@openai/production-context",
      normalizedName: "@openai/production-context",
    });
    const storageId = await ctx.storage.store(new Blob(["Immutable source"]));
    const release = await ctx.db.insert("packageReleases", {
      packageId: pkg,
      version: "1.0.0",
      distTags: ["latest"],
      integritySha256: "a".repeat(64),
      changelog: "Local crawl",
      files: [{ path: "CLAWHUB_SOURCE.json", size: 16, sha256: "a".repeat(64), storageId }],
      createdBy: owner,
      createdAt: 1,
      source: { repo: "openai/plugins", path: "plugins/expo", commit: "a".repeat(40) },
      curation: {
        integration: "expo",
        job: "service-integration",
        authorship: "registry",
        repositoryId: 1,
        ownerId: 2,
        sourceContentHash: "a".repeat(64),
        omittedCapabilities: [],
        format: "codex",
        syncedAt: 1,
      },
    });
    await ctx.db.patch(pkg, { latestReleaseId: release });
    return { pkg, snapshot, release, storageId };
  });
  const before = await t.run((ctx) => ctx.db.get(ids.snapshot));
  await t.run((ctx) =>
    ctx.db.patch(ids.release, {
      source: {
        repo: "openai/plugins",
        path: "plugins/some-other-integration",
        commit: "a".repeat(40),
      },
    }),
  );
  await expect(t.mutation(cleanup, {})).rejects.toThrow("non-crawl package");
  expect((await t.run((ctx) => ctx.db.get(ids.pkg)))?.softDeletedAt).toBeUndefined();
  await t.run((ctx) =>
    ctx.db.patch(ids.release, {
      source: { repo: "openai/plugins", path: "plugins/expo", commit: "a".repeat(40) },
    }),
  );
  expect((await t.mutation(cleanup, {})).removed).toEqual(["@openai/expo-service-integration"]);
  expect((await t.mutation(cleanup, {})).removed).toEqual([]);
  expect(await t.run((ctx) => ctx.db.get(ids.snapshot))).toEqual(before);
  expect((await t.run((ctx) => ctx.db.get(ids.pkg)))?.softDeletedAt).toBeTypeOf("number");
  expect((await t.run((ctx) => ctx.db.get(ids.release)))?.softDeletedAt).toBeTypeOf("number");
  expect(await t.run(async (ctx) => (await ctx.storage.get(ids.storageId))?.text())).toBe(
    "Immutable source",
  );
});
it("refuses an exact-name production snapshot without crawl evidence", async () => {
  enableLocal();
  const t = convexTest(schema, modules);
  await t.run(async (ctx) => {
    const owner = await ctx.db.insert("users", { handle: "cli-admin", role: "admin" });
    await ctx.db.insert("packages", {
      name: "@openai/expo-service-integration",
      normalizedName: "@openai/expo-service-integration",
      displayName: "Expo",
      ownerUserId: owner,
      family: "bundle-plugin",
      channel: "community",
      isOfficial: false,
      tags: {},
      scanStatus: "clean",
      stats: { downloads: 0, installs: 0, stars: 0, versions: 1 },
      createdAt: 1,
      updatedAt: 1,
    });
  });
  await expect(t.mutation(cleanup, {})).rejects.toThrow("non-crawl package");
});
it.each([
  {
    publisher: "openai",
    repo: "openai/plugins",
    path: "plugins/notes",
    authorship: "registry" as const,
  },
  {
    publisher: "anthropic",
    repo: "anthropics/claude-plugins-official",
    path: "external_plugins/notes",
    authorship: "registry" as const,
  },
  { publisher: "company", repo: "company/plugins", path: "notes", authorship: "company" as const },
  {
    publisher: "cursor",
    repo: "cursor/plugins",
    path: "plugins/internal",
    authorship: "registry" as const,
  },
  {
    publisher: "cursor",
    repo: "cursor/plugins",
    path: "third_party/../internal",
    authorship: "registry" as const,
  },
])("rejects out-of-scope curated publishing at the backend boundary: %j", (row) => {
  expect(() =>
    validateCuratedPluginPublisher({
      actor: { role: "admin" },
      publisher: { kind: "org", handle: row.publisher },
      sourceRepo: row.repo,
      sourcePath: row.path,
      curation: {
        integration: "notes",
        job: "reading",
        authorship: row.authorship,
        format: "cursor",
        repositoryId: 1,
        ownerId: 2,
        sourceContentHash: "a".repeat(64),
        omittedCapabilities: [],
      },
    }),
  ).toThrow("limited to Cursor");
});
