import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SearchSchemaAction, FetchSchemaAction, ResetSchemaAction } from './state/schemas.actions';
import { SchemasState, SchemaStateModel, SchemaState } from './state/schemas.state';
import { Navigate, RouterState } from '@ngxs/router-plugin';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css']
})
export class SchemaComponent implements OnInit {
  @Select(SchemasState.getSchemaList) listOfOption: Observable<Array<{ value: string; text: string }>>;
  @Select(SchemaState.getSchema) selectedSchema: Observable<SchemaStateModel[]>;
  @Select(RouterState.state) routerState: Observable<RouterStateSnapshot>;

  selectedValue = null;
  nzFilterOption = () => true;

  constructor(private store: Store, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.store.dispatch(new SearchSchemaAction());
  }

  search(q: string) { }

  select(id: string) {
    this.store.dispatch(new Navigate(['/schema', id]));
  }
}
