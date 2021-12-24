import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadopartidoComponent } from './estadopartido.component';

describe('EstadopartidoComponent', () => {
  let component: EstadopartidoComponent;
  let fixture: ComponentFixture<EstadopartidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadopartidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadopartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
