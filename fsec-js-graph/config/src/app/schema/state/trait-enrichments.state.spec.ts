import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { TraitEnrichmentsState, TraitEnrichmentsStateModel } from './trait-enrichments.state';
import { TraitEnrichmentsAction } from './trait-enrichments.actions';

describe('TraitEnrichments store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([TraitEnrichmentsState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: TraitEnrichmentsStateModel = {
      items: ['item-1']
    };
    store.dispatch(new TraitEnrichmentsAction('item-1'));
    const actual = store.selectSnapshot(TraitEnrichmentsState.getState);
    expect(actual).toEqual(expected);
  });

});
