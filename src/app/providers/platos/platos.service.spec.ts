import { TestBed } from '@angular/core/testing';

import { PlatosService } from './platos.service';

describe('PlatosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlatosService = TestBed.get(PlatosService);
    expect(service).toBeTruthy();
  });
});
