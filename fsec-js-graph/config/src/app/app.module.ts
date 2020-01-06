import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { environment } from '../environments/environment';

import { NgxsModule } from '@ngxs/store';
import { ngxsConfig } from './ngxs.config';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsWebsocketPluginModule } from '@ngxs/websocket-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { MonacoEditorModule } from 'ngx-monaco-editor';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxsModule.forRoot([], ngxsConfig),
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxsRouterPluginModule.forRoot(),
    NgxsWebsocketPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    //NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    MonacoEditorModule.forRoot()
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
