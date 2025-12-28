import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDidactica } from './tabla-didactica';

describe('TablaDidactica', () => {
  let component: TablaDidactica;
  let fixture: ComponentFixture<TablaDidactica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaDidactica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaDidactica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
