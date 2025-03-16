import { MarketData } from './market-data';
import { MarketSummary } from './market-summary';
import { TF } from './shared/timeframes';

export interface ResponseData {
  timeframe: TF;
  marketData: MarketData[];
  marketSummary: MarketSummary[];
}
