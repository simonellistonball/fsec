import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TenantsState, Tenant } from './tenants.state';
import { Observable } from 'rxjs';
import { GetTenantsAction } from './tenants.actions';
import { SearchSpec } from '../search-spec';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent implements OnInit {
  sortName: string | null = null;
  sortValue: string | null = null;
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = false;

  booleanFilter = [ 'true', 'false' ].map((v) => ({ text: v, value: v }));
  mapOfExpandData: { [key: string]: boolean } = {};

  @Select(TenantsState.getTenantList) dataSet: Observable<Tenant[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetTenantsAction(null));
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  filter(): void {
    this.search();
  }

  search(): void {
    //this.loading = true;
    this.store.dispatch(new GetTenantsAction(new SearchSpec(this.sortName, this.sortValue)));
  }
}
