import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlineSummaryTableComponent } from './kline-summary-table.component';

describe('KlineSummaryTableComponent', () => {
  let component: KlineSummaryTableComponent;
  let fixture: ComponentFixture<KlineSummaryTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KlineSummaryTableComponent]
    });
    fixture = TestBed.createComponent(KlineSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
