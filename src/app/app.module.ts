import { CanvasRenderer } from 'echarts/renderers';

import * as echarts from 'echarts/core';
import Marcaron from './marcaron';
import { BarChart, CandlestickChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  LegendComponent,
  ToolboxComponent,
} from 'echarts/components';

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

import { KlineSummaryChartComponent } from './kline-summary/kline-summary-chart/kline-summary-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { CHART_SERVICES } from 'src/consts/chart-services';
import { StackedBarsService } from 'src/services/charts/stacked-bars.service';
import { GroupedBarsService } from 'src/services/charts/grouped-bars.service';
import { StackedLineService } from 'src/services/charts/stacked-line.service';

echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  BarChart,
  CandlestickChart,
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  ToolboxComponent,
]);
echarts.registerTheme('macarons', Marcaron);

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
    KlineSummaryChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({ echarts }),
  ],
  providers: [
    {
      provide: CHART_SERVICES,
      useClass: StackedBarsService, // Your concrete service
      multi: true, // Allows multiple registrations
    },
    {
      provide: CHART_SERVICES,
      useClass: GroupedBarsService, // Your concrete service
      multi: true, // Allows multiple registrations
    },
    {
      provide: CHART_SERVICES,
      useClass: StackedLineService, // Your concrete service
      multi: true, // Allows multiple registrations
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
