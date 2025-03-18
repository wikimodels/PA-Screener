import { ChartTypes } from 'src/models/chart-types';
import { RepoTypes } from 'src/models/repo-types';
import { TF } from 'src/models/shared/timeframes';

import { SummaryChartsConfig } from 'src/models/summary-charts-config';

export const chartsConfig: SummaryChartsConfig[] = [
  {
    timeframe: TF.m15,
    chartTitle: 'EMA Fans',
    colors: [
      '#2E7D32', // Deep forest green
      '#D32F2F', // Darker crimson
      '#FBC02D', // Golden yellow
    ],
    targetTypes: [
      { type: RepoTypes.IsBullishFan, title: 'Bullish Fan' },
      { type: RepoTypes.IsBearishFan, title: 'Bearish Fan' },
      { type: RepoTypes.IsMessFan, title: 'Mess Fan' },
    ],
    chartType: ChartTypes.StackedBars,
    sliceNumber: 151,
  },
  {
    timeframe: TF.m15,
    chartTitle: 'Bullish Candles vs. Bearish Candles',
    colors: [
      '#2E7D32', // Deep forest green
      '#D32F2F', // Darker crimson
      //'#FBC02D', // Golden yellow
    ],
    targetTypes: [
      { type: RepoTypes.IsBullishCandle, title: 'Bullish Candles' },
      { type: RepoTypes.IsBearishCandle, title: 'Bearish Bearish' },
    ],
    chartType: ChartTypes.StackedBars,
    sliceNumber: 151,
  },

  {
    timeframe: TF.m15,
    chartTitle: 'Daily VWAP',
    colors: [
      '#2E7D32', // Deep forest green
      '#D32F2F', // Darker crimson
      '#FBC02D', // Golden yellow
    ],
    targetTypes: [
      { type: RepoTypes.VwapDailyRising, title: 'Rising' },
      { type: RepoTypes.VwapDailyFalling, title: 'Falling' },
      { type: RepoTypes.VwapDailyFluctuate, title: 'Fluctuate' },
    ],
    chartType: ChartTypes.StackedBars,
    sliceNumber: 151,
  },
];
