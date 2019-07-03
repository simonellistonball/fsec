import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SearchEnrichmentConfigsAction } from './enrichment-configs.actions';
import { EnrichmentConfigsService } from '../../enrichment-configs.service';
import { tap } from 'rxjs/operators';
import { SearchSpec } from '../../search-spec';

export interface EnrichmentConfig {
  id: string;
  name: string;
  description: string | null;
  type: string;
  engine: string;
  model?: string;
  model_version?: number;
  lookup: string | null;
  code: string | null;
}
export class EnrichmentConfigsStateModel {
  public items: EnrichmentConfig[];
}

@State<EnrichmentConfigsStateModel>({
  name: 'enrichmentConfigs',
  defaults: {
    items: []
  }
})
export class EnrichmentConfigsState {
  constructor(private enrichmentConfigService: EnrichmentConfigsService) {}

  @Selector()
  static getList(state: EnrichmentConfigsStateModel) {
    return state.items;
  }

  @Action(SearchEnrichmentConfigsAction)
  search(ctx: StateContext<EnrichmentConfigsStateModel>, action: SearchEnrichmentConfigsAction) {
    const state = ctx.getState();
    return this.enrichmentConfigService.get(null).pipe(tap((result) => {
      ctx.patchState({
        items: result
      });
    }));
  }
}
