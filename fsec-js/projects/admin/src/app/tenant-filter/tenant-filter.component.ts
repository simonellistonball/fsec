import { Component, OnInit } from '@angular/core';
import { TenantService } from '../tenant.service';
import { Select, Store } from '@ngxs/store';
import { TenantsState, Tenant } from '../tenants/tenants.state';
import { Observable } from 'rxjs';
import { GetTenantsAction } from '../tenants/tenants.actions';

@Component({
  selector: 'app-tenant-filter',
  templateUrl: './tenant-filter.component.html',
  styleUrls: ['./tenant-filter.component.css']
})
export class TenantFilterComponent implements OnInit {
  listOfSelectedValue = [];

  @Select(TenantsState.getTenantList) dataSet: Observable<Tenant[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetTenantsAction(null));
  }

  process() { }
}
