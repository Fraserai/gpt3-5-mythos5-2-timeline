export type Tier = 'flagship' | 'mid' | 'small';
export type Access = 'public' | 'API only' | 'limited preview';
export type Modality = 'text' | 'image' | 'audio' | 'video' | 'file' | 'pdf';

export interface Benchmarks {
  mmlu: number | null;
  gpqaDiamond: number | null;
  sweBenchVerified: number | null;
  arcAgi1: number | null;
  arcAgi2: number | null;
  hle: number | null;
  lmArenaElo: number | null;
  metrTimeHorizon: number | null;
}

export interface Model {
  id: string;
  name: string;
  lab: string;
  labName: string;
  releaseDate: string;
  tier: Tier;
  openWeights: boolean;
  access: Access;
  inputModalities: Modality[];
  outputModalities: Modality[];
  contextWindow: number | null;
  maxOutputTokens: number | null;
  pricePerMillionInput: number | null;
  pricePerMillionOutput: number | null;
  headlineCapabilities: string;
  benchmarks: Benchmarks;
  whyItMattered: string;
  sources: string[];
}

export type BenchmarkKey = keyof Benchmarks;

export interface Milestone {
  id: string;
  date: number;
  dateISO: string;
  modelId: string;
  lab: string;
  label: string;
  metric: BenchmarkKey;
  value: number;
}

export interface LabMeta {
  id: string;
  name: string;
  color: string;
}
