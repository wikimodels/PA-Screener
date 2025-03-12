import { MarketData } from './market-data';
import { TF } from './shared/timeframes';

export interface MarketDataEntry {
  id?: number;
  timeframe: TF;
  data: MarketData[];
}
