import { State, Action, Selector, StateContext } from '@ngxs/store';
import { GetTraitEnrichmentsAction } from './trait-enrichments.actions';
import { SchemaField } from '../../schema/state/schemas.state';
import { tap } from 'rxjs/operators';
import { SchemaService } from '../../schema.service';

interface Enrichment {
  id: string;
  name: string;
  type: string;
  code?: string;
}
export class SchemaFieldWithEnrichment extends SchemaField {
  enrichments: Enrichment[];
}

export interface TraitEnrichmentsStateModel {
  fields: SchemaFieldWithEnrichment[];
}

@State<TraitEnrichmentsStateModel>({
  name: 'traitEnrichments',
  defaults: {
    fields: []
  }
})
export class TraitEnrichmentsState {

  constructor(private schemaService: SchemaService) {}

  @Selector()
  public static getState(state: TraitEnrichmentsStateModel) {
    return state;
  }

  @Action(GetTraitEnrichmentsAction)
  public get(ctx: StateContext<TraitEnrichmentsStateModel>, { id }: GetTraitEnrichmentsAction) {
    const state = ctx.getState();
    return this.schemaService.getEnrichments(id).pipe(tap((result) => {
      ctx.setState({
        fields: result
      });
    }));
  }
}
