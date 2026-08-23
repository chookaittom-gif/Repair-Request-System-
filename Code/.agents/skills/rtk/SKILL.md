---
name: rtk
description: Use when running shell commands or checking project state to minimize token consumption
---

# RTK - Rust Token Killer

## Overview
RTK is a command-line interface (CLI) proxy tool designed to filter, compress, and optimize output from developer commands (such as git, cargo, grep, npm) to save LLM tokens (60–90%).

## When to Use
Use RTK whenever you run terminal commands to check status, run tests, build projects, or inspect files.

## Core Commands
- `rtk git status` / `rtk git diff` / `rtk git log`
- `rtk grep "pattern" .` / `rtk find "*.extension" .`
- `rtk ls .` / `rtk read <file>`
- `rtk cargo test` / `rtk npm test` / `rtk pytest`
- `rtk gain` (to check token savings)

## Common Mistakes
- **Running raw commands:** Running `git status` or `cargo test` directly consumes significantly more tokens. Always prefix with `rtk`.
