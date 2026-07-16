+++
title = "Lichess MCP — chess in natural language"
date = "2026-07-10"
author = "Gabriele Genovesi"
tags = ["python", "mcp", "chess"]
draft = true
+++

A [Model Context Protocol](https://modelcontextprotocol.io) server for interacting with [Lichess](https://lichess.org) in natural language: play games, analyze positions, manage your account — from Claude Desktop or any MCP-compatible client.

It's a Python rewrite of [karayaman/lichess-mcp](https://github.com/karayaman/lichess-mcp) (TypeScript), ported to [FastMCP](https://github.com/modelcontextprotocol/python-sdk) and reorganized into per-domain modules.

## Usage

You need a Lichess API token (from [lichess.org/account/oauth/token](https://lichess.org/account/oauth/token)), then:

```bash
pip install -e .
```

and register the server in your Claude Desktop config. From there you can ask "analyze my last game" and the client does the rest.

Code: [Gabrigeno/lichess-mcp-py](https://github.com/Gabrigeno/lichess-mcp-py)
