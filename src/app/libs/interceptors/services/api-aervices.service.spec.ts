import { TestBed } from '@angular/core/testing';

import { ApiAervicesService } from './api-aervices.service';

describe('ApiAervicesService', () => {
  let service: ApiAervicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAervicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
