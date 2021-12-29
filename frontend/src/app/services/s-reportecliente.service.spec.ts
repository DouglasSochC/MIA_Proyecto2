import { TestBed } from '@angular/core/testing';

import { SReporteclienteService } from './s-reportecliente.service';

describe('SReporteclienteService', () => {
  let service: SReporteclienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SReporteclienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
