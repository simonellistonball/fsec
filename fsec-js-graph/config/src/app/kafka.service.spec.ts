import { TestBed } from '@angular/core/testing';

import { KafkaService } from './kafka.service';

describe('KafkaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KafkaService = TestBed.get(KafkaService);
    expect(service).toBeTruthy();
  });
});
