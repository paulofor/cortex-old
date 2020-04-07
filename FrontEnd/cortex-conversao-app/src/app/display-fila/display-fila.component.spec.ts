import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFilaComponent } from './display-fila.component';

describe('DisplayFilaComponent', () => {
  let component: DisplayFilaComponent;
  let fixture: ComponentFixture<DisplayFilaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayFilaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayFilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
