import { State, Action, Selector, StateContext } from '@ngxs/store';
import { TenantsAction, GetTenantsAction } from './tenants.actions';
import { TenantService } from '../tenant.service';
import { tap } from 'rxjs/operators';

export interface Tenant {
  id: string;
  name: string;
}

export interface TenantsStateModel {
  items: Tenant[];
}

@State<TenantsStateModel>({
  name: 'tenants',
  defaults: {
    items: []
  }
})
export class TenantsState {

  constructor(private tenantsService: TenantService) {}

  @Selector()
  public static getState(state: TenantsStateModel) {
    return state;
  }

  @Selector()
  public static getTenantList(state: TenantsStateModel) {
    return state.items;
  }

  @Action(TenantsAction)
  public add(ctx: StateContext<TenantsStateModel>, { payload }: TenantsAction) {
    const stateModel = ctx.getState();
    stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }

  @Action(GetTenantsAction)
  public get(ctx: StateContext<TenantsStateModel>, action: GetTenantsAction) {
    const state = ctx.getState();
    return this.tenantsService.get(action.searchSpec).pipe(tap((result) => {
      ctx.patchState({
        items: result
      });
    }));
  }
}
