import { Component, Input } from '@angular/core';
import { MarketData } from 'src/models/market-data';
import { TF } from 'src/models/shared/timeframes';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent {
  @Input() data: MarketData[] | undefined = [];
  @Input() timeframe!: TF;

  get header(): string {
    const headersMap: Partial<Record<TF, string>> = {
      [TF.m15]: 'Timeframe 15min',
      [TF.h1]: 'Timeframe 1h',
      [TF.h4]: 'Timeframe 4h',
      [TF.h8]: 'Timeframe 8h',
    };
    return headersMap[this.timeframe] || 'Unknown Timeframe';
  }
}
