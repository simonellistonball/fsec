export class GetTraitEnrichmentsAction {
  public static readonly type = '[TraitEnrichments] Get enrichments';
  constructor(public id: string) { }
}

export class ChangeTraitEnrichments {
  public static readonly type = '[TraitEnrichments] Change enrichments';
  constructor(public trait: string, public id: string, public enrichments: string[]) { }
}
