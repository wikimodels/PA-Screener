import { Component, OnInit } from '@angular/core';

import { TF } from 'src/models/shared/timeframes';
import { MarketDataService } from 'src/services/market-data.service';
import { Subject, forkJoin, takeUntil, catchError, of } from 'rxjs';
import { MarketDataEntry } from 'src/models/market-data-entry';

@Component({
  selector: 'app-market-data',
  templateUrl: './market-data.component.html',
  styleUrls: ['./market-data.component.css'],
})
export class MarketDataComponent implements OnInit {
  data15m!: MarketDataEntry | undefined;
  data1h!: MarketDataEntry | undefined;
  data2h!: MarketDataEntry | undefined;
  data4h!: MarketDataEntry | undefined;
  data8h!: MarketDataEntry | undefined;
  dataD!: MarketDataEntry | undefined;
  TF = TF;

  constructor(private marketDataService: MarketDataService) {} // Use camelCase for service instance

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    forkJoin({
      m15: this.marketDataService.getMarketDataByTimeframe(TF.m15),
      h1: this.marketDataService.getMarketDataByTimeframe(TF.h1),
      h2: this.marketDataService.getMarketDataByTimeframe(TF.h2),
      h4: this.marketDataService.getMarketDataByTimeframe(TF.h4),
      h8: this.marketDataService.getMarketDataByTimeframe(TF.h8),
      D: this.marketDataService.getMarketDataByTimeframe(TF.D),
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
          this.data2h = results.h2;
          this.data4h = results.h4;
          this.data8h = results.h8;
          this.dataD = results.D;
          console.log('Day', this.dataD);
          console.log('2h', this.data2h);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
