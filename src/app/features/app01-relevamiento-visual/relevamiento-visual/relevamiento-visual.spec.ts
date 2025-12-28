import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelevamientoVisual } from './relevamiento-visual';

describe('RelevamientoVisual', () => {
  let component: RelevamientoVisual;
  let fixture: ComponentFixture<RelevamientoVisual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelevamientoVisual]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelevamientoVisual);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
