import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { SummaryChartsConfig } from 'src/models/summary-charts-config';
import { ChartFactoryService } from 'src/services/charts/chart-factory.service';

@Component({
  selector: 'app-kline-summary-chart',
  templateUrl: './kline-summary-chart.component.html',
  styleUrls: ['./kline-summary-chart.component.css'],
})
export class KlineSummaryChartComponent implements OnInit {
  @Input() config!: SummaryChartsConfig;
  chartOptions?: EChartsOption;

  constructor(private chartFactory: ChartFactoryService) {}

  ngOnInit(): void {
    this.initializeChart();
  }

  private initializeChart(): void {
    try {
      // Get the correct service based on config.chartType
      const chartService = this.chartFactory.getService(this.config.chartType);

      chartService.generateOptions(this.config).subscribe({
        next: (options) => (this.chartOptions = options),
        error: (err) => console.error('Chart error:', err),
      });
    } catch (error) {
      console.error('Service initialization failed:', error);
    }
  }
}
