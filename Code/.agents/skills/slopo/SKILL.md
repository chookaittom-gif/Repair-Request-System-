---
name: slopo
description: >-
  A lightweight CLI tool for detecting non-exact code duplication using embedding models.
  Use when the user asks to find code duplication, clean up duplicated logic, or refactor similar code.
---

# Slopo Skill

Use this skill when you want to detect non-exact code duplication across the codebase using embeddings, review the generated report, and refactor similar code snippets.

## How Slopo Works

Unlike traditional code duplication tools that search for exact copy-paste clones, Slopo uses embeddings to identify semantically similar blocks of code (like functions or methods) even if they use different variable names or formatting.

The typical workflow consists of three stages:
1. **Index**: Scan the source code to extract code units.
2. **Embed**: Compute vector embeddings for each code unit using an external embedding provider (e.g., Voyage AI, OpenAI, Cohere, etc., via LiteLLM).
3. **Analyze**: Cluster similar code units and generate a markdown report (`index.md`) ranking similar clusters.

---

## Setup & Configuration

### 1. Initialize Configuration
To initialize a configuration template in the workspace root, run:
```powershell
slopo init
```
This generates `slopo.conf.yaml`.

### 2. Configure API Key
Configure the embedding API key. Typically, you can use the `SLOPO_EMBEDDING_API_KEY` environment variable or place it in a `.env` file:
```env
SLOPO_EMBEDDING_API_KEY=your-api-key-here
```

### 3. Edit `slopo.conf.yaml`
Key parameters in the config:
- `source_dir`: Path to the directory containing source files to index.
- `source_dir_exclude`: List of glob patterns to ignore (e.g., tests, build outputs, node_modules).
- `embedding_model`: The model used (e.g., `voyage/voyage-code-2`).
- `embedding_dimensions`: The output dimensions of the model (e.g., `512`).
- `similarity_threshold`: Min similarity (0.0 to 1.0) to group items.
- `rerank_threshold`: Min similarity after location-based boosts.

---

## Execution Flow

Run the commands in sequence to index, compute embeddings, and generate a report:

```powershell
# 1. Scan and index code units
slopo index

# 2. Compute embeddings (requires network/API key)
slopo embed

# 3. Analyze and generate Markdown reports
slopo analyze
```

The report will be created in the directory specified by `report_dir` in `slopo.conf.yaml` (default is `report/`).

---

## Duplicate Review and Refactoring Workflow

1. **Review the Report**: Open the generated `index.md` in the report directory. Look through the identified clusters of similar code.
2. **Ignore False Positives**: For clusters that are not actually duplicates or shouldn't be refactored, add their hashes to `slopo.ignore.txt` to exclude them from future reports.
3. **Refactor**: For actual duplicates, extract the common logic into a shared helper function/module. Verify changes using tests and ensure no regressions.
