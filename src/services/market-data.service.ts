// market-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { baseURL } from 'src/consts/urls';
import { TF } from 'src/models/shared/timeframes';
import { MarketData } from 'src/models/market-data';
import { MarketDataEntry } from 'src/models/market-data-entry';
import { db } from './dexie.service';

@Injectable({
  providedIn: 'root',
})
export class MarketDataService {
  private apiUrl = baseURL; // Base API URL

  constructor(private http: HttpClient) {}

  /** Fetch and store all market data */
  loadAllData(): Observable<MarketDataEntry[]> {
    const requests = {
      min15: this.http.get<MarketData[]>(`${this.apiUrl}/market-data/min15`),
      h1: this.http.get<MarketData[]>(`${this.apiUrl}/market-data/h1`),
      h4: this.http.get<MarketData[]>(`${this.apiUrl}/market-data/h4`),
    };

    return forkJoin(requests).pipe(
      // Use mergeMap to handle the Promise properly
      mergeMap(async (result) => {
        const marketData: MarketDataEntry[] = [
          { timeframe: TF.m15, data: result.min15 },
          { timeframe: TF.h1, data: result.h1 },
          { timeframe: TF.h4, data: result.h4 },
        ];

        await db.marketData.clear();
        await db.marketData.bulkAdd(marketData);

        return marketData;
      }),
      catchError((error) => {
        console.error('Error loading market data:', error);
        return of([]);
      })
    );
  }
  /** Get market data by timeframe */
  getDataByTimeframe(tf: TF): Observable<MarketDataEntry | undefined> {
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

  /** Get market data by timeframe and type */
  getDataByTimeframeAndType(
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
}
