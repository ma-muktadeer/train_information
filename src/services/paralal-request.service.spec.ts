import { TestBed } from '@angular/core/testing';

import { ParalalRequestService } from './paralal-request.service';

describe('ParalalRequestService', () => {
  let service: ParalalRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParalalRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
