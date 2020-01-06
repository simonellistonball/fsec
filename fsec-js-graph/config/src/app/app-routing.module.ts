import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/schemas' },
  { path: 'parsers', loadChildren: () => import('./parsers/parsers.module').then(m => m.ParsersModule) },
  { path: 'sensors', loadChildren: () => import('./sensors/sensors.module').then(m => m.SensorsModule) },
  { path: 'schemas', loadChildren: () => import('./schema/schema.module').then(m => m.SchemaModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
