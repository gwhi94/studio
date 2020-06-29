import { TestBed } from '@angular/core/testing';

import { StudioFeedService } from './studio-feed.service';

describe('StudioFeedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudioFeedService = TestBed.get(StudioFeedService);
    expect(service).toBeTruthy();
  });
});
