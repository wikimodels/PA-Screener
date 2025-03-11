import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlineDataComponent } from './kline-data.component';

describe('KlineDataComponent', () => {
  let component: KlineDataComponent;
  let fixture: ComponentFixture<KlineDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KlineDataComponent]
    });
    fixture = TestBed.createComponent(KlineDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
