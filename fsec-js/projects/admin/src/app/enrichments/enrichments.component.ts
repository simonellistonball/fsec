import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EnrichmentConfigsState, EnrichmentConfig } from './state/enrichment-configs.state';
import { SearchEnrichmentConfigsAction } from './state/enrichment-configs.actions';

@Component({
  selector: 'app-enrichments',
  templateUrl: './enrichments.component.html',
  styleUrls: ['./enrichments.component.css']
})
export class EnrichmentsComponent implements OnInit {
  selectedValue = null;
  @Select(EnrichmentConfigsState.getList) listOfOption: Observable<Array<EnrichmentConfig>>;
  nzFilterOption = () => true;

  constructor(private store: Store) {  }

  ngOnInit() {
    this.store.dispatch(new SearchEnrichmentConfigsAction(null));
  }

  search(q: string) { }

  select(name: string) {
    //this.store.dispatch(new FetchSchemaAction(name));
  }
}
