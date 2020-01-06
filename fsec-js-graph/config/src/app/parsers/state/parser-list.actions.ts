import { ParserListEntry } from './parser-list.state';

export class ParserListAction {
  static readonly type = '[ParserList] Add item';
  constructor(public payload: ParserListEntry) { }
}
