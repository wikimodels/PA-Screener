import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TF } from 'src/models/shared/timeframes';
import { MarketDataService } from './market-data.service';
import { ReportType } from 'src/models/report-type';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarketSummaryService {
  private subscriptions: Subscription[] = [];
  isBullishFan: any;
  isBearishFan: any;
  isMessFan: any;

  constructor(private marketDataService: MarketDataService) {}

  getEmaStats(timeframe: TF) {
    // Clear previous subscriptions
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = [];

    // Fetch all data in a single request if possible
    const bullishFan$ = this.marketDataService.getMarketDataByTimeframeAndType(
      timeframe,
      ReportType.IsBullishFan
    );
    const bearishFan$ = this.marketDataService.getMarketDataByTimeframeAndType(
      timeframe,
      ReportType.IsBearishCandle
    );
    const messFan$ = this.marketDataService.getMarketDataByTimeframeAndType(
      timeframe,
      ReportType.IsMessFan
    );

    // Subscribe to each observable
    this.subscriptions.push(
      bullishFan$.subscribe((data) => (this.isBullishFan = data)),
      bearishFan$.subscribe((data) => (this.isBearishFan = data)),
      messFan$.subscribe((data) => (this.isMessFan = data))
    );
  }

  ngOnDestroy() {
    // Unsubscribe from all active subscriptions
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
