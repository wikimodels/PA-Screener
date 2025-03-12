// db.ts
import Dexie, { Table } from 'dexie';
import { MarketDataEntry } from 'src/models/market-data-entry';

export class AppDB extends Dexie {
  marketData!: Table<MarketDataEntry, number>;

  constructor() {
    super('market-data-db');
    this.version(1).stores({
      marketData: '++id, timeframe',
    });
  }
}

export const db = new AppDB();
