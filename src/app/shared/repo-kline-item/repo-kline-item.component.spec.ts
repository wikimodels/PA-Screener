import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoKlineItemComponent } from './repo-kline-item.component';

describe('RepoKlineItemComponent', () => {
  let component: RepoKlineItemComponent;
  let fixture: ComponentFixture<RepoKlineItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepoKlineItemComponent]
    });
    fixture = TestBed.createComponent(RepoKlineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
