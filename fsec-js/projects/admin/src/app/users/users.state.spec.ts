import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { UsersState, UsersStateModel } from './users.state';
import { UsersAction } from './users.actions';

describe('Users store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([UsersState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: UsersStateModel = {
      items: [{ id: 'user-1', first_name: 'User', last_name: 'One' }]
    };
    store.dispatch(new UsersAction({ id: 'user-1', first_name: 'User', last_name: 'One' }));
    const actual = store.selectSnapshot(UsersState.getState);
    expect(actual).toEqual(expected);
  });

});
