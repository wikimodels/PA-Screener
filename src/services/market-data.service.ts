// market-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, concat, forkJoin, of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { baseURL } from 'src/consts/urls';
import { TF } from 'src/models/shared/timeframes';
import { MarketData } from 'src/models/market-data';
import { MarketDataEntry } from 'src/models/market-data-entry';
import { db } from './dexie.service';
import { MarketSummaryEntry } from 'src/models/market-summary-entry';
import { MarketSummary } from 'src/models/market-summary';

@Injectable({
  providedIn: 'root',
})
export class MarketDataService {
  private apiUrl = baseURL; // Base API URL

  constructor(private http: HttpClient) {}

  /** Fetch and store all market data */
  loadAllData(): Observable<MarketDataEntry[]> {
    const requests = {
      m15: this.http.get<MarketData[]>(`${this.apiUrl}/market-data/min15`),
      h1: this.http.get<MarketData[]>(`${this.apiUrl}/market-data/h1`),
      h4: this.http.get<MarketData[]>(`${this.apiUrl}/market-data/h4`),
    };

    return forkJoin(requests).pipe(
      mergeMap(async (result) => {
        const marketData: MarketDataEntry[] = Object.entries(result).map(
          ([key, data]) => ({
            timeframe: TF[key as keyof typeof TF], // Convert key to TF enum
            data: data,
          })
        );

        // Store MarketData in IndexedDB
        await db.marketData.clear();
        await db.marketData.bulkPut(marketData);

        // Transform MarketData to MarketSummary
        const marketSummary: MarketSummaryEntry[] = marketData.map((entry) => ({
          timeframe: entry.timeframe,
          data: this.transformToSummary(entry.data), // ✅ Corrected function call
        }));

        // Store MarketSummary in IndexedDB
        await db.marketSummary.clear();
        await db.marketSummary.bulkPut(marketSummary);

        console.log('MarketDataSummary stored:', marketSummary);

        return marketData;
      }),
      catchError((error) => {
        console.error('Error loading market data:', error);
        return of([]);
      })
    );
  }

  /** 🔹 Helper Method to Transform MarketDataEntry[] -> MarketSummary[] */
  private transformToSummary(data: MarketData[]): MarketSummary[] {
    return data.map((d) => ({
      title: d.title,
      type: d.type,
      data: d.data.map((dt) => ({
        openTime: dt.openTime,
        count: dt.repoKlines?.length || 0,
      })),
    }));
  }

  /** Get market data by timeframe */
  getMarketDataByTimeframe(tf: TF): Observable<MarketDataEntry | undefined> {
    return new Observable<MarketDataEntry | undefined>((observer) => {
      db.marketData
        .where('timeframe')
        .equals(tf)
        .first()
        .then((entry) => {
          observer.next(entry);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getMarketSummaryByTimeframe(
    tf: TF
  ): Observable<MarketSummaryEntry | undefined> {
    return new Observable<MarketSummaryEntry | undefined>((observer) => {
      db.marketSummary
        .where('timeframe')
        .equals(tf)
        .first()
        .then((entry) => {
          observer.next(entry);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  /** Get market data by timeframe and type */
  getMarketDataByTimeframeAndType(
    tf: TF,
    type: string
  ): Observable<MarketData | undefined> {
    return new Observable<MarketData | undefined>((observer) => {
      db.marketData
        .where('timeframe')
        .equals(tf)
        .first()
        .then((entry) => {
          const data = entry?.data.find((d) => d.type === type);
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getMarketSummaryByTimeframeAndType(
    tf: TF,
    type: string
  ): Observable<MarketSummary | undefined> {
    return new Observable<MarketSummary | undefined>((observer) => {
      db.marketSummary
        .where('timeframe')
        .equals(tf)
        .first()
        .then((entry) => {
          const data = entry?.data.find((d) => d.type === type);
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  clearDatabase(): Observable<void> {
    return new Observable<void>((observer) => {
      Promise.all([db.marketData.clear(), db.marketSummary.clear()])
        .then(() => {
          console.log('✅ IndexedDB cleared');
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          console.error('❌ Error clearing IndexedDB:', error);
          observer.error(error);
        });
    });
  }

  fetchMarketData(): Observable<MarketDataEntry[]> {
    return this.clearDatabase().pipe(switchMap(() => this.loadAllData()));
  }
}
