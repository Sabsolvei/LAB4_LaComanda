import { TestBed } from '@angular/core/testing';

import { UplodadFilesService } from '../uploadFiles/uplodad-files.service';

describe('UplodadFilesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UplodadFilesService = TestBed.get(UplodadFilesService);
    expect(service).toBeTruthy();
  });
});
