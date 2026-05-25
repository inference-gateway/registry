# Prerequisites

Everything on this site is browsable without any local setup. You only need
tooling when you want to act on what you find here - paste an
`infer agents add` or `infer skills install` command, pull a card's OCI
image, or open the "+ Add agent" PR.

## The `infer` CLI

The CLI is what runs the copy-paste commands shown on every card. Install
it once:

```sh
# Go install (binary lands as `cli`; rename or alias to `infer`)
go install github.com/inference-gateway/cli@latest

# OR install script (pin a version in production)
curl -fsSL https://raw.githubusercontent.com/inference-gateway/cli/main/install.sh | bash
```

Verify with:

```sh
infer --version
```

Full installation options (container image, specific versions, etc.) live in
the [CLI repo](https://github.com/inference-gateway/cli).

## A running gateway

`infer agents add` writes an entry into your local config that points an
A2A agent at an inference gateway. You need a gateway reachable from your
CLI to actually invoke the agent - the registry itself never talks to a
gateway, but the commands you paste expect one. See
[`inference-gateway/inference-gateway`](https://github.com/inference-gateway/inference-gateway)
for setup.

## Network access

The site fetches both catalogs at runtime, and cards link out to source
repos. You need outbound access to:

- `cdn.jsdelivr.net` - serves `catalog.json` for both agents and skills.
- `raw.githubusercontent.com` and `github.com` - reached when you open a
  source repo or the "+ Add agent" PR flow.
- `ghcr.io` - only when you later pull an agent's OCI image locally.

## Optional: a container runtime

Docker or Podman is only required if you intend to run an agent container
locally. Browsing and installing into the CLI config does not require one.
