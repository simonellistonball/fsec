import { ParserChainEntry, NormalizeChainEntry, RawSearchSpec } from './parser.state';

export class GetParserAction {
  static readonly type = '[Parser] Get parser';
  constructor(public id: string) { }
}

export class GetParsersAction {
  static readonly type = '[Parser] Get parsers';
  constructor() { }
}

export class AddParserStep {
  static readonly type = '[Parser] Add chain entry to parser';
  constructor(public chain: ParserChainEntry, public index: number) { }
}
export class AddNormalizerStep {
  static readonly type = '[Parser] Add normalizer entry to parser';
  constructor(public chain: NormalizeChainEntry, public index: number) { }
}
export class ChangeParserStep {
  static readonly type = '[Parser] Change chain entry';
  constructor(public chain: ParserChainEntry, public index: number) { }
}
export class ChangeNormalizerStep {
  static readonly type = '[Parser] Change normalizer entry';
  constructor(public chain: NormalizeChainEntry, public index: number) { }
}

export class RawLinesUpdateFromServer {
  static readonly type = '[Parser] RawLines Update';
  constructor(public search: RawSearchSpec) {}
}

export class RawLinesFileUploaded {
  static readonly type = '[Parser] RawLines File Uploaded';
  constructor() {}
}

export class RawLinesContentChangedAction {
  static readonly type = '[Parser] RawLines Content Changed';
  constructor(public source: string) {}
}

export class RequestNewTestAction {
  static readonly type = '[Parser] Requesting new test';
  constructor() {}
}
export class RunTestAction {
  static readonly type = '[Parser] Run parser test';
  constructor(public testSpec: { runCount: number }) {}
}
