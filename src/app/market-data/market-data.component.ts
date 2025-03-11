import { MarketData } from 'src/models/market-data';
import { Component, OnInit } from '@angular/core';

import { TF } from 'src/models/shared/timeframes';
import { MarketDataService } from 'src/services/market-data.service';

@Component({
  selector: 'app-market-data',
  templateUrl: './market-data.component.html',
  styleUrls: ['./market-data.component.css'],
})
export class MarketDataComponent implements OnInit {
  data15m!: MarketData[];
  data1h!: MarketData[];
  data4h!: MarketData[];
  TF = TF;

  constructor(private marketDataService: MarketDataService) {} // Use camelCase for service instance

  ngOnInit(): void {
    // Fetch and subscribe to market data
    this.data15m = this.marketDataService.getDataByTimeframe(TF.m15);
    this.data1h = this.marketDataService.getDataByTimeframe(TF.h1);
    this.data4h = this.marketDataService.getDataByTimeframe(TF.h4);
  }
}
