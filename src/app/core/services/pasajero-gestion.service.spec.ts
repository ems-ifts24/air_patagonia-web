import { TestBed } from '@angular/core/testing';

import { PasajeroGestionService } from './pasajero-gestion.service';

describe('PasajeroGestionService', () => {
  let service: PasajeroGestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasajeroGestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
