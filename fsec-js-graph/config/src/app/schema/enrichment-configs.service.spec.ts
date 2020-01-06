import { TestBed } from '@angular/core/testing';

import { EnrichmentConfigsService } from './enrichment-configs.service';

describe('EnrichmentConfigsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnrichmentConfigsService = TestBed.get(EnrichmentConfigsService);
    expect(service).toBeTruthy();
  });
});
