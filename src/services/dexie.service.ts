import Dexie, { Table } from 'dexie';
import { MarketDataEntry } from 'src/models/market-data-entry';
import { MarketSummaryEntry } from 'src/models/market-summary-entry';

export class AppDB extends Dexie {
  marketData!: Table<MarketDataEntry, number>;
  marketSummary!: Table<MarketSummaryEntry, number>;

  constructor() {
    super('market-data-db');
    this.version(1).stores({
      marketData: '++id, timeframe',
      marketSummary: '++id, timeframe', // Added marketSummary table
    });
  }

  async storeMarketData(entry: MarketDataEntry): Promise<number> {
    return await this.marketData.put(entry);
  }

  async storeMarketSummary(entry: MarketSummaryEntry): Promise<number> {
    return await this.marketSummary.put(entry);
  }

  async storeData(
    entry: MarketDataEntry | MarketSummaryEntry,
    isMarketData: boolean
  ): Promise<number> {
    return isMarketData
      ? this.marketData.add(entry as MarketDataEntry)
      : this.marketSummary.add(entry as MarketSummaryEntry);
  }
}

export const db = new AppDB();
