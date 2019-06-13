import { Actions, ofActionDispatched, Store, ofActionCompleted, ofActionSuccessful } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouterNavigation } from '@ngxs/router-plugin';
import { FetchSchemaAction } from './schema/state/schemas.actions';

@Injectable()
export class RouteHandler {
  constructor(private router: Router, private actions$: Actions, private store: Store) {
    this.actions$
      .pipe(ofActionSuccessful(RouterNavigation))
      .subscribe((r) => {
        if (r.routerState) {
          const schemaId = r.routerState.root.firstChild.params.id;
          if (schemaId !== undefined && r.routerState.url.startsWith('/schema')) {
            this.store.dispatch(new FetchSchemaAction(schemaId, 0));
          }
        }
      });
  }
}
