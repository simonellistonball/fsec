import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemaRoutingModule } from './schema-routing.module';
import { SchemaComponent } from './schema/schema.component';
import { SchemaTraitComponent } from './schema-trait/schema-trait.component';
import { SchemaState, SchemasState } from './state/schemas.state';
import { NgxsModule } from '@ngxs/store';
import { NzSelectModule, NzCardModule, NzListModule, NzIconModule, NzAvatarModule, NzTableModule, NzDividerModule } from 'ng-zorro-antd';
import { SchemaService } from './schema.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SchemaTraitCardComponent } from '../schema-trait-card/schema-trait-card.component';
import { SchemaEditComponent } from './schema-edit/schema-edit.component';
import { TraitEnrichmentsComponent } from './trait-enrichments/trait-enrichments.component';
import { TraitEnrichmentsState } from './state/trait-enrichments.state';
import { EnrichmentConfigsState } from './state/enrichment-configs.state';


@NgModule({
  declarations: [
    SchemaComponent,
    SchemaTraitComponent,
    SchemaTraitCardComponent,
    SchemaEditComponent,
    TraitEnrichmentsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SchemaRoutingModule,
    NgxsModule.forFeature([SchemaState, SchemasState, TraitEnrichmentsState, EnrichmentConfigsState]),
    NzSelectModule,
    NzCardModule,
    NzListModule,
    NzIconModule,
    NzAvatarModule,
    NzTableModule,
    NzSelectModule,
    NzDividerModule
  ],
  providers: [
    SchemaService
  ]
})
export class SchemaModule { }
