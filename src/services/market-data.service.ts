import { SnackbarService } from './snackbar.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { baseURL } from 'src/consts/urls';
import { TF } from 'src/models/shared/timeframes';
import { MarketData } from 'src/models/market-data';
import { MarketDataEntry } from 'src/models/market-data-entry';
import { db } from './dexie.service';

import { ResponseData } from 'src/models/response-data';
import { MarketSummaryEntry } from 'src/models/market-summary-entry';
import { RepoTypesService } from './repo-types.service';
import { RepoTypes } from 'src/models/repo-types';
import { time } from 'echarts';

@Injectable({
  providedIn: 'root',
})
export class MarketDataService {
  private apiUrl = baseURL;

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
    private repoTypesService: RepoTypesService
  ) {}

  /** Fetch and store all market data */
  loadAllData(): Observable<MarketDataEntry[]> {
    const requests = {
      m15: this.http.get<ResponseData>(`${this.apiUrl}/market-data/min15`),
      h1: this.http.get<ResponseData>(`${this.apiUrl}/market-data/h1`),
      h4: this.http.get<ResponseData>(`${this.apiUrl}/market-data/h4`),
    };

    return forkJoin(requests).pipe(
      map((result) => {
        const marketDataEntries: MarketDataEntry[] = Object.entries(result).map(
          ([_, data]) => ({
            id: undefined,
            timeframe: data.timeframe,
            data: data.marketData.map((entry) => ({
              id: entry.id ?? undefined,
              type: entry.type,
              title: entry.title,
              data: entry.data,
            })),
          })
        );

        const marketSummaryEntries: MarketSummaryEntry[] = Object.entries(
          result
        ).map(([_, data]) => ({
          id: undefined,
          timeframe: data.timeframe,
          data: data.marketSummary.map((summary) => ({
            type: summary.type,
            title: summary.title,
            data: summary.data,
          })),
        }));

        marketDataEntries.forEach((entry) => db.storeMarketData(entry));
        marketSummaryEntries.forEach((entry) => db.storeMarketSummary(entry));

        return marketDataEntries;
      })
    );
  }

  /** Get market summary by timeframe */
  getMarketSummaryByTimeframe(
    tf: TF
  ): Observable<MarketSummaryEntry | undefined> {
    return new Observable((observer) => {
      db.marketSummary
        .where('timeframe')
        .equals(tf)
        .first()
        .then((entry) => {
          if (entry) {
            observer.next({
              id: entry.id,
              timeframe: entry.timeframe,
              data: entry.data,
            });
          } else {
            observer.next(undefined);
          }
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  getMarketDataByTimeframe(tf: TF): Observable<MarketDataEntry | undefined> {
    return new Observable((observer) => {
      db.marketData
        .where('timeframe')
        .equals(tf)
        .first()
        .then((entry) => {
          if (entry) {
            observer.next({
              id: entry.id,
              timeframe: entry.timeframe,
              data: entry.data,
            });
          } else {
            observer.next(undefined);
          }
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  /** Get market data by timeframe and type */
  getMarketDataByTimeframeAndType(
    tf: TF,
    type: string
  ): Observable<MarketData | undefined> {
    return new Observable((observer) => {
      db.marketData
        .where('timeframe')
        .equals(tf)
        .first()
        .then((entry) => {
          if (entry) {
            const filteredData = entry.data.find((d) => d.type === type);
            observer.next(filteredData);
          } else {
            observer.next(undefined);
          }
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  /** Clear IndexedDB */
  clearDatabase(): Observable<void> {
    return new Observable((observer) => {
      Promise.all([db.marketData.clear(), db.marketSummary.clear()])
        .then(() => {
          console.log('✅ IndexedDB cleared');
          observer.next();
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  /** Fetch Market Data and clear existing DB before storing */
  // fetchMarketData(): Observable<MarketDataEntry[]> {
  //   return this.clearDatabase().pipe(switchMap(() => this.loadAllData()));
  // }
  fetchMarketData(
    forceRefresh: boolean = false
  ): Observable<MarketDataEntry[]> {
    return new Observable((observer) => {
      if (forceRefresh) {
        this.snackbarService.showSnackBar('🔄 Refreshing market data...');

        this.clearDatabase().subscribe({
          next: () => {
            this.loadAllData().subscribe({
              next: (data) => {
                this.snackbarService.showSnackBar(
                  '✅ Market data refreshed successfully!'
                );
                observer.next(data);
                observer.complete();
              },
              error: (error) => {
                this.snackbarService.showSnackBar(
                  '❌ Failed to refresh market data.'
                );
                observer.error(error);
              },
            });
          },
          error: (error) => {
            this.snackbarService.showSnackBar('❌ Error clearing database.');
            observer.error(error);
          },
        });

        return;
      }

      this.snackbarService.showSnackBar('📂 Loading market data...');

      db.marketData
        .count()
        .then((count) => {
          if (count > 0) {
            // Load from IndexedDB
            db.marketData
              .toArray()
              .then((entries) => {
                this.snackbarService.showSnackBar(
                  '✅ Loaded market data from IndexedDB.'
                );
                observer.next(entries);
                observer.complete();
              })
              .catch((error) => observer.error(error));
          } else {
            // Fetch from API
            this.loadAllData().subscribe({
              next: (data) => {
                this.snackbarService.showSnackBar(
                  '✅ Market data fetched from API.'
                );
                observer.next(data);
                observer.complete();
              },
              error: (error) => {
                this.snackbarService.showSnackBar(
                  '❌ Failed to fetch market data.'
                );
                observer.error(error);
              },
            });
          }
        })
        .catch((error) => observer.error(error));
    });
  }

  getFilteredMarketDataByTimeframe(
    timeframe: TF
  ): Observable<MarketDataEntry | undefined> {
    return new Observable((observer) => {
      db.marketData
        .where('timeframe')
        .equals(timeframe)
        .first()
        .then((entry) => {
          if (entry) {
            console.log(timeframe, entry);
            const allowedRepoTypes =
              this.repoTypesService.getRepoTypesForTimeframe(timeframe);
            console.log(timeframe, allowedRepoTypes);
            observer.next({
              id: entry.id,
              timeframe: entry.timeframe,
              data: entry.data.filter((d) => {
                const isValidType = Object.values(RepoTypes).includes(
                  d.type as RepoTypes
                );
                console.log(
                  `Checking Type: ${d.type} -> Valid: ${isValidType}`
                );
                return (
                  isValidType && allowedRepoTypes.includes(d.type as RepoTypes)
                );
              }),
            });
          } else {
            observer.next(undefined);
          }
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }
}
