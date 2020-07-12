import { TestBed } from '@angular/core/testing';

import { StudioResolverService } from './studio-resolver.service';

describe('StudioResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudioResolverService = TestBed.get(StudioResolverService);
    expect(service).toBeTruthy();
  });
});
