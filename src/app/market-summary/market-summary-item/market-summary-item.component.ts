import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TF } from 'src/models/shared/timeframes';

@Component({
  selector: 'app-market-summary-item',
  templateUrl: './market-summary-item.component.html',
  styleUrls: ['./market-summary-item.component.css'],
})
export class MarketSummaryItemComponent {
  @Input() timeframe!: string;

  constructor(private router: Router) {}

  onShowData(timeframe: string) {
    // 1. Create the URL using Angular's router
    // const urlTree = this.router.createUrlTree([
    //   '/kline-summary',
    //   encodeURIComponent(timeframe),
    // ]);

    // 2. Serialize the URL tree to a string
    //const url = this.router.serializeUrl(urlTree);
    this.router.navigate(['/kline-summary', encodeURIComponent(timeframe)]);
    // 3. Open in new tab
    //window.open(url, '_blank');
  }
}
