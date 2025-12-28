import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaCredito } from './carga-credito';

describe('CargaCredito', () => {
  let component: CargaCredito;
  let fixture: ComponentFixture<CargaCredito>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargaCredito]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaCredito);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
