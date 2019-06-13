import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EnrichmentConfigsState } from './state/enrichment-configs.state';

@Component({
  selector: 'app-enrichments',
  templateUrl: './enrichments.component.html',
  styleUrls: ['./enrichments.component.css']
})
export class EnrichmentsComponent implements OnInit {
  selectedValue = null;
  @Select(EnrichmentConfigsState.getList) listOfOption: Observable<Array<{ value: string; text: string }>>;
  nzFilterOption = () => true;

  constructor(private store: Store) {  }

  ngOnInit() {
    //this.store.dispatch(new SearchEnrichmentConfigsAction());
  }

  search(q: string) { }

  select(name: string) {
    //this.store.dispatch(new FetchSchemaAction(name));
  }
}
