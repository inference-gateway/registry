#!/usr/bin/env node
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const CATALOG_URL =
  process.env.SKILLS_CATALOG_URL ||
  'https://raw.githubusercontent.com/inference-gateway/skills/main/catalog.json';

const SEED_PATH = resolve(ROOT, 'src/data/skills.seed.json');
const APP_TARGET = resolve(ROOT, 'src/data/skills.json');
const PUBLIC_TARGET = resolve(ROOT, 'public/skills/index.json');

const ifMissing = process.argv.includes('--if-missing');

function validate(catalog) {
  if (!catalog || typeof catalog !== 'object') {
    throw new Error('catalog is not an object');
  }
  if (!Array.isArray(catalog.skills)) {
    throw new Error('catalog.skills must be an array');
  }
  for (const [i, s] of catalog.skills.entries()) {
    for (const field of ['name', 'description', 'source', 'ref']) {
      if (typeof s[field] !== 'string' || s[field].length === 0) {
        throw new Error(`skills[${i}].${field} is missing or not a non-empty string`);
      }
    }
  }
}

async function ensureDir(filePath) {
  await mkdir(dirname(filePath), { recursive: true });
}

async function writeBoth(jsonText) {
  await ensureDir(APP_TARGET);
  await ensureDir(PUBLIC_TARGET);
  await writeFile(APP_TARGET, jsonText);
  await writeFile(PUBLIC_TARGET, jsonText);
}

async function useSeed(reason) {
  console.warn(`[fetch-skills] ${reason}. Falling back to seed: ${SEED_PATH}`);
  const seed = await readFile(SEED_PATH, 'utf8');
  validate(JSON.parse(seed));
  await writeBoth(seed);
}

async function main() {
  if (ifMissing && existsSync(APP_TARGET) && existsSync(PUBLIC_TARGET)) {
    console.log('[fetch-skills] catalog already present, skipping (--if-missing)');
    return;
  }

  try {
    const res = await fetch(CATALOG_URL, { headers: { accept: 'application/json' } });
    if (!res.ok) {
      await useSeed(`fetch ${CATALOG_URL} returned ${res.status}`);
      return;
    }
    const text = await res.text();
    const parsed = JSON.parse(text);
    validate(parsed);
    await writeBoth(JSON.stringify(parsed, null, 2));
    console.log(`[fetch-skills] wrote ${parsed.skills.length} skill(s) from ${CATALOG_URL}`);
  } catch (err) {
    await useSeed(`fetch failed: ${err.message}`);
  }
}

main().catch((err) => {
  console.error('[fetch-skills] fatal:', err);
  process.exit(1);
});
