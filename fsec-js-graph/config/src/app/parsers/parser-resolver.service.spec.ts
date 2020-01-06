import { TestBed } from '@angular/core/testing';

import { ParserResolverService } from './parser-resolver.service';

describe('ParserResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParserResolverService = TestBed.get(ParserResolverService);
    expect(service).toBeTruthy();
  });
});
