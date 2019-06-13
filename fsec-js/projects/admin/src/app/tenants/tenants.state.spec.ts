import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { TenantsState, TenantsStateModel } from './tenants.state';
import { TenantsAction } from './tenants.actions';

describe('Tenants store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([TenantsState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: TenantsStateModel = {
      items: [{ id: 'item-1', name: 'item-1'}]
    };
    store.dispatch(new TenantsAction({ id: 'item-1', name: 'item-1' }));
    const actual = store.selectSnapshot(TenantsState.getState);
    expect(actual).toEqual(expected);
  });

});
