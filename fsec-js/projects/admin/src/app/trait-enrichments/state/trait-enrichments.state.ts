import { State, Action, Selector, StateContext } from '@ngxs/store';
import { GetTraitEnrichmentsAction, ChangeTraitEnrichments } from './trait-enrichments.actions';
import { SchemaField } from '../../schema/state/schemas.state';
import { tap } from 'rxjs/operators';
import { SchemaService } from '../../schema.service';
import { NzDescriptionsComponent } from 'ng-zorro-antd';

export class SchemaFieldWithEnrichment extends SchemaField {
  enrichments: string[];
}

export interface TraitEnrichmentsStateModel {
  id: string;
  name: string;
  description: string;
  fields: SchemaFieldWithEnrichment[];
}

@State<TraitEnrichmentsStateModel>({
  name: 'traitEnrichments',
  defaults: {
    id: '',
    name: '',
    description: '',
    fields: []
  }
})
export class TraitEnrichmentsState {

  constructor(private schemaService: SchemaService) {}

  @Selector()
  public static getState(state: TraitEnrichmentsStateModel) {
    return state;
  }
  @Selector()
  public static getFields(state: TraitEnrichmentsStateModel) {
    return state.fields;
  }

  @Action(GetTraitEnrichmentsAction)
  public get(ctx: StateContext<TraitEnrichmentsStateModel>, { id }: GetTraitEnrichmentsAction) {
    const state = ctx.getState();
    return this.schemaService.getEnrichments(id).pipe(tap((result) => {
      ctx.setState(result);
    }));
  }

  @Action(ChangeTraitEnrichments)
  public updateEnrichments(ctx: StateContext<TraitEnrichmentsStateModel>, { trait, id, enrichments }: ChangeTraitEnrichments) {
    const state = ctx.getState();
    this.schemaService.setEnrichments(trait, id, enrichments).subscribe((result) => {});
    if (state.id === trait) {
      const c = state.fields.findIndex((f) => f.id === id);
      ctx.patchState({ fields: state.fields.map((f, i) => i === c ? { ...f, enrichments } : f) });
    }
  }
}
