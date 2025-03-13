import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './material.module';
import { NavbarComponent } from './navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';

import { RepoKlineItemComponent } from './shared/repo-kline-item/repo-kline-item.component';
import { RepoKlineRowComponent } from './shared/repo-kline-row/repo-kline-row.component';
import { PanelComponent } from './shared/panel/panel.component';
import { MarketDataComponent } from './market-data/market-data.component';
import { MarketDataItemComponent } from './market-data/market-data-item/market-data-item.component';
import { KlineDataComponent } from './kline-data/kline-data.component';
import { MarketSummaryItemComponent } from './market-summary/market-summary-item/market-summary-item.component';
import { MarketSummaryComponent } from './market-summary/market-summary.component';
import { KlineSummaryComponent } from './kline-summary/kline-summary.component';
import { KlineSummaryItemComponent } from './kline-summary/kline-summary-item/kline-summary-item.component';
import { KlineSummaryTableComponent } from './kline-summary/kline-summary-table/kline-summary-table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RepoKlineItemComponent,
    RepoKlineRowComponent,
    PanelComponent,
    MarketDataComponent,
    MarketDataItemComponent,
    KlineDataComponent,
    MarketSummaryItemComponent,
    MarketSummaryComponent,
    KlineSummaryComponent,
    KlineSummaryItemComponent,
    KlineSummaryTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
