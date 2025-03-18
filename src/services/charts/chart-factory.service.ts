import { Injectable, Inject } from '@angular/core';
import { CHART_SERVICES } from 'src/consts/chart-services';
import { IChartOptionsService } from 'src/models/i-chart-options';

// chart-service.factory.ts
@Injectable({ providedIn: 'root' })
export class ChartFactoryService {
  private serviceMap = new Map<string, IChartOptionsService>();

  constructor(@Inject(CHART_SERVICES) services: IChartOptionsService[]) {
    console.log('Registered chart services:', services);
    services.forEach((service) => {
      console.log(`Registering chart type: ${service.chartType}`);
      this.serviceMap.set(service.chartType, service);
    });
  }

  getService(chartType: string): IChartOptionsService {
    const service = this.serviceMap.get(chartType);
    if (!service) throw new Error(`No service for ${chartType}`);
    return service;
  }
}
