# Model timeline dataset — Phase 1 report

Prepared 10 November 2026. This report covers the data layer only; no UI has been built yet.

## Summary

- **261 models** from **16 labs**, spanning **2022-11-30 to 2026-11-09**.
- All entries are general-purpose text-output LLMs or LLM families. Image, video, audio, speech, embedding, reranking, OCR and safety-classifier releases were excluded.
- **123 open-weight** entries and **138 proprietary** entries.
- Every entry has at least one source URL. **122 entries have an official lab announcement/model-card/docs link**; the rest link to their Opper release page.
- Benchmark values are attached only where a matching published row was found. Every unmatched metric is `null`, not estimated.

### Counts by lab

| Lab | Models | Open weights | Flagship / mid / small | Official source link |
|---|---:|---:|---|---:|
| OpenAI | 40 | 2 | 30 / 3 / 7 | 26 |
| Anthropic | 31 | 0 | 17 / 10 / 4 | 18 |
| Google DeepMind | 32 | 8 | 11 / 13 / 8 | 12 |
| Meta | 21 | 16 | 8 / 9 / 4 | 7 |
| xAI | 14 | 1 | 11 / 2 / 1 | 2 |
| Mistral AI | 25 | 17 | 6 / 9 / 10 | 6 |
| DeepSeek | 19 | 19 | 13 / 6 / 0 | 12 |
| Alibaba (Qwen) | 27 | 16 | 11 / 16 / 0 | 7 |
| Microsoft | 3 | 3 | 0 / 1 / 2 | 1 |
| Amazon | 7 | 0 | 2 / 2 / 3 | 3 |
| Cohere | 4 | 4 | 2 / 2 / 0 | 0 |
| Moonshot AI | 8 | 8 | 8 / 0 / 0 | 5 |
| Z.ai (Zhipu) | 12 | 12 | 4 / 6 / 2 | 9 |
| MiniMax | 7 | 7 | 1 / 6 / 0 | 5 |
| NVIDIA | 8 | 8 | 2 / 3 / 3 | 6 |
| Thinking Machines Lab | 3 | 2 | 1 / 1 / 1 | 3 |
| **Total** | **261** | **123** | **127 / 89 / 45** | **122** |

### Releases by year

| Year | Models |
|---|---:|
| 2022 | 1 |
| 2023 | 15 |
| 2024 | 50 |
| 2025 | 96 |
| 2026 | 99 |

## Field coverage (null inventory, summary)

| Field | Populated | Null | Coverage |
|---|---:|---:|---:|
| `contextWindow` | 167 | 94 | 64.0% |
| `maxOutputTokens` | 151 | 110 | 57.9% |
| `pricePerMillionInput` | 193 | 68 | 73.9% |
| `pricePerMillionOutput` | 193 | 68 | 73.9% |
| `benchmarks.mmlu` | 22 | 239 | 8.4% |
| `benchmarks.gpqaDiamond` | 87 | 174 | 33.3% |
| `benchmarks.sweBenchVerified` | 63 | 198 | 24.1% |
| `benchmarks.arcAgi1` | 0 | 261 | 0.0% |
| `benchmarks.arcAgi2` | 79 | 182 | 30.3% |
| `benchmarks.hle` | 48 | 213 | 18.4% |
| `benchmarks.lmArenaElo` | 43 | 218 | 16.5% |
| `benchmarks.metrTimeHorizon` | 16 | 245 | 6.1% |

`headlineCapabilities`, `whyItMattered`, `tier`, `access`, `openWeights`, modalities and `sources` are populated for every row. `id`, `name`, `lab`, `releaseDate` and `sources` are never null.

## Benchmark coverage detail

| Benchmark | Rows | Best score in dataset | Best model |
|---|---:|---:|---|
| MMLU | 22 | 91.8% | o1-preview |
| GPQA Diamond | 87 | 96% | GPT-6 Astra |
| SWE-bench Verified | 63 | 96% | Claude Opus 5 |
| ARC-AGI-1 | 0 | — | — |
| ARC-AGI-2 | 79 | 95% | GPT-6 Astra |
| Humanity's Last Exam | 48 | 74.2% | Claude Fable 5.2 |
| LMArena Elo | 43 | 1481 Elo | GPT-5.6 Sol |
| METR 50% time horizon | 16 | 718.8 min | Claude Opus 4.6 |

