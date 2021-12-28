import { TestBed } from '@angular/core/testing';

import { SReporteadministradorService } from './s-reporteadministrador.service';

describe('SReporteadministradorService', () => {
  let service: SReporteadministradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SReporteadministradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
