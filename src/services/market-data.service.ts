import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { baseURL } from 'src/consts/urls';
import { TF } from 'src/models/shared/timeframes';
import { MarketData } from 'src/models/market-data';

interface MarketDataEntry {
  timeframe: TF;
  data: MarketData[];
}

@Injectable({
  providedIn: 'root',
})
export class MarketDataService {
  private apiUrl = baseURL; // Base API URL

  private marketData: MarketDataEntry[] = []; // Store all market data
  private dataSubject = new BehaviorSubject<MarketDataEntry[]>([]); // Observable store
  public data$ = this.dataSubject.asObservable(); // Observable for components

  constructor(private http: HttpClient) {}

  /** Fetch and store all market data */
  loadAllData(): Observable<MarketDataEntry[]> {
    const requests = {
      min15: this.http.get<MarketData[]>(`${this.apiUrl}/market-data/min15`),
      h1: this.http.get<MarketData[]>(`${this.apiUrl}/market-data/h1`),
      h4: this.http.get<MarketData[]>(`${this.apiUrl}/market-data/h4`),
    };

    return forkJoin(requests).pipe(
      map((result) => {
        // Map fetched data into the required format
        this.marketData = [
          { timeframe: TF.m15, data: result.min15 },
          { timeframe: TF.h1, data: result.h1 },
          { timeframe: TF.h4, data: result.h4 },
        ];

        // Update observable for subscribers
        this.dataSubject.next(this.marketData);

        return this.marketData;
      })
    );
  }

  /** Get market data by timeframe */
  getDataByTimeframe(tf: TF): MarketData[] {
    const entry = this.marketData.find((item) => item.timeframe === tf);
    return entry ? entry.data : [];
  }

  getDataByTimeframeAndType(tf: TF, type: string): MarketData | undefined {
    const entry = this.marketData.find((item) => item.timeframe === tf);
    const data = entry?.data.find((d) => d.type == type);
    return data ? data : undefined;
  }
}
