import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { EnrichmentConfigsState } from './enrichment-configs.state';
import { EnrichmentConfigsAction } from './enrichment-configs.actions';

describe('EnrichmentConfigs actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([EnrichmentConfigsState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    store.dispatch(new EnrichmentConfigsAction('item-1'));
    store.select(state => state.enrichmentConfigs.items).subscribe((items: string[]) => {
      expect(items).toEqual(jasmine.objectContaining([ 'item-1' ]));
    });
  });

});
