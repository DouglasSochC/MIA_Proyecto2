import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadojugadorComponent } from './estadojugador.component';

describe('EstadojugadorComponent', () => {
  let component: EstadojugadorComponent;
  let fixture: ComponentFixture<EstadojugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadojugadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadojugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
