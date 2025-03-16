import { CoinLinksService } from 'src/services/coin-links.service';
import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketData } from 'src/models/market-data';
import { TF } from 'src/models/shared/timeframes';
import { MarketDataService } from 'src/services/market-data.service';
import { MARKET_DATA } from 'src/consts/urls';
import { WorkSelectionService } from 'src/services/work.selection.service';
import { RepoItem } from 'src/models/repo';

@Component({
  selector: 'app-kline-data',
  templateUrl: './kline-data.component.html',
  styleUrls: ['./kline-data.component.css'],
})
export class KlineDataComponent implements OnDestroy {
  type!: string;
  title!: string;
  timeframe!: TF;
  marketData!: MarketData | undefined;
  subscription = new Subscription();
  private openedWindows: Window[] = [];

  constructor(
    private route: ActivatedRoute,
    private coinsLinksService: CoinLinksService,
    private marketDataService: MarketDataService,
    public selectionService: WorkSelectionService<any>
  ) {}

  ngOnInit() {
    this.type = decodeURIComponent(this.route.snapshot.paramMap.get('type')!);
    this.title = decodeURIComponent(this.route.snapshot.paramMap.get('title')!);
    this.timeframe = decodeURIComponent(
      this.route.snapshot.paramMap.get('timeframe')!
    ) as TF;
    this.subscription.add(
      this.marketDataService
        .getMarketDataByTimeframeAndType(this.timeframe, this.type)
        .subscribe({
          next: (data) => {
            this.marketData = data;
            console.log(
              'timeframe',
              this.timeframe,
              'type',
              this.type,
              'title',
              this.title
            );
            console.log('MarketData', this.marketData);
          },
          error: (err) => {
            console.error('Error fetching data:', err);
            this.marketData = undefined;
          },
        })
    );
    this.selectionService.clear();
  }
  onHeaderClick() {
    //this.router.navigate([MARKET_DATA]);
    console.log(this.selectionService.selectedValues());
  }

  toggleAll(): void {
    this.selectionService.clear();
  }

  isAllSelected(): boolean {
    return false;
    // return this.selectionService.isAllSelected(this.items);
  }

  onOpenTradingview(): void {
    this.openWindowsFromSelection();
  }

  private openWindowsFromSelection(): void {
    this.selectionService.selectedValues().forEach((v: any, index: number) => {
      setTimeout(() => {
        const newWindow = window.open(
          this.coinsLinksService.tradingViewLink(v.symbol, v.exchanges),
          '_blank'
        );
        if (newWindow) this.openedWindows.push(newWindow);
      }, index * 1500);
    });
  }

  onCloseAllWindows(): void {
    this.openedWindows.forEach((win) => win.close());
    this.openedWindows = [];
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