LMArena values are limited to the November 2026 top-60 snapshot published by Tokenando, so most models have no Elo. METR values are the published 50% time horizon in minutes from METR’s v1.1 release. MMLU is stale/saturated and only 22 rows could be matched. ARC-AGI-1 has no matching rows in the selected tables; all values are null.

## Every model with a null field

The table below lists each model and every null field, including benchmark metrics. A blank “Missing” cell means the row is complete at this schema level. `arcAgi1` is null for all 261 rows, so it appears in every row below.

| Lab | Model | Release | Missing fields |
|---|---|---|---|
| OpenAI | GPT-3.5 Turbo | 2022-11-30 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude Instant | 2023-03-14 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-4 | 2023-03-14 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude 2.0 | 2023-07-11 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Meta | Llama 2 Chat 13B | 2023-07-18 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Meta | Llama 2 Chat 70B | 2023-07-18 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Meta | Llama 2 Chat 7B | 2023-07-18 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Mistral AI | Mistral 7B Instruct | 2023-09-27 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-4 Turbo | 2023-11-06 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.metrTimeHorizon |
| Anthropic | Claude 2.1 | 2023-11-21 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| DeepSeek | DeepSeek LLM 67B Chat (V1) | 2023-11-29 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen Chat 72B | 2023-11-30 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 1.0 Pro | 2023-12-06 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 1.0 Ultra | 2023-12-06 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Mistral AI | Mistral Medium | 2023-12-11 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Mistral AI | Mixtral 8x7B Instruct | 2023-12-11 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Mistral AI | Mistral Large (Feb '24) | 2024-02-26 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Mistral AI | Mistral Small (Feb '24) | 2024-02-26 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude 3 Haiku | 2024-03-04 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude 3 Opus | 2024-03-04 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo |
| Anthropic | Claude 3 Sonnet | 2024-03-04 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Cohere | Command-R (Mar '24) | 2024-03-12 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| xAI | Grok-1 | 2024-03-17 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Cohere | Command-R+ (Apr '24) | 2024-04-04 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Mistral AI | Mixtral 8x22B Instruct | 2024-04-17 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Meta | Llama 3 8B Instruct | 2024-04-18 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Meta | Llama3 70B Instruct | 2024-04-18 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Microsoft | Phi-3 Mini Instruct 3.8B | 2024-04-23 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen1.5 Chat 110B | 2024-04-25 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| DeepSeek | DeepSeek-V2-Chat | 2024-05-06 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-4o | 2024-05-13 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 1.5 Flash (May '24) | 2024-05-14 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 1.5 Pro (May '24) | 2024-05-15 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen2 Instruct 72B | 2024-06-07 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude 3.5 Sonnet (June '24) | 2024-06-21 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo |
| Mistral AI | Mistral Nemo Instruct (2407) | 2024-07-18 | maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-4o Mini | 2024-07-18 | benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| Meta | Llama 3.1 70B Instruct | 2024-07-23 | benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Meta | Llama 3.1 8B Instruct | 2024-07-23 | benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Meta | Llama 3.1 Instruct 405B | 2024-07-23 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.metrTimeHorizon |
| Mistral AI | Mistral Large 2 (Jul '24) | 2024-07-24 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.metrTimeHorizon |
| xAI | Grok Beta | 2024-08-13 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| DeepSeek | DeepSeek-V2.5 | 2024-09-06 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | o1-mini | 2024-09-12 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | o1-preview | 2024-09-12 | contextWindow, maxOutputTokens, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle |
| Mistral AI | Mistral Small (Sep '24) | 2024-09-17 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen2.5 72B Instruct | 2024-09-19 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 1.5 Flash (Sep '24) | 2024-09-24 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 1.5 Pro (Sep '24) | 2024-09-24 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| Meta | Llama 3.2 11B Vision Instruct | 2024-09-25 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Meta | Llama 3.2 3B Instruct | 2024-09-25 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Meta | Llama 3.2 Instruct 90B (Vision) | 2024-09-25 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude 3.5 Haiku | 2024-10-22 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude 3.5 Sonnet (Oct '24) | 2024-10-22 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo |
| Alibaba (Qwen) | Qwen2.5 Turbo | 2024-11-18 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Mistral AI | Pixtral Large | 2024-11-18 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | QwQ 32B-Preview | 2024-11-27 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Amazon | Amazon Nova Lite | 2024-12-03 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Amazon | Amazon Nova Micro | 2024-12-03 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Amazon | Amazon Nova Pro | 2024-12-03 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | o1 | 2024-12-05 | benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle |
| Meta | Llama 3.3 70B | 2024-12-06 | benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 2.0 Flash (experimental) | 2024-12-11 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| Microsoft | Phi-4 | 2024-12-12 | benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| xAI | Grok 2 (Dec '24) | 2024-12-12 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.metrTimeHorizon |
| DeepSeek | DeepSeek V3 | 2024-12-26 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.metrTimeHorizon |
| DeepSeek | DeepSeek R1 | 2025-01-20 | benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| DeepSeek | DeepSeek R1 Distill LLama 70B | 2025-01-20 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 2.0 Flash Thinking Experimental (Jan '25) | 2025-01-21 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen2.5 Max | 2025-01-28 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Mistral AI | Mistral Small 3 | 2025-01-30 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | O3 Mini | 2025-01-31 | benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 2.0 Flash | 2025-02-05 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 2.0 Flash-Lite (Preview) | 2025-02-05 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 2.0 Pro Experimental (Feb '25) | 2025-02-05 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Mistral AI | Mistral Saba | 2025-02-17 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| xAI | Grok 3 | 2025-02-19 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| xAI | Grok 3 Mini | 2025-02-19 | benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| Anthropic | Claude 3.7 Sonnet | 2025-02-24 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo |
| Microsoft | Phi-4 Mini Instruct | 2025-02-26 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-4.5 (Preview) | 2025-02-27 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | QwQ 32B | 2025-03-05 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemma 3 12B IT | 2025-03-12 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemma 3 27B IT | 2025-03-12 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemma 3 4B IT | 2025-03-12 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Cohere | Command A | 2025-03-13 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemma 3 1B Instruct | 2025-03-13 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Mistral AI | Mistral Small 3.1 | 2025-03-17 | contextWindow, maxOutputTokens, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| NVIDIA | Llama 3.3 Nemotron Super 49B v1 | 2025-03-18 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| DeepSeek | DeepSeek V3 (0324) | 2025-03-25 | maxOutputTokens, benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.metrTimeHorizon |
| Meta | Llama 4 Maverick | 2025-04-05 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| Meta | Llama 4 Scout | 2025-04-05 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| NVIDIA | Llama 3.1 Nemotron Ultra 253B v1 | 2025-04-07 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-4.1 | 2025-04-14 | benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| OpenAI | GPT-4.1 Mini | 2025-04-14 | benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| OpenAI | O4 Mini | 2025-04-16 | benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| OpenAI | o3 | 2025-04-16 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle |
| Alibaba (Qwen) | Qwen3 235B A22B | 2025-04-28 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen3 30B A3B | 2025-04-29 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen3 32B | 2025-04-29 | benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Amazon | Nova Premier | 2025-04-30 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.metrTimeHorizon |
| Mistral AI | Mistral Medium 3 | 2025-05-07 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 2.5 Flash | 2025-05-20 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| Anthropic | Claude 4 Sonnet | 2025-05-22 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude Opus 4 | 2025-05-22 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo |
| DeepSeek | DeepSeek R1 (0528) | 2025-05-28 | benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 2.5 Pro | 2025-06-05 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.metrTimeHorizon |
| Mistral AI | Magistral Medium 1 | 2025-06-10 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Mistral AI | Magistral Small 1 | 2025-06-10 | pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | O3 Pro | 2025-06-10 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| MiniMax | MiniMax-M1-80k | 2025-06-16 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 2.5 Flash-Lite | 2025-06-17 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Mistral AI | Mistral Small 3.2 | 2025-06-20 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemma 3n E4B Instruct | 2025-06-26 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| xAI | Grok 4 | 2025-07-10 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Moonshot AI | Kimi K2 Instruct | 2025-07-11 | benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen3 235B A22B Instruct (2507) | 2025-07-21 | benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Z.ai (Zhipu) | GLM 4.5 | 2025-07-28 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Z.ai (Zhipu) | GLM 4.5 Air | 2025-07-28 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude 4.1 Opus | 2025-08-05 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT OSS 120b | 2025-08-05 | benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT OSS 20b | 2025-08-05 | benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-5 | 2025-08-07 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle |
| OpenAI | GPT-5 Mini | 2025-08-07 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-5 Nano | 2025-08-07 | benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Mistral AI | Mistral Medium 3.1 | 2025-08-12 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| NVIDIA | Nemotron Nano 9B v2 | 2025-08-18 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| DeepSeek | DeepSeek V3.1 | 2025-08-21 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| xAI | Grok Code Fast 1 | 2025-08-28 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen3 Max (Preview) | 2025-09-05 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Moonshot AI | Kimi K2 0905 | 2025-09-05 | benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Mistral AI | Magistral Medium 1.2 | 2025-09-18 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| xAI | Grok 4 Fast | 2025-09-19 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| DeepSeek | DeepSeek V3.1 Terminus | 2025-09-22 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen3 Max | 2025-09-23 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-5 Codex | 2025-09-23 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude Sonnet 4.5 | 2025-09-29 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| DeepSeek | DeepSeek V3.2 Exp | 2025-09-29 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Z.ai (Zhipu) | GLM 4.6 | 2025-09-30 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-5 Pro | 2025-10-06 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude Haiku 4.5 | 2025-10-15 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| MiniMax | MiniMax M2 | 2025-10-26 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| NVIDIA | Nemotron Nano 12B v2 VL | 2025-10-28 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Amazon | Nova 2.0 Lite | 2025-10-29 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen3 Max Thinking (Preview) | 2025-11-03 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Moonshot AI | Kimi K2 Thinking | 2025-11-06 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-5.1 | 2025-11-13 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-5.1 Codex | 2025-11-13 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 3 Pro Preview | 2025-11-18 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo |
| Anthropic | Claude Opus 4.5 | 2025-11-24 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2 |
| Amazon | Nova 2.0 Omni | 2025-11-26 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Amazon | Nova 2.0 Pro Preview | 2025-11-27 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| DeepSeek | DeepSeek V3.2 | 2025-12-01 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Mistral AI | Ministral 3 14B | 2025-12-02 | benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Mistral AI | Ministral 3 8B | 2025-12-02 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Mistral AI | Mistral Large 3 | 2025-12-02 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.metrTimeHorizon |
| OpenAI | GPT-5.2 | 2025-12-11 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo |
| OpenAI | GPT-5.2 Pro | 2025-12-11 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| NVIDIA | Nemotron 3 Nano 30B A3B | 2025-12-15 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 3 Flash Preview | 2025-12-17 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Z.ai (Zhipu) | GLM 4.7 | 2025-12-22 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| MiniMax | MiniMax M2.1 | 2025-12-23 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Z.ai (Zhipu) | GLM 4.7 Flash | 2026-01-19 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen3 Max Thinking | 2026-01-23 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Moonshot AI | Kimi K2.5 | 2026-01-27 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude Opus 4.6 | 2026-02-05 | benchmarks.mmlu, benchmarks.arcAgi1 |
| OpenAI | GPT-5.3-Codex | 2026-02-05 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo |
| Z.ai (Zhipu) | GLM 5 | 2026-02-11 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| MiniMax | MiniMax M2.5 | 2026-02-12 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen 3.5 397B | 2026-02-16 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude Sonnet 4.6 | 2026-02-17 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 3.1 Pro Preview | 2026-02-19 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo |
| Alibaba (Qwen) | Qwen3.5 122B A10B | 2026-02-24 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen3.5 27B | 2026-02-24 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen3.5 35B A3B | 2026-02-24 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-5.3 Chat | 2026-03-03 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-5.4 | 2026-03-05 | benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.lmArenaElo |
| OpenAI | GPT-5.4 Pro | 2026-03-05 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| xAI | Grok 4.20 Non-Reasoning | 2026-03-10 | maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| xAI | Grok 4.20 Reasoning | 2026-03-10 | maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| NVIDIA | Nemotron 3 Super 120B A12B | 2026-03-11 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Z.ai (Zhipu) | GLM-5-Turbo | 2026-03-15 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Mistral AI | Mistral Small 4 | 2026-03-16 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| MiniMax | MiniMax M2.7 | 2026-03-18 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemma 4 31B IT | 2026-03-31 | pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen3.6-Plus | 2026-04-02 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemma 4 26B A4B IT | 2026-04-02 | pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemma 4 E2B | 2026-04-02 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Z.ai (Zhipu) | GLM 5.1 | 2026-04-07 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Meta | Muse Spark | 2026-04-08 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude Opus 4.7 | 2026-04-16 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen3.6 Max Preview | 2026-04-20 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Moonshot AI | Kimi K2.6 | 2026-04-20 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen 3.6 27B | 2026-04-22 | maxOutputTokens, benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-5.5 | 2026-04-23 | benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-5.5 Pro | 2026-04-23 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| DeepSeek | DeepSeek V4 Flash | 2026-04-24 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| DeepSeek | DeepSeek V4 Pro | 2026-04-24 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Mistral AI | Mistral Medium 3.5 | 2026-04-28 | maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| xAI | Grok 4.3 | 2026-04-30 | maxOutputTokens, benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 3.1 Flash-Lite | 2026-05-07 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen3.7-Max | 2026-05-19 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 3.5 Flash | 2026-05-19 | benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Cohere | Command A+ | 2026-05-20 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.metrTimeHorizon |
| Anthropic | Claude Opus 4.8 | 2026-05-28 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| MiniMax | MiniMax M3 | 2026-06-01 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| NVIDIA | NVIDIA-Nemotron-3-Ultra-550B-A55B | 2026-06-04 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude Fable 5 | 2026-06-09 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| Anthropic | Claude Mythos 5 | 2026-06-09 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Moonshot AI | Kimi K2.7 Code | 2026-06-12 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Z.ai (Zhipu) | GLM-5.2 | 2026-06-16 | benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude Sonnet 5 | 2026-06-30 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| xAI | Grok 4.5 | 2026-07-08 | maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Meta | Muse Spark 1.1 | 2026-07-09 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-5.6 Luna | 2026-07-09 | benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| OpenAI | GPT-5.6 Sol | 2026-07-09 | benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| OpenAI | GPT-5.6 Terra | 2026-07-09 | benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.metrTimeHorizon |
| Thinking Machines Lab | Inkling | 2026-07-15 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Moonshot AI | Kimi K3 | 2026-07-16 | benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 3.6 Flash | 2026-07-21 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude Opus 5 | 2026-07-24 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.arcAgi1, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Thinking Machines Lab | Inkling-Small | 2026-07-30 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| DeepSeek | DeepSeek V4 Flash (0731) | 2026-07-31 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen3.8 Max | 2026-08-03 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Meta | Muse Spark 1.2 | 2026-08-05 | maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Meta | Muse Glimmer 30B | 2026-08-10 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| NVIDIA | Nemotron 3.5 Lightning 30B A3B | 2026-08-11 | maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| xAI | Grok 4.6 | 2026-08-12 | maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| DeepSeek | DeepSeek V4 Pro 0813 | 2026-08-13 | benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 3.7 Flash | 2026-08-13 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen3.8 27B | 2026-08-14 | maxOutputTokens, benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Z.ai (Zhipu) | GLM-5.3 | 2026-08-18 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| DeepSeek | DeepSeek V4 Flash Vision | 2026-08-21 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Alibaba (Qwen) | Qwen3.8 Flash | 2026-08-26 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Z.ai (Zhipu) | GLM-5.3-Flash | 2026-08-26 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude Fable 5.1 | 2026-09-01 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude Mythos 5.1 | 2026-09-01 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 3.8 Flash | 2026-09-02 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-6 Astra | 2026-09-03 | benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| DeepSeek | DeepSeek V4.1 Flash | 2026-09-10 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Z.ai (Zhipu) | GLM-5.3-FlashX | 2026-09-18 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| xAI | Grok 4.7 | 2026-09-21 | maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude Opus 5.5 | 2026-09-22 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-6 Luna | 2026-09-22 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-6 Sol | 2026-09-22 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude Sonnet 5.5 | 2026-09-28 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-6.1 Sol | 2026-09-29 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 4 Argon | 2026-09-30 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Mistral AI | Mistral Large 4 | 2026-10-06 | maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude Haiku 5.5 | 2026-10-07 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Meta | Muse Wonder | 2026-10-12 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Meta | Muse Spark Open | 2026-10-15 | maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| DeepSeek | DeepSeek V4.1 Flash (1017) | 2026-10-17 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| MiniMax | MiniMax M3.1 Flash | 2026-10-19 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Moonshot AI | Kimi K3.1 Pro | 2026-10-23 | maxOutputTokens, benchmarks.mmlu, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| OpenAI | GPT-6.1 Terra | 2026-10-26 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Google DeepMind | Gemini 4 Carbon | 2026-10-28 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Thinking Machines Lab | Inkling 2 Small | 2026-11-05 | contextWindow, maxOutputTokens, pricePerMillionInput, pricePerMillionOutput, benchmarks.mmlu, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Meta | Muse Ember | 2026-11-09 | contextWindow, maxOutputTokens, benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude Fable 5.2 | 2026-11-09 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |
| Anthropic | Claude Mythos 5.2 | 2026-11-09 | benchmarks.mmlu, benchmarks.gpqaDiamond, benchmarks.sweBenchVerified, benchmarks.arcAgi1, benchmarks.arcAgi2, benchmarks.hle, benchmarks.lmArenaElo, benchmarks.metrTimeHorizon |

## Primary external sources

- Opper per-lab release trackers (dates, context windows, launch prices, model pages): <https://opper.ai/model-releases>
- BenchLM benchmark tables, November 2026 update: <https://benchlm.ai/benchmarks/swe-bench-verified>, <https://benchlm.ai/benchmarks/gpqa>, <https://benchlm.ai/benchmarks/arc-agi-2>, <https://benchlm.ai/benchmarks/hle>, <https://benchlm.ai/benchmarks/mmlu>
- METR time-horizon data (METR-Horizon-v1.1 YAML): <https://metr.org/time-horizons/>
- Tokenando LMArena Elo snapshot, 9 November 2026: <https://tokenando.ai/benchmarks/lmarena>
- Per-model official announcements/model cards/docs are linked in each entry’s `sources` array in `data/models.json`.

## Uncertainties and methodology notes

1. **Release dates.** Dates are the announcement dates recorded by Opper’s per-lab release trackers, not necessarily general-availability or rollout dates. Preview/experimental releases are kept as separate entries and labelled `limited preview`. Where a model had both a preview and a GA entry, both are retained when they were distinct releases.
2. **Benchmark comparability.** Benchmark columns are compiled from BenchLM’s November 2026 tables, which aggregate provider self-reports and secondary reports. Scores are not strictly like-for-like: SWE-bench Verified depends on the model+agent scaffold, ARC-AGI-2 rows use different reasoning-effort settings, HLE rows vary in tool use, and MMLU is stale and saturated. Where a base model had multiple reasoning configurations, the highest reported score was used. This is a display convention, not a claim that the configurations are equivalent.
3. **Benchmark saturation.** SWE-bench Verified and GPQA Diamond are saturated at the top (the leading rows cluster within ~1 point), so small gaps should not be read as meaningful. MMLU is saturated and largely retired from frontier reporting. ARC-AGI-2 remains discriminative at the frontier. HLE is still far from saturation.
4. **Missing context, output and price values.** Opper reports `—` for many older or self-hosted models. Those values are left null rather than inferred. This is why 94 context windows and 68 launch prices are missing. Open-weight models often have no first-party per-token API price, so null is expected there.
5. **Open weights.** `openWeights: true` means downloadable weights were published, including research/commercial licences (e.g. Mistral Research License, Apache 2.0, MIT, Modified MIT). It does not mean OSI-approved. Mistral Large 4 is marked false because its weights were announced as “later in October 2026” at launch; Mistral Large 2/3 and Pixtral Large are marked true. Meta’s Muse Glimmer 30B and Muse Spark Open are true. `Inkling 2 Small` is false because its weights were still pending at release. Some 2026 Meta Muse models are marked false by inference from the line’s closed flagship positioning; this is one of the least certain fields in the dataset.
6. **Tier.** `flagship` / `mid` / `small` is editorial and relative to the releasing lab’s lineup at that date, not an absolute capability rank. A 2023 flagship is not comparable to a 2026 small model. Size-tier names (mini/nano/flash/lite) drove most assignments; a small number were overridden for family position (e.g. Gemini Pro, GLM 5, Muse Spark, Command A).
7. **Access.** `public` means generally available via API and/or consumer product; `limited preview` is used for preview/experimental releases and restricted models such as Claude Mythos 5.x; `API only` is used for enterprise/API-first lines (Amazon Nova, Cohere Command, Thinking Machines Tinker releases). These labels are editorial and may lag regional rollout.
8. **Pricing.** Prices are launch list prices per million input/output tokens from Opper’s release pages. They exclude cached-input discounts, batch pricing, long-context surcharges, regional uplifts and provider markups. Where Opper listed a price range or only one side, the value is null or the single published side. Prices for open-weight models are hosted-provider prices, not self-hosting cost.
9. **Sources.** Official lab announcements/model cards/docs are used where Opper exposed an announcement link (122 entries). The remaining entries cite their Opper release page, which is a secondary tracker. Older Anthropic, Mistral, Meta and Qwen releases often had no official link in Opper’s page; those are the main source-quality gap. Mythos 5/5.1/5.2 and the three Thinking Machines entries use official Anthropic docs/model pages and Thinking Machines model cards/news posts.
10. **LMArena.** The Elo snapshot is the November 2026 top-60 table from Tokenando. It contains multiple hosted copies of the same model; the highest score per model was used. Models outside the top 60 have null Elo. Elo is a preference rating, not a capability benchmark.
11. **METR.** Values are the 50% time-horizon estimates in minutes from METR’s published YAML (benchmark `METR-Horizon-v1.1`). Only 16 selected models have a matching published row. METR notes that its estimates depend on scaffolding and task suite version.
12. **Point releases and aliases.** Some rows are refreshes rather than new architectures (e.g. Claude 3.5 Sonnet Oct ’24, DeepSeek V3 0324, Qwen3 2507, GPT-5.5 Instant, DeepSeek V4.1 Flash 1017). Benchmark tables often list only one row for a family; where a point release could not be distinguished, the value is inherited only when the published row name matched after removing configuration suffixes, otherwise it is null.
13. **End-of-timeline facts.** Claude Fable 5.2 and Claude Mythos 5.2 are dated 9 Nov 2026, priced at $8/$40 per million tokens with 1M context and 128K output. Fable 5.2 is public; Mythos 5.2 is restricted to vetted organizations. Meta Muse Ember is also dated 9 Nov 2026.
14. **Known gaps worth a second research pass.** (a) Official announcement URLs for pre-2025 Anthropic/Mistral/Meta/Qwen releases. (b) Context windows and launch prices for the 68 price-null and 94 context-null rows. (c) Verification of open-weight status for 2026 Meta Muse models and Command A+. (d) ARC-AGI-1 and broader MMLU coverage. (e) Independent (not self-reported) SWE-bench runs.

## Validation performed

- JSON parses cleanly and contains 261 objects.
- 261 unique IDs; no duplicate IDs.
- Rows are chronological. The final 9 Nov 2026 group is ordered so the timeline ends with Claude Fable 5.2 and Claude Mythos 5.2; Meta Muse Ember precedes them on the same date.
- Date range is inside the requested November 2022 – November 2026 window.
- Every `sources` array is non-empty; every URL is http(s).
- No image/video/audio-only model families are included.

## Phase 1 status

Data files are complete enough to review: `data/models.json` and this report. Per the plan, UI work is intentionally not started. Awaiting approval of scope, benchmark coverage, and the null-field policy before Phase 2 (Vite + React + TypeScript + D3).
