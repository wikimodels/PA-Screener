import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketData } from 'src/models/market-data';
import { TF } from 'src/models/shared/timeframes';
import { MarketDataService } from 'src/services/market-data.service';

@Component({
  selector: 'app-kline-data',
  templateUrl: './kline-data.component.html',
  styleUrls: ['./kline-data.component.css'],
})
export class KlineDataComponent {
  type!: string;
  title!: string;
  timeframe!: TF;
  marketData!: MarketData | undefined;
  constructor(
    private route: ActivatedRoute,
    private marketDataService: MarketDataService
  ) {}

  ngOnInit() {
    this.type = decodeURIComponent(this.route.snapshot.paramMap.get('type')!);
    this.title = decodeURIComponent(this.route.snapshot.paramMap.get('title')!);
    this.timeframe = decodeURIComponent(
      this.route.snapshot.paramMap.get('timeframe')!
    ) as TF;

    this.marketData = this.marketDataService.getDataByTimeframeAndType(
      this.timeframe,
      this.type
    );
    console.log(this.marketData);
    console.log(this.type, this.title, this.timeframe);
  }
}
