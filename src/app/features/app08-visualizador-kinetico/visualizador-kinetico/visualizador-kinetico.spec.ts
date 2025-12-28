import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizadorKinetico } from './visualizador-kinetico';

describe('VisualizadorKinetico', () => {
  let component: VisualizadorKinetico;
  let fixture: ComponentFixture<VisualizadorKinetico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizadorKinetico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizadorKinetico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
