import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SearchEnrichmentConfigsAction } from './enrichment-configs.actions';
import { EnrichmentConfigsService } from '../../enrichment-configs.service';
import { tap } from 'rxjs/operators';

export interface EnrichmentConfig {
  trait: string;
  name: string;
  type: string;
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
    return state.items.map((v) => ({ value: v.name, text: v.name }));
  }

  @Action(SearchEnrichmentConfigsAction)
  search(ctx: StateContext<EnrichmentConfigsStateModel>, action: SearchEnrichmentConfigsAction) {
    const state = ctx.getState();
    return this.enrichmentConfigService.searchConfigs(action.q).pipe(tap((result) => {
      ctx.patchState({
        items: result
      });
    }));
  }
}
