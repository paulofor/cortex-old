import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCacheComponent } from './display-cache.component';

describe('DisplayCacheComponent', () => {
  let component: DisplayCacheComponent;
  let fixture: ComponentFixture<DisplayCacheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayCacheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
