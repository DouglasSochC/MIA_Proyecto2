import { TestBed } from '@angular/core/testing';

import { SPartidoService } from './s-partido.service';

describe('SPartidoService', () => {
  let service: SPartidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SPartidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
