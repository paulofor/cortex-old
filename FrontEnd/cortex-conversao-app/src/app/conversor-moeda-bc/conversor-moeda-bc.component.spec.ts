import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversorMoedaBcComponent } from './conversor-moeda-bc.component';

describe('ConversorMoedaBcComponent', () => {
  let component: ConversorMoedaBcComponent;
  let fixture: ComponentFixture<ConversorMoedaBcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversorMoedaBcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversorMoedaBcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
