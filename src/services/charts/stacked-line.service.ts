import { Injectable } from '@angular/core';
import { EChartsOption, TooltipComponentOption } from 'echarts';
import { Observable, from, map } from 'rxjs';
import { IChartOptionsService } from 'src/models/i-chart-options';
import { MarketSummaryEntry } from 'src/models/market-summary-entry';
import { TF } from 'src/models/shared/timeframes';
import { SummaryChartsConfig } from 'src/models/summary-charts-config';
import { db } from '../dexie.service';
import { ProcessedData } from 'src/models/processed-data';
import { ChartTypes } from 'src/models/chart-types';
import { TooltipOption } from 'echarts/types/dist/shared';

@Injectable({ providedIn: 'root' })
export class StackedLineService implements IChartOptionsService {
  readonly chartType = ChartTypes.StackedLine;
  private defaultColor = '#1890ff';

  constructor() {}

  generateOptions(config: SummaryChartsConfig): Observable<EChartsOption> {
    return this.fetchData(config.timeframe).pipe(
      map((entries) => this.processData(entries, config)),
      map((processedData) => this.createChartConfig(processedData, config))
    );
  }

  private fetchData(timeframe: TF): Observable<MarketSummaryEntry[]> {
    return from(
      db.marketSummary.where('timeframe').equals(timeframe).toArray()
    );
  }

  private processData(
    entries: MarketSummaryEntry[],
    config: SummaryChartsConfig
  ): ProcessedData {
    // Combined data keyed by openTime; each key will have counts for each type.
    const combinedData: Record<
      number,
      { openTime: number } & Record<string, number>
    > = {};

    // 1. Collect, deduplicate, and sort all open times
    const allOpenTimes: number[] = Array.from(
      new Set(
        entries.flatMap((entry) =>
          entry.data.flatMap(({ data }) => data.map(({ openTime }) => openTime))
        )
      )
    ).sort((a, b) => a - b);

    // 2. Calculate slice index and truncate the array
    const startIndex = Math.max(0, config.sliceNumber);
    const truncatedOpenTimes = allOpenTimes.slice(startIndex);
    const truncatedTimesSet = new Set(truncatedOpenTimes);

    // 3. Process only truncated data
    entries.forEach((entry) => {
      entry.data.forEach(({ type, data }) => {
        // Only process if the type is in the target list
        if (!config.targetTypes.some((t) => t.type === type)) return;

        data.forEach(({ openTime, count }) => {
          if (!truncatedTimesSet.has(openTime)) return;
          if (!combinedData[openTime]) {
            combinedData[openTime] = {
              openTime,
              ...Object.fromEntries(config.targetTypes.map((t) => [t.type, 0])),
            };
          }
          combinedData[openTime][type] = count;
        });
      });
    });

    // 4. Sort final data chronologically
    const sortedData = Object.values(combinedData).sort(
      (a, b) => a.openTime - b.openTime
    );

    // 5. Prepare categories and series data
    const categories = sortedData.map((item) =>
      this.formatTimestamp(item.openTime)
    );

    const seriesData = config.targetTypes.map((target, idx) => ({
      name: target.title,
      data: sortedData.map((item) => item[target.type] || 0),
      color: config.colors[idx] || this.defaultColor,
    }));

    return { categories, seriesData };
  }

  private createChartConfig(
    data: ProcessedData,
    config: SummaryChartsConfig
  ): EChartsOption {
    return {
      title: this.getTitleConfig(config),
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: this.getLegendConfig(config),
      grid: this.getGridConfig(),
      xAxis: this.getXAxisConfig(data.categories),
      yAxis: { type: 'value' },
      series: data.seriesData.map((series) => this.getSeriesConfig(series)),
    };
  }

  // Helper methods for chart configuration

  private getTitleConfig(config: SummaryChartsConfig) {
    return {
      text: `${config.chartTitle} ${config.timeframe}`,
      left: 'left' as const,
      top: 10,
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold' as const,
      },
    };
  }

  private getLegendConfig(config: SummaryChartsConfig) {
    return {
      data: config.targetTypes.map((t) => t.title),
      right: 40,
      top: 15,
      orient: 'horizontal' as const,
      padding: [40, 0, 0, 0],
      itemGap: 20,
      textStyle: {
        fontSize: 12,
      },
    };
  }

  private formatTimestamp(openTime: number): string {
    return new Date(openTime)
      .toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      .replace(',', '');
  }

  private getGridConfig() {
    return {
      left: '3%',
      right: '4%',
      top: '20%',
      bottom: '3%',
      containLabel: true,
    };
  }

  private getXAxisConfig(categories: string[]) {
    return {
      type: 'category' as const,
      data: categories,
      axisLabel: {
        rotate: 0,
        interval: (index: number) => index % 15 === 0,
      },
      axisTick: {
        alignWithLabel: true,
      },
    };
  }

  private getSeriesConfig(series: {
    name: string;
    data: number[];
    color: string;
  }) {
    return {
      name: series.name,
      stack: 'Total',
      type: 'line' as const,
      areaStyle: {
        opacity: 0.6,
        color: series.color,
      },
      itemStyle: {
        color: series.color,
      },
      emphasis: {
        focus: 'series' as const,
        shadowBlur: 10,
      },
      data: series.data,
      smooth: true,
      showSymbol: false,
    };
  }
}
