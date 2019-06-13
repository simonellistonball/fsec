import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UsersState, User } from './users.state';
import { Observable } from 'rxjs';
import { GetUsersAction } from './users.actions';
import { SearchSpec } from '../search-spec';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  sortName: string | null = null;
  sortValue: string | null = null;
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = false;

  booleanFilter = [ 'true', 'false' ].map((v) => ({ text: v, value: v }));
  mapOfExpandData: { [key: string]: boolean } = {};

  @Select(UsersState.getUsers) dataSet: Observable<User[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.search();
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
    this.store.dispatch(new GetUsersAction(new SearchSpec(this.sortName, this.sortValue)));
  }
}
