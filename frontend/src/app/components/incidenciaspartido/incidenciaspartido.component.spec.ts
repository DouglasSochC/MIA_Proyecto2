import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenciaspartidoComponent } from './incidenciaspartido.component';

describe('IncidenciaspartidoComponent', () => {
  let component: IncidenciaspartidoComponent;
  let fixture: ComponentFixture<IncidenciaspartidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidenciaspartidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidenciaspartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
