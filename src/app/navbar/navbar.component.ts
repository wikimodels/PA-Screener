import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MARKET_DATA, MARKET_SUMMARY } from 'src/consts/urls';
import { MarketDataService } from 'src/services/market-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private marketDataService: MarketDataService
  ) {}
  onGoToMarketData() {
    this.router.navigate([MARKET_DATA]);
  }
  onDataRefresh() {
    this.marketDataService.fetchMarketData(true).subscribe();
  }

  onGoToMarketSummary() {
    this.router.navigate([MARKET_SUMMARY]);
  }
}
