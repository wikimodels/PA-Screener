import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { EChartsOption } from 'echarts';
import { MarketSummary } from 'src/models/market-summary';

@Component({
  selector: 'app-kline-summary-chart',
  templateUrl: './kline-summary-chart.component.html',
  styleUrls: ['./kline-summary-chart.component.css'],
})
export class KlineSummaryChartComponent implements OnInit, OnChanges {
  @Input() summary!: MarketSummary; // Ensure it's properly typed

  chartOptions: EChartsOption = {}; // Initialize an empty object

  ngOnInit(): void {
    if (this.summary?.data) {
      this.updateChartOptions();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['summary'] && this.summary?.data) {
      this.updateChartOptions();
    }
  }

  private updateChartOptions(): void {
    this.chartOptions = {
      title: {
        text: this.summary.title,
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        position: function (pt: any) {
          return [pt[0], '10%'];
        },
        axisPointer: { type: 'shadow' },
      },

      xAxis: {
        type: 'time', // ✅ Now using time-based X-axis

        axisLabel: {
          rotate: 90,
          formatter: (value: number) =>
            new Date(value).toLocaleString('ru-RU', {
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            }),
        },
      },
      yAxis: {
        type: 'value',
        name: 'Count',
        max: 300,
      },
      series: [
        {
          name: 'Count',
          type: 'bar',
          data: this.summary.data.map((d) => [
            new Date(d.openTime).getTime(), // ✅ Convert `openTime` to timestamp
            d.count,
          ]),
          barWidth: '40%',
          itemStyle: { color: '#007bff' },
        },
      ],
    };
  }
}
