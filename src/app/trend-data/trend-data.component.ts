import { MarketData } from 'src/models/market-data';
import { Component, OnInit } from '@angular/core';

import { TF } from 'src/models/shared/timeframes';
import { MarketDataService } from 'src/services/market-data.service';
import { Subject, forkJoin, takeUntil, catchError, of } from 'rxjs';
import { MarketDataEntry } from 'src/models/market-data-entry';

@Component({
  selector: 'app-trend-data',
  templateUrl: './trend-data.component.html',
  styleUrls: ['./trend-data.component.css'],
})
export class TrendDataComponent implements OnInit {
  data15m!: MarketDataEntry | undefined;
  data1h!: MarketDataEntry | undefined;
  data4h!: MarketDataEntry | undefined;
  TF = TF;

  constructor(private marketDataService: MarketDataService) {} // Use camelCase for service instance

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    forkJoin({
      m15: this.marketDataService.getMarketDataByTimeframe(TF.m15),
      h1: this.marketDataService.getMarketDataByTimeframe(TF.h1),
      h4: this.marketDataService.getMarketDataByTimeframe(TF.h4),
    })
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          console.error('Data loading error:', error);
          return of(null);
        })
      )
      .subscribe((results) => {
        if (results) {
          this.data15m = results.m15;
          this.data1h = results.h1;
          this.data4h = results.h4;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
