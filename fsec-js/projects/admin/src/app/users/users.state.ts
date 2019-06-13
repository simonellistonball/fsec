import { State, Action, Selector, StateContext } from '@ngxs/store';
import { UsersAction, GetUsersAction } from './users.actions';
import { UsersService } from '../users.service';
import { tap } from 'rxjs/operators';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
}
export interface UsersStateModel {
  items: User[];
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    items: []
  }
})
export class UsersState {

  constructor(private usersService: UsersService) {}

  @Selector()
  public static getState(state: UsersStateModel) {
    return state;
  }

  @Selector()
  public static getUsers(state: UsersStateModel) {
    return state.items;
  }

  @Action(UsersAction)
  public add(ctx: StateContext<UsersStateModel>, { payload }: UsersAction) {
    const stateModel = ctx.getState();
    stateModel.items = [...stateModel.items, payload];
    ctx.setState(stateModel);
  }

  @Action(GetUsersAction)
  public get(ctx: StateContext<UsersStateModel>, action: GetUsersAction) {
    const state = ctx.getState();
    return this.usersService.get(action.searchSpec).pipe(tap((result) => {
      ctx.patchState({
        items: result
      });
    }));
  }
}
