#!/usr/bin/env node
import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { SkillCatalog } from '../src/types/skill.ts';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CATALOG_URL =
  process.env.SKILLS_CATALOG_URL ||
  'https://raw.githubusercontent.com/inference-gateway/skills/main/catalog.json';
const APP_TARGET = resolve(ROOT, 'src/data/skills.json');
const PUBLIC_TARGET = resolve(ROOT, 'public/skills.json');
const ifMissing = process.argv.includes('--if-missing');

async function main(): Promise<void> {
  if (ifMissing && existsSync(APP_TARGET) && existsSync(PUBLIC_TARGET)) {
    console.log('[fetch-skills] catalog already present, skipping');
    return;
  }

  const res = await fetch(CATALOG_URL, { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

  const catalog = (await res.json()) as SkillCatalog;
  if (!Array.isArray(catalog?.skills)) {
    throw new Error("response missing 'skills' array");
  }

  const json = JSON.stringify(catalog, null, 2);
  await Promise.all(
    [APP_TARGET, PUBLIC_TARGET].map(async (path) => {
      await mkdir(dirname(path), { recursive: true });
      await writeFile(path, json);
    }),
  );

  console.log(`[fetch-skills] wrote ${catalog.skills.length} skill(s) from ${CATALOG_URL}`);
}

main().catch((err: unknown) => {
  const msg = err instanceof Error ? err.message : String(err);
  console.error(`[fetch-skills] fatal (url=${CATALOG_URL}): ${msg}`);
  process.exit(1);
});
