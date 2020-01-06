import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetParserAction,
  RawLinesUpdateFromServer,
  RawLinesFileUploaded,
  RawLinesContentChangedAction,
  RequestNewTestAction} from './parser.actions';
import { ParserService } from '../parser.service';
import { tap, map } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export interface ParserChainEntry {
  parser: string;
  config: any;
  source?: string;
  preserveSource?: boolean;
  outputFields: string[];
  missingSource?: boolean;
}

export interface NormalizeChainEntry {
  normalizer: string;
  config: any;
}

export interface ParsedLine {
  raw: string;
  parsed: any;
  fields: string[];
  ranges: { start: number, end: number }[];
  errors?: string[];
}

export class ParserStateModel {
  public name: string;
  public parseChain: ParserChainEntry[];
  public normalizeChain: NormalizeChainEntry[];
  public rawLines?: string[];
  public parsedLines?: ParsedLine[];
  public outputFields?: OutputField[];
  public tests: ParserTestRun[];
  public creatingTest: boolean;
}

export interface OutputField {
  name: string;
  tags: { name: string, color: string }[];
}

export interface ParserTestRun {
  id: string;
  timestamp: number;
  version: string;
  source: string;
  errors: number;
  warnings: number;
  performance: number[];
}

export interface RawSearchSpec {
  source: string;
  search: string;
  advancedClustering: boolean;
  url?: string;
  kafkaTopic?: string;
  limit?: number;
}

export class ParserCreateRequest extends ParserStateModel {}

@State<ParserStateModel>({
  name: 'parser',
  defaults: {
    name: 'new',
    parseChain: [],
    normalizeChain: [],
    outputFields: [],
    tests: [],
    creatingTest: false
  }
})

export class ParserState {

  constructor(public parserService: ParserService) {}

  static calculateLinks(input: ParserStateModel): ParserStateModel {
    // for each chain entry, check that its source appears in previous chain's output
    // output fields should honour the preserveSource element, i.e. should propagate previous fields to their output
    input.parseChain = input.parseChain.map((entry, i) => {
      // if preserve source is false, clear the previous, else add the to priors
      if (i === 0) {
        entry.missingSource = false;
      } else {
        entry.missingSource = !entry.source || input.parseChain[i - 1].outputFields.findIndex(e => e === input.parseChain[i].source) === -1;
      }
      return entry;
    });
    return input;
  }

  @Selector()
  static getChain(state: ParserStateModel) {
    return state.parseChain;
  }
  @Selector()
  static getNormalizer(state: ParserStateModel) {
    return state.normalizeChain;
  }
  @Selector()
  static getName(state: ParserStateModel) {
    return state.name;
  }
  @Selector()
  static getRaw(state: ParserStateModel) {
    return state.rawLines;
  }

  @Selector()
  static getParsed(state: ParserStateModel) {
    return state.parsedLines;
  }

  @Selector()
  static getOutputFields(state: ParserStateModel) {
    return state.outputFields;
  }

  @Selector()
  static getTests(state: ParserStateModel) {
    return state.tests;
  }

  @Selector()
  static creatingTest(state: ParserStateModel) {
    return state.creatingTest;
  }

  @Action(GetParserAction)
  get(ctx: StateContext<ParserStateModel>, action: GetParserAction) {
    const state = ctx.getState();
    return this.parserService.get(action.id).pipe(
      map(ParserState.calculateLinks),
      tap((result) => {
        ctx.setState(result);
      }));
  }

  @Action(RawLinesFileUploaded)
  rawLinesUploaded(ctx: StateContext<ParserStateModel>, action: RawLinesFileUploaded) {
    ctx.dispatch(new RawLinesUpdateFromServer(null));
  }

  @Action(RawLinesContentChangedAction)
  rawLinesContentChanged(ctx: StateContext<ParserStateModel>, action: RawLinesContentChangedAction) {
    const state = ctx.getState();
    this.parserService.parse(state.rawLines, {
      parseChain: state.parseChain,
      normalizeChain: state.normalizeChain
    }).pipe(tap((results) => {
      ctx.patchState({ parsedLines: results });
    }));
  }

  @Action(RawLinesUpdateFromServer)
  rawLinesUpdate(ctx: StateContext<ParserStateModel>, action: RawLinesUpdateFromServer) {
    const state = ctx.getState();
    if (action.search.source === 'manual') {
      return;
    }
    if (action.search.source === 'upload') {
      return this.parserService.upload();
    }
    // get from server based spark job
    this.parserService.searchRaw({
      source: action.search.source,
      search: action.search.search,
      advancedClustering: action.search.advancedClustering
    }).subscribe((result) => ctx.patchState({ rawLines: result.raw, parsedLines: result.parsed }));
  }

  @Action(RequestNewTestAction)
  requestNewTestAction(ctx: StateContext<ParserStateModel>, action: RequestNewTestAction) {
    ctx.patchState({ creatingTest: true });
  }

}
