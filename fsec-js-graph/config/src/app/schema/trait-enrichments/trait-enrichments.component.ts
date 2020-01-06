import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select, Actions, ofActionSuccessful } from '@ngxs/store';
import { TraitEnrichmentsState, SchemaFieldWithEnrichment, TraitEnrichmentsStateModel } from '../state/trait-enrichments.state';
import { Observable, Subscription, Subject } from 'rxjs';
//import { EnrichmentConfigsState, EnrichmentConfig };
import { ChangeTraitEnrichments, GetTraitEnrichmentsAction } from '../state/trait-enrichments.actions';
import { Navigate, RouterDataResolved } from '@ngxs/router-plugin';
import { EnrichmentConfigsState, EnrichmentConfig } from '../state/enrichment-configs.state';
import { SearchEnrichmentConfigsAction } from '../state/enrichment-configs.actions';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-trait-enrichments',
  templateUrl: './trait-enrichments.component.html',
  styleUrls: ['./trait-enrichments.component.scss']
})
export class TraitEnrichmentsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  @Select(TraitEnrichmentsState.getState)
  model: Observable<TraitEnrichmentsStateModel>;

  @Select(EnrichmentConfigsState.getSelectList)
  enrichments: Observable<EnrichmentConfig>;

  selected: Array<string[]> = [];
  modelSub: Subscription;

  loading = false;

  constructor(private store: Store, private actions$: Actions) {}

  ngOnInit() {
    this.modelSub = this.model.subscribe((m) => {
      m.fields.forEach((f) => {
        this.selected[f.id] = f.enrichments;
      });
    });
  }

  private initStores(id) {
    this.store.dispatch(new GetTraitEnrichmentsAction(id));
    this.store.dispatch(new SearchEnrichmentConfigsAction(null));
  }

  changeEnrichments(trait: string, id: string) {
    console.log(id, this.selected[id]);
    this.store.dispatch(new ChangeTraitEnrichments(trait, id, this.selected[id]));
  }

  addEnrichment(trait: string, field: string) {
    console.log(`Adding a new Enrichment ${trait}.${field}`)
    this.store.dispatch(new Navigate(['/enrichments/new'], { trait, field }));
  }

  ngOnDestroy() {
    this.modelSub.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
