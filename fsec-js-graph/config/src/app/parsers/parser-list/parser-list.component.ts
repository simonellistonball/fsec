import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ParserListState, ParserListEntry } from '../state/parser-list.state';
import { Observable } from 'rxjs';
import { GetParsersAction } from '../state/parser.actions';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-parser-list',
  templateUrl: './parser-list.component.html',
  styleUrls: ['./parser-list.component.scss']
})
export class ParserListComponent implements OnInit {

  sortName: string | null = null;
  sortValue: string | null = null;
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = false;

  booleanFilter = [ 'true', 'false' ].map((v) => ({ text: v, value: v }));
  mapOfExpandData: { [key: string]: boolean } = {};

  @Select(ParserListState.getParsers) dataSet: Observable<ParserListEntry[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetParsersAction());
  }

  open(id: string) {
    this.store.dispatch(new Navigate(['parsers', id]));
  }

  delete(id: string) {

  }

  search() {
    this.store.dispatch(new GetParsersAction());
  }
  sort(sort: { key: string; value: string }): void {
  }

}
