import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketSummaryComponent } from './market-summary.component';

describe('MarketDataComponent', () => {
  let component: MarketSummaryComponent;
  let fixture: ComponentFixture<MarketSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketSummaryComponent],
    });
    fixture = TestBed.createComponent(MarketSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
