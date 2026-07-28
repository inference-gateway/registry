#!/usr/bin/env bun
// Regenerates docs/.vitepress/types/adl.ts from the upstream ADL JSON Schema.
// Run with `npm run codegen` whenever ADL changes.
// CI verifies the committed output is fresh:
//   npm run codegen && git diff --exit-code docs/.vitepress/types/adl.ts
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { compile } from "json-schema-to-typescript";

const SCHEMA_URL =
  process.env.ADL_SCHEMA_URL ??
  "https://cdn.jsdelivr.net/gh/inference-gateway/adl@main/schema/v1/schema.json";

const OUTPUT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  ".vitepress",
  "types",
  "adl.ts",
);

const res = await fetch(SCHEMA_URL, {
  headers: { accept: "application/json" },
});
if (!res.ok) {
  throw new Error(
    `ADL schema fetch failed (${res.status} ${res.statusText}) from ${SCHEMA_URL}`,
  );
}
const schema = await res.json();

// json-schema-to-typescript prefers the schema's `title` (or `$id`) for the root interface
// name. Strip both so the explicit `ADLAgent` name passed to compile() is used instead.
delete schema.title;
delete schema.$id;

const compiled = await compile(schema, "ADLAgent", {
  bannerComment: "",
  additionalProperties: false,
  style: { singleQuote: true, semi: true, printWidth: 100 },
});

const banner = `// AUTO-GENERATED - DO NOT EDIT.
// Regenerate with: npm run codegen
// Source: ${SCHEMA_URL}

`;

// Catalog envelope and provenance - not part of ADL itself; defined by the registry+aggregator.
const envelope = `
/** Provenance for a catalog entry; injected by the aggregator (inference-gateway/agents). */
export interface AgentSource {
  url: string;
  ref: string;
  fetchedAt: string;
}

/** An ADL agent as it appears in catalog.json, with aggregator-injected provenance. */
export type CatalogAgent = ADLAgent & {
  _source?: AgentSource;
};

export interface Catalog {
  version: number;
  release?: string;
  updated: string;
  agents: CatalogAgent[];
}
`;

await writeFile(OUTPUT, banner + compiled + envelope);
console.log(`wrote ${OUTPUT}`);
