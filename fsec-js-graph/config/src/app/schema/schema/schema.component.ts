import { Component, OnInit, ElementRef, OnChanges, SimpleChanges, AfterViewChecked, OnDestroy, assertPlatform } from '@angular/core';
import { Store, Select, Actions, ofActionSuccessful } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { SearchSchemaAction, FetchSchemaAction, ResetSchemaAction } from '../state/schemas.actions';
import { SchemasState, SchemaStateModel, SchemaState, SchemaLink } from '../state/schemas.state';
import { Navigate, RouterState, RouterDataResolved } from '@ngxs/router-plugin';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css']
})
export class SchemaComponent implements OnInit, OnDestroy {

  @Select(SchemasState.getSchemaList) listOfOption: Observable<Array<{ value: string; text: string }>>;
  @Select(SchemaState.getSchema) selectedSchema: Observable<SchemaStateModel[]>;
  @Select(RouterState.state) routerState: Observable<RouterStateSnapshot>;

  private destroy$ = new Subject<void>();

  traitSelect = new FormControl('');

  selectedValue = null;
  nzFilterOption = () => true;


  constructor(private store: Store, actions$: Actions, private route: ActivatedRoute) {
    route.params.subscribe(p => {
      if (p.id !== undefined) {
        this.store.dispatch(new FetchSchemaAction(p.id));
      }
    });

    actions$.pipe(
        ofActionSuccessful(RouterDataResolved),
        takeUntil(this.destroy$)
      ).subscribe((action: RouterDataResolved) => {
        const routedId = action.routerState.root.firstChild.firstChild.firstChild.params.id;
        this.store.dispatch(new FetchSchemaAction(routedId));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.store.dispatch(new SearchSchemaAction());
 }

  search(q: string) { }

  select(id: string) {
    this.store.dispatch(new Navigate(['/schemas', id]));
  }

}
