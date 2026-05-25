# List a Skill

Skills are portable markdown playbooks. The skills catalog is
hand-maintained in [`inference-gateway/skills`](https://github.com/inference-gateway/skills),
not auto-generated from upstream repos - so adding one means editing
`catalog.json` directly.

## Two paths

You can host a skill in two places:

1. **In-repo skill** - drop a `skills/<name>/SKILL.md` into
   `inference-gateway/skills` and add a `catalog.json` entry whose
   `source` points at that folder.
2. **External skill** - host the `SKILL.md` in your own repo and add only
   a `catalog.json` entry whose `source` points at the external GitHub
   URL.

Both render identically on `/skills/`.

## The catalog entry shape

Append an object to the `skills` array in
[`catalog.json`](https://github.com/inference-gateway/skills/blob/main/catalog.json):

```json
{
  "name": "skill-creator",
  "description": "Author a new Agent Skill from a minimal SKILL.md template.",
  "source": "https://github.com/inference-gateway/skills/tree/main/skills/skill-creator",
  "vendor": "inference-gateway",
  "license": "Apache-2.0",
  "tags": ["meta", "skills", "authoring"],
  "categories": ["developer-tools"],
  "homepage": "https://github.com/inference-gateway/skills"
}
```

Per field:

- `name` - lowercase kebab-case (`^[a-z0-9-]+$`). For in-repo skills the
  folder name under `skills/` must match this exactly.
- `description` - one sentence: what the skill does and when to invoke
  it. The agent runtime decides whether to surface the skill from this
  string alone, so vague descriptions get skipped.
- `source` - canonical URL where `SKILL.md` lives.
- `vendor` - the maintaining org or person; feeds the vendor filter on
  `/skills/`.
- `license` - an SPDX identifier from the
  [ADL Skill enum](https://github.com/inference-gateway/adl): `MIT`,
  `Apache-2.0`, `BSD-2-Clause`, `BSD-3-Clause`, `GPL-2.0`, `GPL-3.0`,
  `LGPL-2.1`, `LGPL-3.0`, `MPL-2.0`, `ISC`, `CC0-1.0`, `CC-BY-4.0`,
  `CC-BY-SA-4.0`, `Unlicense`, or `Proprietary`.
- `tags` - free-form discoverability strings.
- `categories` - higher-level grouping (e.g. `developer-tools`).
- `homepage` - optional landing URL beyond the source repo.

## `SKILL.md` frontmatter (in-repo skills)

The body is markdown the agent runtime reads on demand. The frontmatter
declares the same `name` + `description` so the runtime can pick the
right skill without reading the body:

```markdown
---
name: <skill-name>
description: <one sentence: what it does, when to use it>
---

# <Skill Title>

Use this skill when <trigger>.
```

The folder name must equal the `name` field. The fully-worked example to
copy from is
[`skills/skill-creator/`](https://github.com/inference-gateway/skills/tree/main/skills/skill-creator)
in the upstream repo - it is itself a skill for authoring skills.

## Submit a PR

There is no "+ Add skill" button on `/skills/` yet, so hand-edit
`catalog.json` and open a PR against
[`inference-gateway/skills`](https://github.com/inference-gateway/skills).
The repo uses conventional commits and semantic-release; a subject like
`feat(catalog): Add foo-skill` is the expected style.

Do **not** hand-edit `CHANGELOG.md` or bump the `release` field in
`catalog.json` - semantic-release does both on merge to `main`.

## What happens after merge

Unlike the agents catalog, there is no rebuild step - `catalog.json` is
the source of truth. Visibility is bounded only by the jsDelivr `@main`
cache window (up to ~12 hours).
