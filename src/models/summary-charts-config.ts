import { RepoTypes } from './repo-types';
import { TF } from './shared/timeframes';

export interface SummaryChartsConfig {
  timeframe: TF;
  colors: string[];
  chartTitle: string;
  targetTypes: { type: RepoTypes; title: string }[];
  chartType: string;
  sliceNumber: number;
}
