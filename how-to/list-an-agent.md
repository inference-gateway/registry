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
  ref: main
```

- `url` is required and must be a `https://github.com/...` URL.
- `ref` is optional and defaults to `main`. Pinning a release tag is
  recommended for third-party agents so a breaking change upstream cannot
  silently invalidate the catalog.

## What happens after merge

The [`build-catalog.yml`](https://github.com/inference-gateway/agents/blob/main/.github/workflows/build-catalog.yml)
workflow in `inference-gateway/agents` runs on every push that touches
`agents.yaml`, and on a daily cron at `0 4 * * *` UTC. It:

1. Fetches `agent.yaml` from each repo at the listed ref.
2. Validates it against the ADL JSON Schema.
3. Rejects duplicate `metadata.name` collisions.
4. Sorts entries by name and writes `catalog.json`.
5. Auto-commits with `chore(catalog): rebuild catalog.json [skip ci]`.

The jsDelivr `@main` cache window then bounds visibility - your entry
typically appears here within a few hours, at most ~12.

## Optional: make the card pop

The card pulls the following fields straight out of your `agent.yaml`. They
are not required, but they make the listing more useful:

- `spec.card.documentationUrl` - turns on the **Docs** button on the card.
- `spec.deployment.cloudrun.image` or `spec.deployment.kubernetes.image` -
  enables the **OCI Image** row so users can pin the exact image you
  publish. For repos outside the `inference-gateway` org this is the only
  way to surface an image at all.
- `spec.tools[].tags` and `spec.skills[].tags` - aggregate into the card's
  tag list and feed the tag filter on `/agents/`.
- `spec.scm.url` - explicit source URL; otherwise the aggregator's
  `_source.url` is used.
