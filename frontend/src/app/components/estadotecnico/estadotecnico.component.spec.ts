import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadotecnicoComponent } from './estadotecnico.component';

describe('EstadotecnicoComponent', () => {
  let component: EstadotecnicoComponent;
  let fixture: ComponentFixture<EstadotecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadotecnicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadotecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
