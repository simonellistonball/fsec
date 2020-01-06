import { State, Action, StateContext, Select, Selector } from '@ngxs/store';
import { ParserListAction } from './parser-list.actions';
import { getParseErrors } from '@angular/compiler';
import { GetParsersAction } from './parser.actions';
import { ParserService } from '../parser.service';
import { SearchSpec } from 'src/app/search-spec';
import { tap } from 'rxjs/operators';
import { ParserListService } from '../parser-list.service';

export interface ParserListEntry {
  id: string;
  name: string;
  version: string;
}

export class ParserListStateModel {
  public items: ParserListEntry[];
}

@State<ParserListStateModel>({
  name: 'parserList',
  defaults: {
    items: []
  }
})
export class ParserListState {
  constructor(private parserListService: ParserListService) {}

  @Selector()
  static getParsers(state: ParserListStateModel) {
    return state.items;
  }

  @Action(ParserListAction)
  add(ctx: StateContext<ParserListStateModel>, action: ParserListAction) {
    const state = ctx.getState();
    ctx.setState({ items: [ ...state.items, action.payload ] });
  }

  @Action(GetParsersAction)
  loadAll(ctx: StateContext<ParserListStateModel>, action: GetParsersAction) {
    const state = ctx.getState();
    return this.parserListService.find().pipe(tap((result) => {
      ctx.setState({ items: result });
    }));
  }
}
