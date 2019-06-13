import { TestBed } from '@angular/core/testing';

import { SensorService } from './sensor.service';

describe('SensorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SensorService = TestBed.get(SensorService);
    expect(service).toBeTruthy();
  });
});
