import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { TraitEnrichmentsState, SchemaFieldWithEnrichment, TraitEnrichmentsStateModel } from './state/trait-enrichments.state';
import { Observable, Subscription } from 'rxjs';
import { EnrichmentConfigsState, EnrichmentConfig } from '../enrichments/state/enrichment-configs.state';
import { isUndefined } from 'ngx-pipes/src/pipes/helpers/helpers';
import { map } from 'rxjs/operators';
import { ChangeTraitEnrichments } from './state/trait-enrichments.actions';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-trait-enrichments',
  templateUrl: './trait-enrichments.component.html',
  styleUrls: ['./trait-enrichments.component.scss']
})
export class TraitEnrichmentsComponent implements OnInit, OnDestroy {

  @Select(TraitEnrichmentsState.getState)
  model: Observable<TraitEnrichmentsStateModel>;

  @Select(EnrichmentConfigsState.getSelectList)
  enrichments: Observable<EnrichmentConfig>;

  selected: Array<string[]> = [];
  modelSub: Subscription;

  loading = false;

  constructor(private store: Store) { }

  ngOnInit() {
    this.modelSub = this.model.subscribe((m) => {
      m.fields.forEach((f) => {
        this.selected[f.id] = f.enrichments;
      });
    });
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
  }


}
