import { Component } from '@angular/core';

import { TF } from 'src/models/shared/timeframes';

@Component({
  selector: 'app-market-summary',
  templateUrl: './market-summary.component.html',
  styleUrls: ['./market-summary.component.css'],
})
export class MarketSummaryComponent {
  TF = TF;
  constructor() {} // Use camelCase for service instance
}
