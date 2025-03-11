import { Component } from '@angular/core';
import { MarketData } from 'src/models/market-data';

import { ReportType } from 'src/models/report-type';
import { TF } from 'src/models/shared/timeframes';
import { MarketDataService } from 'src/services/market-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'PA-Screener';
  constructor(private marketDataService: MarketDataService) {}

  ngOnInit(): void {
    this.marketDataService.loadAllData().subscribe(() => {
      console.log('All market data loaded!');
      const data: MarketData[] = this.marketDataService.getDataByTimeframe(
        TF.h1
      );

      console.log(data.find((d) => d.type == ReportType.IsBullishFan));
    });
  }
}
