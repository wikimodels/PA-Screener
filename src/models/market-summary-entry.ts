import { MarketSummary } from './market-summary';
import { TF } from './shared/timeframes';

export interface MarketSummaryEntry {
  id?: number;
  timeframe: TF;
  data: MarketSummary[];
}
