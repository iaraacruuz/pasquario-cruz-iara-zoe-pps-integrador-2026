import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoKinetico } from './juego-kinetico';

describe('JuegoKinetico', () => {
  let component: JuegoKinetico;
  let fixture: ComponentFixture<JuegoKinetico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegoKinetico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoKinetico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
