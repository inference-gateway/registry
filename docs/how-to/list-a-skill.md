# List a Skill

Skills are portable markdown playbooks - an
[Agent Skills](https://github.com/anthropics/skills/tree/main/spec) `SKILL.md`
that an agent reads on demand. Any public GitHub repo that ships one can be
listed in the catalog. Adding it is a one-PR change against `skills.yaml`.

For listing an A2A agent instead, see
[List an Agent](/how-to/list-an-agent).

## Prerequisite: a public repo with a `SKILL.md`

The catalog aggregator pulls each `SKILL.md` from your repo at the pinned
ref. It must:

- Be reachable at a known path under the repo (`SKILL.md` at root, or a
  nested path like `skills/<name>/SKILL.md` for multi-skill repos).
- Carry valid frontmatter: `name` (matching `^[a-zA-Z0-9_][a-zA-Z0-9_-]*$`)
  and `description` (1-1024 chars). The description alone has to let an
  agent decide whether to invoke the skill, so vague descriptions get
  filtered out at runtime.
- Declare a `license` in the frontmatter, or carry one in the `skills.yaml`
  entry. Must be an SPDX identifier from the
  [ADL Skill enum](https://github.com/inference-gateway/adl): `MIT`,
  `Apache-2.0`, `BSD-2-Clause`, `BSD-3-Clause`, `GPL-2.0`, `GPL-3.0`,
  `LGPL-2.1`, `LGPL-3.0`, `MPL-2.0`, `ISC`, `CC0-1.0`, `CC-BY-4.0`,
  `CC-BY-SA-4.0`, `Unlicense`, or `Proprietary`.

The `skill-creator` skill in
[`inference-gateway/skills`](https://github.com/inference-gateway/skills/tree/main/skills/skill-creator)
is itself a worked example for authoring a compliant `SKILL.md` - copy it as
a starting point.

## Use the "+ Add skill" button

The fastest path is the **+ Add skill** button on the [Skills](/skills/)
page. It opens a dialog with a copy-paste snippet and a "Continue to GitHub"
link that lands you at
`https://github.com/inference-gateway/skills/edit/main/skills.yaml`. GitHub
will fork the repo and open the PR for you - paste the entry, fill in the
fields for your skill, commit, and submit.

## The entry shape

`skills.yaml` is a flat list. Each entry carries the fields the build job
cannot derive from `SKILL.md` frontmatter alone:

```yaml
- url: https://github.com/<owner>/<repo>
  ref: v1.0.0
  path: SKILL.md
  vendor: <your-org-or-handle>
  license: Apache-2.0
  tags:
    - <tag>
  categories:
    - developer-tools
  homepage: https://<optional-project-url>
```

Per field:

- `url` (**required**) - `https://github.com/<owner>/<repo>` URL of the repo
  that hosts the `SKILL.md`.
- `ref` (optional) - branch, tag, or commit SHA. Defaults to `main`. Pinning
  a release tag is strongly recommended for third-party skills so a breaking
  change upstream cannot silently invalidate the catalog. Ignored for
  entries pointing at `inference-gateway/skills` itself (the working tree is
  always the source of truth).
- `path` (optional) - path to `SKILL.md` within the repo. Defaults to
  `SKILL.md`. Required for multi-skill repos.
- `vendor` (**required**) - org or handle shown in the registry UI; feeds
  the vendor filter on `/skills/`.
- `license` (optional) - SPDX identifier from the ADL Skill enum (see list
  above). Falls back to `SKILL.md` frontmatter `license:` if omitted.
- `tags` (**required**) - free-form discoverability strings.
- `categories` (**required**) - higher-level grouping (e.g. `developer-tools`).
- `homepage` (optional) - landing URL beyond the source repo.

The build script reads `name` and `description` from the upstream
`SKILL.md` frontmatter - they are not duplicated in `skills.yaml`.

## What happens after merge

The [`build-catalog.yml`](https://github.com/inference-gateway/skills/blob/main/.github/workflows/build-catalog.yml)
workflow in `inference-gateway/skills` runs on every push that touches
`skills.yaml`, `skills/**`, or the build script; on a daily cron at
`0 4 * * *` UTC; and on `workflow_dispatch`. It:

1. Fetches `SKILL.md` from each repo at the listed ref (or reads from the
   local working tree for self-hosted entries).
2. Parses and validates frontmatter (`name`, `description`, optional
   `license`).
3. Rejects duplicate `name` collisions across local and external entries.
4. Validates `license` is in the ADL Skill enum.
5. Sorts entries and writes `catalog.json`.
6. Opens a follow-up PR (`chore(catalog): rebuild catalog.json`) for a
   maintainer to merge.

Once that rebuild PR lands on `main`, the jsDelivr `@main` cache window
bounds visibility - your entry typically appears here within a few hours,
at most ~12.

If any fetch, parse, frontmatter, license, or dedupe check fails, the
workflow aborts before writing `catalog.json` - it never publishes a partial
catalog.

## Optional: host the `SKILL.md` body in `inference-gateway/skills`

Skills the Inference Gateway team maintains directly can live in the
catalog repo itself, under `skills/<name>/SKILL.md`. The `skills.yaml`
entry then points `url` back at
`https://github.com/inference-gateway/skills` and sets `path` to the
in-repo location:

```yaml
- url: https://github.com/inference-gateway/skills
  path: skills/<name>/SKILL.md
  vendor: inference-gateway
  license: Apache-2.0
  tags:
    - <tag>
  categories:
    - developer-tools
  homepage: https://github.com/inference-gateway/skills
```

The folder name under `skills/` must match the `SKILL.md` frontmatter
`name:` exactly. The build script reads `path` from the local working tree
in this case, so PRs that add a new in-repo skill build correctly before
the branch is merged to `main`.

`SKILL.md` frontmatter for an in-repo skill:

```markdown
---
name: <skill-name>
description: <one sentence: what it does, when to use it>
license: Apache-2.0
---

# <Skill Title>

Use this skill when <trigger>.
```

This is the same shape the build job expects for external skills - the only
difference is where the file lives.

## Conventions

- Conventional commits, lowercase subject -
  `feat(catalog): add foo-skill` is the expected style. Semantic-release in
  the skills repo reads these to compute versions.
- Do **not** hand-edit `catalog.json`, `CHANGELOG.md`, or the `release` /
  `updated` fields - all three are regenerated (the catalog by the build
  workflow, the rest by semantic-release).
