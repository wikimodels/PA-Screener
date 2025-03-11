import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KLINE_DATA, MARKET_DATA } from 'src/consts/urls';
import { MarketDataComponent } from './market-data/market-data.component';
import { KlineDataComponent } from './kline-data/kline-data.component';

const routes: Routes = [
  { path: '', component: MarketDataComponent },
  { path: MARKET_DATA, component: MarketDataComponent },
  { path: 'kline-data/:type/:title/:timeframe', component: KlineDataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
