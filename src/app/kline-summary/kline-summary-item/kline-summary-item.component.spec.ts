import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlineSummaryItemComponent } from './kline-summary-item.component';

describe('KlineSummaryItemComponent', () => {
  let component: KlineSummaryItemComponent;
  let fixture: ComponentFixture<KlineSummaryItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KlineSummaryItemComponent]
    });
    fixture = TestBed.createComponent(KlineSummaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
