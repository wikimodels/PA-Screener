import { Component, OnInit } from '@angular/core';

import { TF } from 'src/models/shared/timeframes';
import { MarketDataService } from 'src/services/market-data.service';
import { Subject, forkJoin, takeUntil, catchError, of } from 'rxjs';
import { MarketDataEntry } from 'src/models/market-data-entry';
import { RepoTypesService } from 'src/services/repo-types.service';

@Component({
  selector: 'app-market-data',
  templateUrl: './market-data.component.html',
  styleUrls: ['./market-data.component.css'],
})
export class MarketDataComponent implements OnInit {
  data15m!: MarketDataEntry | undefined;
  data1h!: MarketDataEntry | undefined;
  data4h!: MarketDataEntry | undefined;
  data8h!: MarketDataEntry | undefined;
  TF = TF;

  constructor(
    private marketDataService: MarketDataService,
    private repoTypesService: RepoTypesService
  ) {} // Use camelCase for service instance

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    forkJoin({
      m15: this.marketDataService.getMarketDataByTimeframe(TF.m15),
      h1: this.marketDataService.getMarketDataByTimeframe(TF.h1),
      h4: this.marketDataService.getMarketDataByTimeframe(TF.h4),
      h8: this.marketDataService.getMarketDataByTimeframe(TF.h8),
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
          this.data8h = results.h8;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
