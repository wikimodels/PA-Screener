import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { MarketDataService } from 'src/services/market-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'PA-Screener';
  constructor(
    private marketDataService: MarketDataService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.marketDataService.fetchMarketData().subscribe((data) => {
      console.log('All data loaded');
    });

    this.registerIcons();
  }
  registerIcons(): void {
    const icons: { name: string; url: string }[] = [
      { name: 'bingx-sf', url: 'assets/icons/bingx-sf.svg' },
      { name: 'bingx-pf', url: 'assets/icons/bingx-pf.svg' },
      { name: 'sorter', url: 'assets/icons/sorter.svg' },
      { name: 'play', url: 'assets/icons/play.svg' },
      { name: 'pause', url: 'assets/icons/pause.svg' },
      { name: 'ws', url: 'assets/icons/ws.svg' },
      { name: 'websocket', url: 'assets/icons/websocket.svg' },
      { name: 'check', url: 'assets/icons/check.svg' },
      { name: 'close', url: 'assets/icons/close.svg' },
      { name: 'alarm', url: 'assets/icons/alarm.svg' },
      { name: 'triggered-alarm', url: 'assets/icons/triggered-alarm.svg' },
      { name: 'tv-white', url: 'assets/icons/tv-white.svg' },
      { name: 'bybit', url: 'assets/icons/bybit.svg' },
      { name: 'tv', url: 'assets/icons/tv.svg' },
      { name: 'binance', url: 'assets/icons/binance-black.svg' },
      { name: 'mintmark', url: 'assets/icons/mintmark.svg' },
      { name: 'admin', url: 'assets/icons/admin.svg' },
      { name: 'send-to', url: 'assets/icons/send-to.svg' },
      { name: 'black-list', url: 'assets/icons/black-list.svg' },
      { name: 'send-from', url: 'assets/icons/send-from.svg' },
      { name: 'coin-sorter', url: 'assets/icons/coin-sorter.svg' },
      { name: 'coinglass', url: 'assets/icons/coinglass.svg' },
      { name: 'edit', url: 'assets/icons/edit.svg' },
      { name: 'long-list', url: 'assets/icons/long-list.svg' },
      { name: 'delete', url: 'assets/icons/delete.svg' },
      { name: 'delete-gray', url: 'assets/icons/delete-gray.svg' },
      { name: 'magic', url: 'assets/icons/magic.svg' },
      { name: 'bitcoin', url: 'assets/icons/bitcoin.svg' },
      { name: 'info', url: 'assets/icons/info.svg' },
      { name: 'flare', url: 'assets/icons/flare.svg' },
      { name: '_arrow_forward', url: 'assets/icons/arrow-forward.svg' },
      { name: '_arrow_back', url: 'assets/icons/arrow-back.svg' },
      { name: 'twitter', url: 'assets/icons/twitter.svg' },
      { name: 'reddit', url: 'assets/icons/reddit.svg' },
      { name: 'telegram', url: 'assets/icons/telegram.svg' },
      { name: 'github', url: 'assets/icons/github.svg' },
      { name: 'facebook', url: 'assets/icons/facebook.svg' },
      { name: 'cmc', url: 'assets/icons/cmp.svg' },
      { name: 'add', url: 'assets/icons/add.svg' },
      // Add more icons here
    ];

    icons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.url)
      );
    });
  }
}
