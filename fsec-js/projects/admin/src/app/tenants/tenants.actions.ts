import { Tenant } from './tenants.state';
import { SearchSpec } from '../search-spec';

export class TenantsAction {
  public static readonly type = '[Tenants] Add item';
  constructor(public payload: Tenant) { }
}

export class GetTenantsAction {
  static readonly type = '[Tenants] Get tenants';
  constructor(public searchSpec: SearchSpec) {}
}
