import { TestBed } from '@angular/core/testing';

import { SEstadioService } from './s-estadio.service';

describe('SEstadioService', () => {
  let service: SEstadioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SEstadioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
