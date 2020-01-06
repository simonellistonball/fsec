import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParserListComponent } from './parser-list/parser-list.component';
import { ParserComponent } from './parser/parser.component';


const routes: Routes = [
  {
    path: '', component: ParserListComponent
  }, {
    path: ':id', component: ParserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParsersRoutingModule { }
