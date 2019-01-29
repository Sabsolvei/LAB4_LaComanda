import { TestBed } from '@angular/core/testing';

import { BebidasService } from './bebidas.service';

describe('BebidasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BebidasService = TestBed.get(BebidasService);
    expect(service).toBeTruthy();
  });
});
