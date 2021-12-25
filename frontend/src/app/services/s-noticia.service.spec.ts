import { TestBed } from '@angular/core/testing';

import { SNoticiaService } from './s-noticia.service';

describe('SNoticiaService', () => {
  let service: SNoticiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SNoticiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
