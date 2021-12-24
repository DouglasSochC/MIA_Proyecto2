import { TestBed } from '@angular/core/testing';

import { STecnicoService } from './s-tecnico.service';

describe('STecnicoService', () => {
  let service: STecnicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(STecnicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
