import { TestBed } from '@angular/core/testing';

import { VueloServiceService } from './vuelo-service.service';

describe('VueloServiceService', () => {
  let service: VueloServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VueloServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
