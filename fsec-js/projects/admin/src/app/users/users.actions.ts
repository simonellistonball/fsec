import { User } from './users.state';
import { SearchSpec } from '../search-spec';

export class UsersAction {
  public static readonly type = '[Users] Add item';
  constructor(public payload: User) { }
}

export class GetUsersAction {
  public static readonly type = '[Users] Get users';
  constructor(public searchSpec: SearchSpec) { }
}
