# Prerequisites

Before you can start using A2A (Agent-to-Agent) services from the registry,
make sure you have the following installed.

## Container runtime

You need a container runtime to pull and run agent containers:

- **Docker** (recommended): `docker --version`
- **Podman** (alternative): `podman --version`
- **containerd** with `nerdctl` for advanced users

## Network access

Make sure you can reach:

- GitHub Container Registry (`ghcr.io`)
- Inference Gateway endpoints (if using hosted services)
- The public internet for downloading container images

## System requirements

- **Storage**: at least 2 GB free for container images
- **Memory**: minimum 4 GB RAM (8 GB+ recommended)
- **OS**: Linux, macOS, or Windows with WSL2
