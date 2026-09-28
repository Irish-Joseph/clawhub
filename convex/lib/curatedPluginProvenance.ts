import { ConvexError, v } from "convex/values";
import type { Doc } from "../_generated/dataModel";

export const curatedPluginProvenanceValidator = v.object({
  supersedes: v.optional(v.array(v.string())),
  integration: v.string(),
  job: v.string(),
  authorship: v.union(v.literal("company"), v.literal("registry")),
  repositoryId: v.number(),
  ownerId: v.number(),
  sourceContentHash: v.string(),
  author: v.optional(v.string()),
  omittedCapabilities: v.array(v.string()),
  format: v.string(),
  syncedAt: v.number(),
});
export type CuratedPluginMetadata = {
  supersedes?: string[];
  integration: string;
  job: string;
  authorship: "company" | "registry";
  repositoryId: number;
  ownerId: number;
  sourceContentHash: string;
  author?: string;
  omittedCapabilities: string[];
  format: string;
};

export function validateCuratedPluginPublisher(input: {
  actor: Pick<Doc<"users">, "role">;
  publisher: Pick<Doc<"publishers">, "kind" | "handle" | "staffCustody"> | null;
  sourceRepo: string | undefined;
  sourcePath?: string;
  curation: CuratedPluginMetadata;
}) {
  const { actor, publisher, sourceRepo, curation } = input;
  if (actor.role !== "admin")
    throw new ConvexError("Only staff may publish curated source provenance");
  if (!publisher || publisher.kind !== "org")
    throw new ConvexError("Curated plugins require an organization publisher");
  if (!sourceRepo || !/^[-\w.]+\/[-\w.]+$/.test(sourceRepo))
    throw new ConvexError("Curated plugins require a GitHub source");
  if (
    !/^[a-f0-9]{64}$/.test(curation.sourceContentHash) ||
    ![curation.repositoryId, curation.ownerId].every((n) => Number.isSafeInteger(n) && n > 0)
  )
    throw new ConvexError("Invalid curated source identity or content hash");
  if (
    ![curation.integration, curation.job].every((s) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s)) ||
    (curation.author && curation.author.length > 2000) ||
    curation.omittedCapabilities.length > 20
  )
    throw new ConvexError("Invalid curated plugin metadata");
  // Stored historical provenance remains readable; new curated publications are Cursor-only.
  if (
    curation.authorship !== "registry" ||
    curation.format !== "cursor" ||
    publisher.handle !== "cursor" ||
    sourceRepo.toLowerCase() !== "cursor/plugins" ||
    !/^third_party\/[^/]+(?:\/.*)?$/.test(input.sourcePath ?? "") ||
    input.sourcePath?.split("/").some((part) => !part || part === "." || part === "..") ||
    /[\\\0]/.test(input.sourcePath ?? "") ||
    curation.supersedes?.length
  )
    throw new ConvexError("Curated imports are limited to Cursor third_party integrations");
}
