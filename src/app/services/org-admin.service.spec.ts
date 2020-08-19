import { TestBed } from '@angular/core/testing';

import { OrgAdminService } from './org-admin.service';

describe('OrgAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrgAdminService = TestBed.get(OrgAdminService);
    expect(service).toBeTruthy();
  });
});
