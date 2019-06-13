export class SearchEnrichmentConfigsAction {
  static readonly type = '[EnrichmentConfigs] Search';
  constructor(public q: string) { }
}
