import { Actions, ofActionDispatched, Store, ofActionCompleted, ofActionSuccessful } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouterNavigation } from '@ngxs/router-plugin';
import { FetchSchemaAction } from './schema/state/schemas.actions';
import { GetTraitEnrichmentsAction } from './trait-enrichments/state/trait-enrichments.actions';
import { SearchEnrichmentConfigsAction } from './enrichments/state/enrichment-configs.actions';

@Injectable()
export class RouteHandler {
  constructor(private router: Router, private actions$: Actions, private store: Store) {
    this.actions$
      .pipe(ofActionSuccessful(RouterNavigation))
      .subscribe((r) => {
        if (r.routerState) {
          const id = r.routerState.root.firstChild.params.id;
          if (id !== undefined && r.routerState.url.startsWith('/schema')) {
            this.store.dispatch(new FetchSchemaAction(id, 0));
          }
          if (id !== undefined && r.routerState.url.startsWith('/trait-enrichments')) {
            this.store.dispatch(new GetTraitEnrichmentsAction(id));
            this.store.dispatch(new SearchEnrichmentConfigsAction(''));
          }
        }
      });
  }
}
