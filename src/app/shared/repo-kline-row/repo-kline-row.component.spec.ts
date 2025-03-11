import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoKlineRowComponent } from './repo-kline-row.component';

describe('RepoKlineRowComponent', () => {
  let component: RepoKlineRowComponent;
  let fixture: ComponentFixture<RepoKlineRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepoKlineRowComponent]
    });
    fixture = TestBed.createComponent(RepoKlineRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
