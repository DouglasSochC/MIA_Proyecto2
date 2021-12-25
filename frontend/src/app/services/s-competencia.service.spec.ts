import { TestBed } from '@angular/core/testing';

import { SCompetenciaService } from './s-competencia.service';

describe('SCompetenciaService', () => {
  let service: SCompetenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SCompetenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
