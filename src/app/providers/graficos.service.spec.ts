import { TestBed } from '@angular/core/testing';

import { GraficosService } from './graficos.service';

describe('GraficosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraficosService = TestBed.get(GraficosService);
    expect(service).toBeTruthy();
  });
});
