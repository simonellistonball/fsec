import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { SchemasState } from './schemas.state';
import { SearchSchemaAction } from './schemas.actions';

describe('Schemas actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SchemasState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

});
