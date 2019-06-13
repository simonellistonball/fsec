import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SensorListEntry, SensorCreateRequest } from './sensors/state/sensor.state';
import { SearchSpec } from './search-spec';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class SensorService extends CrudService<SensorListEntry, SensorCreateRequest> {
  base = '/api/v1/sensors';
}
