+++
title = "Gitea Stack — self-hosted Git with CI/CD"
date = "2026-07-10"
author = "Gabriele Genovesi"
tags = ["self-hosted", "docker", "ci-cd"]
draft = true
+++

Docker Compose setup for a complete self-hosted [Gitea](https://gitea.com) instance:

- **Gitea** — self-hosted Git service
- **PostgreSQL** — database
- **Traefik** — reverse proxy with automatic TLS (Let's Encrypt)
- **Act Runner** — CI/CD compatible with GitHub Actions syntax

## Structure

```
├── docker-compose.yml            # Production: Gitea + PostgreSQL
├── docker-compose-traefik.yml    # Traefik with TLS
├── docker-compose-dev.yml        # Local development (no Traefik)
├── docker-compose-runner.yml     # Act Runner
└── .github/workflows/deploy.yml  # Auto-deploy on push to main
```

Production deploys are automatic: push to `main` and the workflow updates the stack. Secrets live in `.gitea.env`, outside the repository.

The interesting bit is the Act Runner: workflows written for GitHub Actions run unchanged on the Gitea instance, so you can migrate off GitHub without rewriting your CI.

Code: [Gabrigeno/gitea-stack](https://github.com/Gabrigeno/gitea-stack)
