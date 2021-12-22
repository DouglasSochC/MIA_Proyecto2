import { TestBed } from '@angular/core/testing';

import { SEquipoService } from './s-equipo.service';

describe('SEquipoService', () => {
  let service: SEquipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SEquipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
