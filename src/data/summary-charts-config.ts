import { ChartTypes } from 'src/models/chart-types';
import { RepoTypes } from 'src/models/repo-types';
import { TF } from 'src/models/shared/timeframes';

import { SummaryChartsConfig } from 'src/models/summary-charts-config';

/**
 * 👇 Chart configurations for different RepoTypes and timeframes.
 */
export const chartsConfig: SummaryChartsConfig[] = [
  // 🍀 EMA Fans: Compare Bullish, Bearish, and Mess fan counts
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
    chartType: ChartTypes.StackedLine,
    sliceNumber: 150,
  },

  // ⚙️ MA1 Falling vs. Rising vs. Fluctuate
  {
    timeframe: TF.m15,
    chartTitle: 'MA1 Falling vs. Rising vs. Fluctuate',
    colors: [
      '#2E7D32', // Deep forest green
      '#D32F2F', // Darker crimson
      '#FBC02D', // Golden yellow
    ],
    targetTypes: [
      { type: RepoTypes.Ma1Rising, title: 'Rising' },
      { type: RepoTypes.Ma1Falling, title: 'Falling' },
      { type: RepoTypes.Ma1Fluctuate, title: 'Fluctuate' },
    ],
    chartType: ChartTypes.StackedLine,
    sliceNumber: 151,
  },

  // 🐂 vs. 🐻 Candles
  {
    timeframe: TF.m15,
    chartTitle: 'Bullish Candles vs. Bearish Candles',
    colors: [
      '#2E7D32', // Deep forest green
      '#D32F2F', // Darker crimson
      // '#FBC02D', // Golden yellow (commented out)
    ],
    targetTypes: [
      { type: RepoTypes.IsBullishCandle, title: 'Bullish Candles' },
      { type: RepoTypes.IsBearishCandle, title: 'Bearish Bearish' },
    ],
    chartType: ChartTypes.StackedLine,
    sliceNumber: 151,
  },

  // 🌊 Daily VWAP Turns Up/Down
  {
    timeframe: TF.m15,
    chartTitle: 'Daily VWAP Ups/Downs',
    colors: [
      '#2E7D32', // Deep forest green
      '#D32F2F', // Darker crimson
    ],
    targetTypes: [
      { type: RepoTypes.VwapDailyTurnsUp, title: 'Turns Up' },
      { type: RepoTypes.VwapDailyTurnsDown, title: 'Turns Down' },
    ],
    chartType: ChartTypes.GroupedBars,
    sliceNumber: 150,
  },

  // ⏬ Daily VWAP Cross Up/Down
  {
    timeframe: TF.m15,
    chartTitle: 'Daily VWAP Cross Up/Down',
    colors: [
      '#2E7D32', // Deep forest green
      '#D32F2F', // Darker crimson
    ],
    targetTypes: [
      { type: RepoTypes.VwapDailyCrossUp, title: 'Cross Up' },
      { type: RepoTypes.VwapDailyCrossDown, title: 'Cross Down' },
    ],
    chartType: ChartTypes.GroupedBars,
    sliceNumber: 150,
  },

  // 🔀 MA1 Cross Up/Down
  {
    timeframe: TF.m15,
    chartTitle: 'MA1 Cross Up/Down',
    colors: [
      '#2E7D32', // Deep forest green
      '#D32F2F', // Darker crimson
    ],
    targetTypes: [
      { type: RepoTypes.Ma1CrossUp, title: 'Cross Up' },
      { type: RepoTypes.Ma1CrossDown, title: 'Cross Down' },
    ],
    chartType: ChartTypes.GroupedBars,
    sliceNumber: 150,
  },

  // ↕️ MA1 Turns Up/Down
  {
    timeframe: TF.m15,
    chartTitle: 'MA1 Turns Up/Down',
    colors: [
      '#2E7D32', // Deep forest green
      '#D32F2F', // Darker crimson
    ],
    targetTypes: [
      { type: RepoTypes.Ma1TurnsUp, title: 'Turns Up' },
      { type: RepoTypes.Ma1TurnsDown, title: 'Turns Down' },
    ],
    chartType: ChartTypes.GroupedBars,
    sliceNumber: 150,
  },
];
