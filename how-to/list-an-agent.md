# List an Agent

Any public GitHub repo that ships an ADL `agent.yaml` at its root can be
listed in the catalog. Adding it is a one-line PR.

For listing a portable skill instead, see
[List a Skill](/how-to/list-a-skill).

## Prerequisite: a public repo with `agent.yaml` at root

The catalog aggregator pulls `agent.yaml` directly from your repo. It
must:

- Live at the **root** of the repo (not under `examples/` or `cmd/`).
- Use `apiVersion: adl.inference-gateway.com/v1` - the site rejects
  anything else.
- Carry valid `metadata.name`, `metadata.description`, and
  `metadata.version` (semver).

The full ADL schema, plus the `adl` CLI that scaffolds compliant repos,
lives at [adl.inference-gateway.com](https://adl.inference-gateway.com/).
This page does not re-document the schema.

## Use the "+ Add agent" button

The fastest path is the **+ Add agent** button on the
[Agents](/agents/) page. It opens a dialog with a copy-paste snippet and a
"Continue to GitHub" link that lands you at
`https://github.com/inference-gateway/agents/edit/main/agents.yaml`.
GitHub will fork the repo and open the PR for you - paste the entry,
commit, and submit.

## The entry shape

`agents.yaml` is a flat list. Each entry is two lines:

```yaml
- url: https://github.com/<owner>/<repo>
  ref: v1.0.0
```

- `url` is required and must be a `https://github.com/...` URL.
- `ref` is optional. Omitting it means `latest`: the build resolves your
  newest GitHub _release_ tag, falling back to the newest git tag only if the
  repo has cut no releases at all. A repo with neither releases nor tags fails
  the build. Pinning an explicit release tag is recommended for third-party
  agents so a breaking change upstream cannot silently invalidate the catalog.

## What happens after merge

The [`build-catalog.yml`](https://github.com/inference-gateway/agents/blob/main/.github/workflows/build-catalog.yml)
workflow in `inference-gateway/agents` runs on pushes to `main` that touch
`agents.yaml`, `scripts/build-catalog.mjs`, `package.json`,
`package-lock.json`, or the workflow file itself, plus `workflow_dispatch`.
There is no cron. It:

1. Fetches `agent.yaml` from each repo at the listed ref (resolving `latest`).
2. Validates it against the ADL JSON Schema.
3. Rejects duplicate `metadata.name` collisions.
4. Sorts entries by name and writes `catalog.json`.
5. Opens or updates a `chore(catalog): rebuild catalog.json` pull request from
   the `catalog/update` branch - it does not auto-commit to `main`.

A maintainer merges that rebuild PR. Your entry then becomes visible here once
`inference-gateway/agents` publishes a release, because this site reads the
catalog at jsDelivr `@latest` (the repo's newest tag). Releases there are
triggered manually.

## Optional: make the card pop

The card pulls the following fields straight out of your `agent.yaml`. They
are not required, but they make the listing more useful:

- `spec.card.documentationUrl` - turns on the **Documentation** button on the card.
- `spec.deployment.cloudrun.image` or `spec.deployment.kubernetes.image` -
  enables the **OCI Image** row so users can pin the exact image you
  publish. For repos outside the `inference-gateway` org this is the only
  way to surface an image at all.
- `spec.tools[].tags` and `spec.skills[].tags` - aggregate into the card's
  tag list and feed the tag filter on `/agents/`.
- `spec.scm.url` - explicit source URL; otherwise the aggregator's
  `_source.url` is used.
