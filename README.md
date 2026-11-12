# Frontier Timeline

An interactive, sourced release timeline of general-purpose language models from **GPT-3.5 (30 Nov 2022)** to **Claude Fable 5.2 / Claude Mythos 5.2 (9 Nov 2026)**.

The dataset contains **261 models across 16 labs**, including open-weights releases from Meta, Mistral, DeepSeek, Alibaba/Qwen, Microsoft, NVIDIA, MiniMax, Moonshot/Kimi, Zhipu/GLM, and others.

The app is a static Vite + React + TypeScript front end. It has no backend and reads only `data/models.json`.

## Run it

Requires Node 20 or newer (built with Node 24).

```bash
npm install
npm run dev
```

Then open the URL Vite prints, usually <http://localhost:5173>.

```bash
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
```

## What you can do

- **Scrub** the full-width timeline by dragging or tapping anywhere on the track.
- **Play / pause** the timeline. At the end, pressing play restarts from the beginning.
- **Change playback speed** between 0.5×, 1×, 2×, and 4×.
- **Step model by model** with `←` / `→`. Hold `Shift` to jump 30 days.
- **Play / pause with `Space`** when focus is not inside a form control or button.
- **Jump to a capability milestone** by clicking a diamond marker above the scrubber.
- **Filter by lab** with the chips, search by model, lab, capability, or modality, and toggle **open weights only**.
- **Inspect any model** by clicking a lane node or a chart dot.
- **Switch chart metric** between MMLU, GPQA Diamond, SWE-bench Verified, ARC-AGI-2, Humanity's Last Exam, LMArena Elo, and METR time horizon.

The scrubber, lanes, chart, and the model record below them all share one playhead date. Selecting a model opens its full record — provenance, key facts, published benchmarks, and sources.

## Reading the data honestly

Several conventions matter when interpreting the UI:

- **Release dates are announcement dates**, taken from the release source or the Opper release timeline. They are not necessarily general-availability dates.
- **Null means "not found"**, not zero and not an estimate. A missing benchmark is rendered as a gap or a dash. Nothing is interpolated.
- **Benchmark values are attached only where a published row matched that model.** When a source reported several reasoning configurations, the highest reported configuration was used. Scores are mostly provider self-reports and are not strictly like-for-like across labs or dates.
- **`tier`, `access`, and `openWeights` are editorial classifications.** They are documented model by model in `data/REPORT.md`.

For per-lab counts, every null field, source methodology, and all uncertainty notes, see [`data/REPORT.md`](data/REPORT.md).

## Adding a model

The UI reads the array in `data/models.json` directly. To add a release, append one object to that array and reload the page. No other file needs to change.

```json
{
  "id": "lab-model-slug-2027",
  "name": "Model Name",
  "lab": "openai",
  "labName": "OpenAI",
  "releaseDate": "2027-02-14",
  "tier": "flagship",
  "openWeights": false,
  "access": "public",
  "inputModalities": ["text", "image", "file"],
  "outputModalities": ["text"],
  "contextWindow": 1000000,
  "maxOutputTokens": 128000,
  "pricePerMillionInput": 8,
  "pricePerMillionOutput": 40,
  "headlineCapabilities": "One or two sourced sentences about what the model is and does.",
  "benchmarks": {
    "mmlu": null,
    "gpqaDiamond": 88.1,
    "sweBenchVerified": 82.4,
    "arcAgi1": null,
    "arcAgi2": 61.2,
    "hle": 42.7,
    "lmArenaElo": 1450,
    "metrTimeHorizon": 320
  },
  "whyItMattered": "One sentence on why this release changed the frontier or the market.",
  "sources": [
    "https://example.com/official-announcement"
  ]
}
```

### Field rules

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Unique, stable slug. Used as the React key and for detail selection. |
| `name` | string | Display name exactly as the lab styles it. |
| `lab` | string | Lowercase lab key. Use one of the existing keys in `src/lib/metrics.ts` (`openai`, `anthropic`, `google`, `meta`, `mistral`, `deepseek`, `alibaba`, `xai`, `cohere`, `microsoft`, `amazon`, `nvidia`, `minimax`, `moonshot`, `zhipu`, `thinkingmachines`). |
| `labName` | string | Human-readable lab name shown in the UI. |
| `releaseDate` | ISO date | `YYYY-MM-DD` announcement date, UTC. |
| `tier` | string | `flagship`, `mid`, or `small`. Editorial. |
| `openWeights` | boolean | Whether downloadable weights were available at release, not merely promised. |
| `access` | string | `public`, `API only`, or `limited preview`. |
| `inputModalities` | string[] | Subset of `text`, `image`, `audio`, `video`, `file`, `pdf`. |
| `outputModalities` | string[] | Subset of the same values. |
| `contextWindow` | number \| null | Tokens. `null` when no published figure was found. |
| `maxOutputTokens` | number \| null | Tokens. `null` when unknown. |
| `pricePerMillionInput` | number \| null | USD per 1M input tokens at launch. |
| `pricePerMillionOutput` | number \| null | USD per 1M output tokens at launch. |
| `headlineCapabilities` | string | Short sourced description. |
| `whyItMattered` | string | One sentence of historical significance. |
| `benchmarks` | object | Exactly the eight keys shown above. Use `null` for anything unpublished. |
| `sources` | string[] | Official announcement, model card, docs, or a release reference. At least one URL. |

`metrTimeHorizon` is stored in **minutes**, `lmArenaElo` as Elo points, and the other benchmark fields as percentages on a 0–100 scale.

Do not put `0` in a benchmark field to mean "unknown". Use `null`.

### Adding a new lab

Add the lab to `LABS` in `src/lib/metrics.ts` with an `id`, display `name`, and accent `color`. The lanes and filter chips pick it up from there. Then use the same `lab` key in `data/models.json`.

## Project structure

```
data/
  models.json        the only runtime dataset
  REPORT.md          coverage, null fields, and methodology caveats
public/
  favicon.svg
src/
  App.tsx            playhead, playback, filters, keyboard shortcuts, layout
  components/
    Scrubber.tsx     daily scrubber: milestones, drag/touch, playback controls
    ReleaseLanes.tsx one lane per lab, announcement-date nodes
    FrontierChart.tsx metric dropdown, D3 axes, record-high steps (red)
    DetailCard.tsx   full model record: provenance, facts, benchmarks, sources
  lib/
    metrics.ts       lab palette, benchmark definitions, formatting
    milestones.ts    capability threshold milestones
    useElementWidth.ts
  data.ts            typed import of data/models.json
  types.ts           Model and benchmark types
  styles.css         print-editorial design system (paper, ink, hairlines)
```

Design notes: dark ambient wallpaper behind Apple-style "liquid glass" panels —
frosted, blurred materials with hairline borders and SF type, one system-blue accent
reserved for the playhead and the record line.

## QA notes

- `npm run build` completes with no TypeScript errors.
- The app was checked in Chrome at desktop and mobile widths; document width never exceeds the viewport.
- Scrub, play/pause, speed changes, lab chips, open-weights toggle, search, milestone jumps, arrow stepping, metric switching, and model selection were exercised by script.
- Missing benchmark rows render as dashes or hatched gaps; no score is inferred.
