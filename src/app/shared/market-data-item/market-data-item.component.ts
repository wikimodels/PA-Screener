import { MarketData } from 'src/models/market-data';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TF } from 'src/models/shared/timeframes';
import { KLINE_DATA } from 'src/consts/urls';

@Component({
  selector: 'app-market-data-item',
  templateUrl: './market-data-item.component.html',
  styleUrls: ['./market-data-item.component.css'],
})
export class MarketDataItemComponent {
  @Input() item!: MarketData;
  @Input() timeframe!: TF;

  constructor(private router: Router) {}

  onShowData(item: MarketData, timeframe: TF) {
    this.router.navigate([
      '/kline-data',
      encodeURIComponent(item.type),
      encodeURIComponent(item.title),
      encodeURIComponent(timeframe),
    ]);
  }
}
