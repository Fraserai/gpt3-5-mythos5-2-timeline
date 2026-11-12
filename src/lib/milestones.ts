import type { BenchmarkKey, Milestone, Model } from '../types';
import { formatMetricValue, parseDate } from './metrics';

interface ThresholdSpec {
  key: BenchmarkKey;
  label: string;
  thresholds: number[];
}

const SPECS: ThresholdSpec[] = [
  { key: 'mmlu', label: 'MMLU', thresholds: [80, 85, 90] },
  { key: 'gpqaDiamond', label: 'GPQA Diamond', thresholds: [40, 60, 75, 85, 90] },
  { key: 'sweBenchVerified', label: 'SWE-bench Verified', thresholds: [50, 70, 80, 90] },
  { key: 'arcAgi2', label: 'ARC-AGI-2', thresholds: [30, 50, 70, 90] },
  { key: 'hle', label: 'Humanity’s Last Exam', thresholds: [10, 20, 30, 40, 50, 60, 70] },
  { key: 'lmArenaElo', label: 'LMArena Elo', thresholds: [1300, 1400, 1450, 1480] },
  { key: 'metrTimeHorizon', label: 'METR time horizon', thresholds: [60, 240, 480] },
];

export function buildMilestones(models: Model[]): Milestone[] {
  const sorted = [...models].sort((a, b) => a.releaseDate.localeCompare(b.releaseDate));
  const milestones: Milestone[] = [];

  for (const spec of SPECS) {
    let record = Number.NEGATIVE_INFINITY;
    for (const model of sorted) {
      const value = model.benchmarks[spec.key];
      if (value == null || value <= record) continue;
      const previous = record;
      record = value;
      for (const threshold of spec.thresholds) {
        if (previous < threshold && value >= threshold) {
          milestones.push({
            id: `${spec.key}-${threshold}-${model.id}`,
            date: parseDate(model.releaseDate),
            dateISO: model.releaseDate,
            modelId: model.id,
            lab: model.lab,
            label: `${model.name} reaches ${formatMetricValue(spec.key, threshold)} on ${spec.label}`,
            metric: spec.key,
            value: threshold,
          });
        }
      }
    }
  }

  return milestones.sort((a, b) => a.date - b.date || a.label.localeCompare(b.label));
}
