import type { BenchmarkKey, LabMeta } from '../types';

export const DAY_MS = 86_400_000;

export const LABS: LabMeta[] = [
  { id: 'openai', name: 'OpenAI', color: '#2e7d54' },
  { id: 'anthropic', name: 'Anthropic', color: '#b84a2b' },
  { id: 'google', name: 'Google DeepMind', color: '#31589c' },
  { id: 'meta', name: 'Meta', color: '#4a6f8e' },
  { id: 'mistral', name: 'Mistral', color: '#c46a1b' },
  { id: 'deepseek', name: 'DeepSeek', color: '#4f46a8' },
  { id: 'alibaba', name: 'Alibaba / Qwen', color: '#a83a63' },
  { id: 'xai', name: 'xAI', color: '#3c3c3c' },
  { id: 'cohere', name: 'Cohere', color: '#1f7a6d' },
  { id: 'microsoft', name: 'Microsoft', color: '#2f6f8f' },
  { id: 'amazon', name: 'Amazon', color: '#a86200' },
  { id: 'nvidia', name: 'NVIDIA', color: '#5d7a1f' },
  { id: 'minimax', name: 'MiniMax', color: '#a33a3a' },
  { id: 'moonshot', name: 'Moonshot / Kimi', color: '#6f4fa8' },
  { id: 'zhipu', name: 'Zhipu / GLM', color: '#2a7568' },
  { id: 'thinkingmachines', name: 'Thinking Machines', color: '#8f4f7d' },
];

export const LAB_BY_ID = new Map(LABS.map((lab) => [lab.id, lab]));
export const LAB_ORDER = new Map(LABS.map((lab, index) => [lab.id, index]));

export function labColor(lab: string): string {
  return LAB_BY_ID.get(lab)?.color ?? '#94a3b8';
}

export function labName(lab: string): string {
  return LAB_BY_ID.get(lab)?.name ?? lab;
}

export interface MetricDef {
  key: BenchmarkKey;
  label: string;
  short: string;
  kind: 'percent' | 'elo' | 'time';
  min: number;
  max: number;
  saturation: number;
  scale: 'linear' | 'log' | 'arena';
  blurb: string;
}

export const METRICS: MetricDef[] = [
  {
    key: 'mmlu',
    label: 'MMLU',
    short: 'MMLU',
    kind: 'percent',
    min: 0,
    max: 100,
    saturation: 90,
    scale: 'linear',
    blurb: 'Broad academic knowledge, 57 subjects.',
  },
  {
    key: 'gpqaDiamond',
    label: 'GPQA Diamond',
    short: 'GPQA-D',
    kind: 'percent',
    min: 0,
    max: 100,
    saturation: 90,
    scale: 'linear',
    blurb: 'Graduate-level science questions.',
  },
  {
    key: 'sweBenchVerified',
    label: 'SWE-bench Verified',
    short: 'SWE-bench',
    kind: 'percent',
    min: 0,
    max: 100,
    saturation: 90,
    scale: 'linear',
    blurb: 'Resolved real-world GitHub issues.',
  },
  {
    key: 'arcAgi1',
    label: 'ARC-AGI-1',
    short: 'ARC-AGI-1',
    kind: 'percent',
    min: 0,
    max: 100,
    saturation: 85,
    scale: 'linear',
    blurb: 'No published rows in this dataset.',
  },
  {
    key: 'arcAgi2',
    label: 'ARC-AGI-2',
    short: 'ARC-AGI-2',
    kind: 'percent',
    min: 0,
    max: 100,
    saturation: 90,
    scale: 'linear',
    blurb: 'Held-out abstract reasoning puzzles.',
  },
  {
    key: 'hle',
    label: 'Humanity’s Last Exam',
    short: 'HLE',
    kind: 'percent',
    min: 0,
    max: 100,
    saturation: 70,
    scale: 'linear',
    blurb: 'Expert-written frontier knowledge questions.',
  },
  {
    key: 'lmArenaElo',
    label: 'LMArena Elo',
    short: 'LMArena',
    kind: 'elo',
    min: 1200,
    max: 1600,
    saturation: 1470,
    scale: 'arena',
    blurb: 'Blind human preference Elo.',
  },
  {
    key: 'metrTimeHorizon',
    label: 'METR time horizon',
    short: 'METR',
    kind: 'time',
    min: 1,
    max: 1000,
    saturation: 480,
    scale: 'log',
    blurb: 'Task length at 50% agent success, in minutes.',
  },
];

export const CHART_METRICS = METRICS.filter((metric) => metric.key !== 'arcAgi1');

export const METRIC_BY_KEY = new Map(METRICS.map((metric) => [metric.key, metric]));

export function parseDate(iso: string): number {
  return Date.UTC(
    Number(iso.slice(0, 4)),
    Number(iso.slice(5, 7)) - 1,
    Number(iso.slice(8, 10)),
  );
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

const dateFmt = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

const monthFmt = new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

const dayFmt = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  timeZone: 'UTC',
});

export function formatDate(ts: number): string {
  return dateFmt.format(new Date(ts));
}

export function formatMonthYear(ts: number): string {
  return monthFmt.format(new Date(ts));
}

export function formatDayMonth(ts: number): string {
  return dayFmt.format(new Date(ts));
}

export function formatContext(value: number | null): string {
  if (value == null) return '—';
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `${Number.isInteger(millions) ? millions : millions.toFixed(1)}M`;
  }
  if (value >= 1_000) {
    const thousands = value / 1_000;
    return `${Number.isInteger(thousands) ? thousands : thousands.toFixed(0)}K`;
  }
  return String(value);
}

export function formatPrice(value: number | null): string {
  if (value == null) return '—';
  if (value === 0) return '$0';
  if (value < 1) return `$${value.toFixed(2)}`;
  if (Number.isInteger(value)) return `$${value}`;
  return `$${value.toFixed(2)}`;
}

export function formatMetricValue(key: BenchmarkKey, value: number | null): string {
  if (value == null) return '—';
  const metric = METRIC_BY_KEY.get(key);
  if (!metric) return String(value);
  if (metric.kind === 'percent') {
    return `${value.toFixed(1).replace(/\.0$/, '')}%`;
  }
  if (metric.kind === 'elo') {
    return String(Math.round(value));
  }
  if (value < 60) return `${value.toFixed(1).replace(/\.0$/, '')} min`;
  const hours = value / 60;
  if (Math.abs(hours - Math.round(hours)) < 0.05) return `${Math.round(hours)} h`;
  return `${hours.toFixed(hours >= 100 ? 0 : 1)} h`;
}

export function formatModality(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function metricBarFraction(key: BenchmarkKey, value: number): number {
  const metric = METRIC_BY_KEY.get(key);
  if (!metric) return 0;
  if (metric.scale === 'log') {
    const low = Math.log10(1 + metric.min);
    const high = Math.log10(1 + metric.max);
    return clamp((Math.log10(1 + value) - low) / (high - low), 0.02, 1);
  }
  if (metric.scale === 'arena') {
    return clamp((value - metric.min) / (metric.max - metric.min), 0.02, 1);
  }
  return clamp(value / metric.max, 0.02, 1);
}

export function sourceHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function shortLabName(lab: string): string {
  if (lab === 'google') return 'Google';
  if (lab === 'alibaba') return 'Alibaba';
  if (lab === 'moonshot') return 'Moonshot';
  if (lab === 'zhipu') return 'Zhipu';
  if (lab === 'thinkingmachines') return 'Think. Machines';
  if (lab === 'microsoft') return 'Microsoft';
  return labName(lab);
}

export function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}
