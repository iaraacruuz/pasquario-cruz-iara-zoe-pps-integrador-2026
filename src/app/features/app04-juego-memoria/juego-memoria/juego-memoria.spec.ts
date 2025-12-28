import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoMemoria } from './juego-memoria';

describe('JuegoMemoria', () => {
  let component: JuegoMemoria;
  let fixture: ComponentFixture<JuegoMemoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegoMemoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoMemoria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
