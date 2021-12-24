import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaestadisticaComponent } from './consultaestadistica.component';

describe('ConsultaestadisticaComponent', () => {
  let component: ConsultaestadisticaComponent;
  let fixture: ComponentFixture<ConsultaestadisticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaestadisticaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaestadisticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
