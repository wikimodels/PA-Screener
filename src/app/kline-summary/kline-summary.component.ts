import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TF } from 'src/models/shared/timeframes';
import { chartsConfig } from 'src/data/summary-charts-config';
import { SummaryChartsConfig } from 'src/models/summary-charts-config';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kline-summary',
  templateUrl: './kline-summary.component.html',
  styleUrls: ['./kline-summary.component.css'],
})
export class KlineSummaryComponent implements OnDestroy {
  configs!: SummaryChartsConfig[];
  timeframe!: TF;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.timeframe = decodeURIComponent(
      this.route.snapshot.paramMap.get('timeframe')!
    ) as TF;
    this.configs = chartsConfig.filter((c) => c.timeframe == this.timeframe);

    console.log(this.configs);
  }
  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.configs, event.previousIndex, event.currentIndex);
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }
  ngOnDestroy(): void {}
}
