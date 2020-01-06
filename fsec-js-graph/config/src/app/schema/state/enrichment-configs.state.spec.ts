import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { EnrichmentConfigsState } from './enrichment-configs.state';
import { SearchEnrichmentConfigsAction } from './enrichment-configs.actions';

describe('EnrichmentConfigs actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([EnrichmentConfigsState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));


});
