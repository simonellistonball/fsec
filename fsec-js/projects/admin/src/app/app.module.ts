import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing.module';
import { RootComponent } from './root/root.component';
import { SensorsComponent } from './sensors/sensors.component';
import { SchemaComponent } from './schema/schema.component';
import { EnrichmentsComponent } from './enrichments/enrichments.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd';
import { ProfilesComponent } from './profiles/profiles.component';
import { IncompleteComponent } from './incomplete/incomplete.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { SensorState } from './sensors/state/sensor.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { SchemasState, SchemaState } from './schema/state/schemas.state';
import { TenantFilterComponent } from './tenant-filter/tenant-filter.component';
import { TenantsComponent } from './tenants/tenants.component';
import { environment } from '../environments/environment';
import { SchemaTraitComponent, TraitDirective } from './schema-trait/schema-trait.component';
import { RouteHandler } from './route-handler';
import { UsersComponent } from './users/users.component';
import { TenantsState } from './tenants/tenants.state';
import { UsersState } from './users/users.state';
import { NgPipesModule } from 'ngx-pipes';
import { TraitEnrichmentsComponent } from './trait-enrichments/trait-enrichments.component';
import { TraitEnrichmentsState } from './trait-enrichments/state/trait-enrichments.state';
import { EnrichmentConfigsState } from './enrichments/state/enrichment-configs.state';

export function noop() { return function() {}; };

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RootComponent,
    SensorsComponent,
    SchemaComponent,
    EnrichmentsComponent,
    ProfilesComponent,
    IncompleteComponent,
    TenantFilterComponent,
    TenantsComponent,
    SchemaTraitComponent,
    UsersComponent,
    TraitEnrichmentsComponent,
    TraitDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    NzBreadCrumbModule,
    routing,
    NgxsModule.forRoot([
      SensorState,
      SchemasState,
      SchemaState,
      TenantsState,
      UsersState,
      TraitEnrichmentsState,
      EnrichmentConfigsState
    ], { developmentMode: !environment.production }),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgPipesModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    RouteHandler
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
