import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FRACTAL_CHAOS, MARKET_DATA } from 'src/consts/urls';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {}
  onGoToMarketData() {
    this.router.navigate([MARKET_DATA]);
  }
}
