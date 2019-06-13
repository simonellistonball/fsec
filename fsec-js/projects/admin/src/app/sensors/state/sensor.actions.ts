import { SensorListEntry } from './sensor.state';
import { SearchSpec } from '../../search-spec';

export class AddSensorAction {
  static readonly type = '[Sensor] Add sensor';
  constructor(public payload: SensorListEntry) { }
}

export class GetSensorsAction {
  static readonly type = '[Sensor] Get sensors';
  constructor(public searchSpec: SearchSpec) {}
}

export class EnableSensorsAction {
  static readonly type = '[Sensor] Enable sensor';
  constructor(public id: string) { }
}

export class DisableSensorsAction {
  static readonly type = '[Sensor] Disable sensor';
  constructor(public id: string) { }
}

export class StopSensorsAction {
  static readonly type = '[Sensor] Stop sensor';
  constructor(public id: string) { }
}

export class StoppedSensorsAction {
  static readonly type = '[Sensor] Stopped sensor';
  constructor(public id: string) { }
}

export class StartSensorsAction {
  static readonly type = '[Sensor] Start sensor';
  constructor(public id: string) { }
}

export class StartedSensorsAction {
  static readonly type = '[Sensor] Started sensor';
  constructor(public id: string) { }
}

