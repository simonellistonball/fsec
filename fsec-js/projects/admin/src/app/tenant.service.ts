import { Injectable } from '@angular/core';
import { Tenant } from './tenants/tenants.state';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class TenantService extends CrudService<Tenant, Tenant> {
  base = '/api/v1/tenants';
}
