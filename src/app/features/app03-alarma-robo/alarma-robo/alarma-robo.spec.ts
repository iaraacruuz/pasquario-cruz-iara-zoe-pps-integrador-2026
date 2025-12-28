import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmaRobo } from './alarma-robo';

describe('AlarmaRobo', () => {
  let component: AlarmaRobo;
  let fixture: ComponentFixture<AlarmaRobo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlarmaRobo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmaRobo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
