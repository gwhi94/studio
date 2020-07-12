import { TestBed } from '@angular/core/testing';

import { UploadGateService } from './upload-gate.service';

describe('UploadGateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadGateService = TestBed.get(UploadGateService);
    expect(service).toBeTruthy();
  });
});
