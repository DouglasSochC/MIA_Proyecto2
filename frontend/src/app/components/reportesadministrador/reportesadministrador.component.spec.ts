import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesadministradorComponent } from './reportesadministrador.component';

describe('ReportesadministradorComponent', () => {
  let component: ReportesadministradorComponent;
  let fixture: ComponentFixture<ReportesadministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesadministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesadministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
