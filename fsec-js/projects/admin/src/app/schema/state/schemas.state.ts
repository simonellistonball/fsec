import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { SearchSchemaAction, FetchSchemaAction, ResetSchemaAction } from './schemas.actions';
import { tap } from 'rxjs/operators';
import { SchemaService } from '../../schema.service';

export class SchemasStateModel {
  public items: { id: string, name: string }[];
}

export class SchemaField {
  public name: string;
  public type: string;
  public trait?: string;
}

export class SchemaStateModel {
  public id: string;
  public name: string;
  public description: string;
  public fields: SchemaField[];
  public type?: string;
  public level: number;
  public top: number;
}

export class SchemaStatesModel {
  public items: SchemaStateModel[][];
  public links?: { from: string, from_field: string, from_col: number, to: number, to_col: number }[];
}

@State<SchemaStatesModel>({
  name: 'schema',
  defaults: { items: [[]], links: [] }
})
export class SchemaState {
  constructor(private schemasService: SchemaService, private store: Store) {}

  @Selector()
  static getSchema(state: SchemaStatesModel) {
    return state;
  }

  private calculateLinks(items: SchemaStateModel[][]) {
    if (items.length < 2) { return []; }
    let out = [];
    for (let i = 1; i < items.length; i++) {
      out[i-1] = items[i-1].map((parentTrait) => {
        return parentTrait.fields
          .filter((f) => 'trait' in f)
          .map((t) => ({
            from: parentTrait.id,
            from_field: t.name,
            from_col: i - 1,
            to: items[i].findIndex((child) => child.id === t.trait),
            to_col: i
          }));
      });
    }
    return out.flat();
  }

  @Action(ResetSchemaAction)
  reset(ctx: StateContext<SchemaStatesModel>) {
    ctx.setState({ items: [], links: []});
  }

  @Action(FetchSchemaAction)
  fetch(ctx: StateContext<SchemaStatesModel>, action: FetchSchemaAction) {
    const state = ctx.getState();
    return this.schemasService.getSchemaDetails(action.name).pipe(
      tap((r) => {
        if (action.level === 0) {
          ctx.setState({ items: [[r]]});
        } else {
          const s = ctx.getState();
          const items = [...s.items];
          if (items[action.level]) {
            items[action.level] = items[action.level].concat(r);
          } else {
            items[action.level] = [r]
          }
          const links = this.calculateLinks(items);
          ctx.patchState({ items, links });
        }
        if (r.fields !== undefined) {
          const actions = [...new Set(r.fields.filter((f) => ('trait' in f)).map((f) => f.trait))]
            .map((f) => new FetchSchemaAction(f, action.level + 1));
          this.store.dispatch(actions);
        }
      })
    );
  }
}

@State<SchemasStateModel>({
  name: 'schemas',
  defaults: {
    items: []
  }
})
export class SchemasState {
  constructor(private schemasService: SchemaService) {}

  @Selector()
  static getSchemaList(state: SchemasStateModel) {
    return state.items.map((v) => ({ value: v.id, text: v.name }));
  }

  @Action(SearchSchemaAction)
  search(ctx: StateContext<SchemasStateModel>, action: SearchSchemaAction) {
    const state = ctx.getState();
    return this.schemasService.getSchemas().pipe(tap((result) => {
      ctx.patchState({
        items: result
      });
    }));
  }
}
