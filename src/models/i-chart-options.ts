import { EChartsOption } from 'echarts';
import { Observable } from 'rxjs';
import { SummaryChartsConfig } from './summary-charts-config';

export interface IChartOptionsService {
  readonly chartType: string; // Add this property
  generateOptions(config: SummaryChartsConfig): Observable<EChartsOption>;
}
