import { Subscription, takeUntil } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketSummaryEntry } from 'src/models/market-summary-entry';
import { TF } from 'src/models/shared/timeframes';
import { MarketDataService } from 'src/services/market-data.service';

@Component({
  selector: 'app-kline-summary',
  templateUrl: './kline-summary.component.html',
  styleUrls: ['./kline-summary.component.css'],
})
export class KlineSummaryComponent implements OnDestroy {
  timeframe!: TF;
  marketSummaryEntry!: MarketSummaryEntry | undefined;
  subscription = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private marketDataService: MarketDataService
  ) {}
  ngOnInit() {
    this.timeframe = decodeURIComponent(
      this.route.snapshot.paramMap.get('timeframe')!
    ) as TF;
    this.subscription.add(
      this.marketDataService
        .getMarketSummaryByTimeframe(this.timeframe)
        .subscribe((data) => {
          this.marketSummaryEntry = data;
          console.log('KlineSummary', data);
        })
    );
    console.log(this.timeframe);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
