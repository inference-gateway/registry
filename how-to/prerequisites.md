# Prerequisites

Everything on this site is browsable without any local setup. You only need
tooling when you want to act on what you find here - paste an
`infer agents add` or `infer skills install` command, pull a card's OCI
image, or open the "+ Add agent" PR.

## The `infer` CLI

The CLI is what runs the copy-paste commands shown on every card. Pick one
of the install methods below.

### Install script (user-local)

The script defaults to `/usr/local/bin`, which needs root. Point it at a
directory on your `PATH` that you own to avoid `sudo`:

```sh
mkdir -p "$HOME/.local/bin"
curl -fsSL https://raw.githubusercontent.com/inference-gateway/cli/main/install.sh \
  | bash -s -- --install-dir "$HOME/.local/bin"
```

Make sure `$HOME/.local/bin` is on your `PATH`. Pin a version in production
with `--version vX.Y.Z`.

### Nix flakes

The CLI ships a `flake.nix` exposing `infer` as both a package and an app.

Run it once without installing:

```sh
nix run github:inference-gateway/cli -- --version
```

Install it into your profile:

```sh
nix profile install github:inference-gateway/cli
```

Or add it to a system / home-manager config by referencing the flake input
`github:inference-gateway/cli` and pulling `packages.<system>.infer`.

### Flox

Flox can consume the same flake. Add `infer` to an existing Flox
environment with:

```sh
flox install --flake github:inference-gateway/cli infer
```

Or declaratively, by editing the env's `manifest.toml` (`flox edit`):

```toml
[install]
infer.flake = "github:inference-gateway/cli"  # pin a tag in production, e.g. ".../v0.112.1"
```

Then `flox activate` puts `infer` on your `PATH`.

### Verify

```sh
infer --version
```

Full installation options (container image, manual download with checksum
verification, etc.) live in the
[CLI repo](https://github.com/inference-gateway/cli).

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
