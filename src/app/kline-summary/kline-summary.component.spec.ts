import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlineSummaryComponent } from './kline-summary.component';

describe('KlineSummaryComponent', () => {
  let component: KlineSummaryComponent;
  let fixture: ComponentFixture<KlineSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KlineSummaryComponent]
    });
    fixture = TestBed.createComponent(KlineSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
