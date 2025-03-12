// market-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { baseURL } from 'src/consts/urls';
import { TF } from 'src/models/shared/timeframes';
import { MarketData } from 'src/models/market-data';
import { db } from './dexie.service';

@Injectable({
  providedIn: 'root',
})
export class MarketDataService {
  private apiUrl = baseURL; // Base API URL

  private dataSubject = new BehaviorSubject<MarketData[]>([]); // Observable store
  public data$ = this.dataSubject.asObservable(); // Observable for components

  constructor(private http: HttpClient) {}

  /** Fetch and store all market data */
  loadAllData(): Observable<MarketData[]> {
    const requests = {
      min15: this.http.get<MarketData[]>(`${this.apiUrl}/market-data/min15`),
      h1: this.http.get<MarketData[]>(`${this.apiUrl}/market-data/h1`),
      h4: this.http.get<MarketData[]>(`${this.apiUrl}/market-data/h4`),
    };

    return forkJoin(requests).pipe(
      map(async (result) => {
        // Map fetched data into the required format
        const marketData: any[] = [
          { timeframe: TF.m15, data: result.min15 },
          { timeframe: TF.h1, data: result.h1 },
          { timeframe: TF.h4, data: result.h4 },
        ];

        // Store data in IndexedDB using Dexie
        await db.marketData.clear(); // Clear existing data
        await db.marketData.bulkAdd(marketData); // Add new data

        // Update observable for subscribers
        this.dataSubject.next(marketData);

        return marketData;
      })
    );
  }

  /** Get market data by timeframe */
  getDataByTimeframe(tf: TF): Observable<MarketData | undefined> {
    return db.marketData.where('timeframe').equals(tf).first();
  }

  /** Get market data by timeframe and type */
  getDataByTimeframeAndType(
    tf: TF,
    type: string
  ): Observable<MarketData | undefined> {
    return db.marketData
      .where('timeframe')
      .equals(tf)
      .first()
      .then((entry) => {
        return entry?.data.find((d) => d.type === type);
      });
  }
}
