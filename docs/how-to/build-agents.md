# Build Custom Agents

Custom A2A agents are scaffolded with the
[ADL CLI](https://github.com/inference-gateway/adl-cli). This page is the
registry-side blurb - it only covers what's needed to make your agent
listable in this catalog.

## ADL CLI is the canonical scaffolder

The full guide for authoring an agent (install, `adl init`, `adl generate`,
provider matrix, multi-language support, CI/CD templates, deployment
options) lives at [adl.inference-gateway.com](https://adl.inference-gateway.com/)
and in the [`adl-cli` repo](https://github.com/inference-gateway/adl-cli).
Start there.

## What "catalog-eligible" means

To land your agent on this site, the generated (or hand-written) repo
must satisfy four things:

- `agent.yaml` at the **repo root**.
- `apiVersion: adl.inference-gateway.com/v1`.
- Valid `metadata.name` (kebab-case), `metadata.description`, and
  `metadata.version` (semver).
- The repo is public on GitHub.

Once those hold, follow [List an Agent](/how-to/list-an-agent) to open the
PR.

## Polish for a great card

A bare-minimum manifest gets you a working card. These optional fields
make it noticeably better:

- `spec.card.documentationUrl` - adds a **Docs** button on the card.
- `spec.deployment.cloudrun.image` or `spec.deployment.kubernetes.image` -
  surfaces the **OCI Image** row. Required to show an image at all for
  repos outside the `inference-gateway` org.
- `spec.tools[].tags` and `spec.skills[].tags` - feed the card's tag list
  and the tag filter on `/agents/`.
