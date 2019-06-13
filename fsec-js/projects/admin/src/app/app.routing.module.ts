import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RootComponent } from './root/root.component';
import { LoginComponent } from './login/login.component';
import { SensorsComponent } from './sensors/sensors.component';
import { SchemaComponent } from './schema/schema.component';
import { EnrichmentsComponent } from './enrichments/enrichments.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { IncompleteComponent } from './incomplete/incomplete.component';
import { TenantsComponent } from './tenants/tenants.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    data: {
      breadcrumb: 'Welcome'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      breadcrumb: 'Log In'
    }
  },
  {
    path: 'sensors',
    component: SensorsComponent,
    data: {
      breadcrumb: 'sensors'
    }
  },
  {
    path: 'schema',
    component: SchemaComponent,
    data: {
      breadcrumb: 'schema'
    }
  },
  {
    path: 'schema/:id',
    component: SchemaComponent,
    data: {
      breadcrumb: 'schema'
    }
  },
  {
    path: 'enrichments',
    component: EnrichmentsComponent,
    data: {
      breadcrumb: 'enrichments'
    }
  },
  {
    path: 'profiles',
    component: ProfilesComponent,
    data: {
      breadcrumb: 'profilers'
    }
  },
  {
    path: 'tenants',
    component: TenantsComponent,
    data: {
      breadcrumb: 'profilers'
    }
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {
      breadcrumb: 'profilers'
    }
  },
  {
    path: 'investigate',
    component: IncompleteComponent,
    data: {
      breadcrumb: 'investigate'
    }
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
