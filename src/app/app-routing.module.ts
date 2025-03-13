import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MARKET_DATA, MARKET_SUMMARY } from 'src/consts/urls';
import { MarketDataComponent } from './market-data/market-data.component';
import { KlineDataComponent } from './kline-data/kline-data.component';
import { MarketSummaryComponent } from './market-summary/market-summary.component';
import { KlineSummaryComponent } from './kline-summary/kline-summary.component';

const routes: Routes = [
  { path: '', component: MarketDataComponent },
  { path: MARKET_DATA, component: MarketDataComponent },
  { path: MARKET_SUMMARY, component: MarketSummaryComponent },
  { path: 'kline-data/:type/:title/:timeframe', component: KlineDataComponent },
  { path: 'kline-summary/:timeframe', component: KlineSummaryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
