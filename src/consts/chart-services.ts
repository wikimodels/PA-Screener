import { InjectionToken } from '@angular/core';
import { IChartOptionsService } from 'src/models/i-chart-options';

export const CHART_SERVICES = new InjectionToken<IChartOptionsService[]>(
  'CHART_SERVICES'
);
