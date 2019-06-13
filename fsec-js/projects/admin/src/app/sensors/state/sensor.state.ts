import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddSensorAction, GetSensorsAction } from './sensor.actions';
import { SensorService } from '../../sensor.service';
import {tap} from 'rxjs/operators';

export enum SensorStatus { RUNNING, STOPPED, DISABLED, FAILING }

export interface SensorListEntry {
  name: string;
  topic: string;
  status: SensorStatus;
  warning: boolean;
  error: boolean;
  recentEvents: number;
  recentErrors: number;
  currentLag: number;
  currentLagTime: number;
}

export interface SensorCreateRequest {
  name: string;
  topic: string;
}

export class SensorStateModel {
  public items: SensorListEntry[];
  public selectedItem: SensorListEntry;
}

@State<SensorStateModel>({
  name: 'sensor',
  defaults: {
    items: [],
    selectedItem: null
  }
})
export class SensorState {

  constructor(private sensorService: SensorService) {
  }

  @Selector()
  static getSensorList(state: SensorStateModel) {
      return state.items;
  }

  @Action(AddSensorAction)
  add(ctx: StateContext<SensorStateModel>, action: AddSensorAction) {
    const state = ctx.getState();
    ctx.setState({
      items: [ ...state.items, action.payload ],
      selectedItem: state.selectedItem });
  }

  @Action(GetSensorsAction)
  get(ctx: StateContext<SensorStateModel>, action: GetSensorsAction) {
    const state = ctx.getState();
    return this.sensorService.get(action.searchSpec).pipe(tap((result) => {
      ctx.patchState({
        items: result
      });
    }));
  }
}
