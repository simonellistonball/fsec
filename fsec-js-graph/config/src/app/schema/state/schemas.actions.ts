export class SearchSchemaAction {
  static readonly type = '[Schemas] Search schemas';
  constructor() {}
}

export class FetchSchemaAction {
  static readonly type = '[Schema] Fetch schema';
  constructor(public name: string, public level: number = 0) {}
}

export class ResetSchemaAction {
  static readonly type = '[Schema] Reset Schema';
  constructor() {}
}

export class ChangeEditModeAction {
  static readonly type = '[Schema] Set edit mode';
  constructor(public id: string) {}
}
