import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketSummaryItemComponent } from './market-summary-item.component';

describe('MarketSummaryItemComponent', () => {
  let component: MarketSummaryItemComponent;
  let fixture: ComponentFixture<MarketSummaryItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarketSummaryItemComponent]
    });
    fixture = TestBed.createComponent(MarketSummaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
