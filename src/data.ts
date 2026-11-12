import raw from '../data/models.json';
import type { Model } from './types';

export const models = raw as Model[];

export const MODELS_BY_DATE = [...models].sort((a, b) => {
  const delta = a.releaseDate.localeCompare(b.releaseDate);
  return delta !== 0 ? delta : a.name.localeCompare(b.name);
});
