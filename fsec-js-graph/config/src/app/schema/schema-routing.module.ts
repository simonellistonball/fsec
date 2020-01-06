import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchemaComponent } from './schema/schema.component';
import { SchemaEditComponent } from './schema-edit/schema-edit.component';
import { TraitEnrichmentsComponent } from './trait-enrichments/trait-enrichments.component';
import { SchemaTraitComponent } from './schema-trait/schema-trait.component';
import { RouterState, RouterStateModel } from '@ngxs/router-plugin';
import { Selector } from '@ngxs/store';

const routes: Routes = [
  {
    path: '', component: SchemaComponent,
    children: [{
      path: ':id',
      children: [
        {
          path: '', component: SchemaTraitComponent,
        },
        {
          path: 'trait-enrichments', component: TraitEnrichmentsComponent
        }
      ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchemaRoutingModule { }
