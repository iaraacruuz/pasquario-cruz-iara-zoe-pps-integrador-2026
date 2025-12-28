import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlGastos } from './control-gastos';

describe('ControlGastos', () => {
  let component: ControlGastos;
  let fixture: ComponentFixture<ControlGastos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlGastos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlGastos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
