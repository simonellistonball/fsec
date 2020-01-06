import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParserListComponent } from './parser-list/parser-list.component';
import { ParserStoreComponent } from './parser-store/parser-store.component';
import { ParserComponent } from './parser/parser.component';
import { ParserStepComponent } from './parser-step/parser-step.component';
import { NormalizerStepComponent } from './normalizer-step/normalizer-step.component';
import { ParsersRoutingModule } from './parsers-routing.module';
import {
  NzTableModule,
  NzButtonModule,
  NzFormModule,
  NzCardModule,
  NzTabsModule,
  NzIconModule,
  NzSelectModule,
  NzGridModule,
  NzRadioModule,
  NzInputModule,
  NzSwitchModule,
  NzMessageModule,
  NzUploadModule,
  NzAlertModule,
  NzTagModule,
  NzInputNumberModule
} from 'ng-zorro-antd';
import { NgxsModule } from '@ngxs/store';
import { ParserListState } from './state/parser-list.state';
import { ParserState } from './state/parser.state';
import { ReactiveFormsModule } from '@angular/forms';
import { ParserService } from './parser.service';
import { ParserListService } from './parser-list.service';
import { ParserStepConfigHostDirective } from './parser-step-config-host.directive';
import { ParserConfigNoopComponent } from './parser-config-noop/parser-config-noop.component';
import { ParserRouterConfigComponent } from './parser-router-config/parser-router-config.component';
import { ParserConfigGrokComponent } from './parser-config-grok/parser-config-grok.component';
import { OutputLinesComponent } from './output-lines/output-lines.component';
import { RawLinesComponent } from './raw-lines/raw-lines.component';
import { ParserTesterComponent } from './parser-tester/parser-tester.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { OutputKeyValuesPipe } from './output-key-values.pipe';
import { PrettyParserNamePipe } from './pretty-parser-name.pipe';
import { ParserVersionsComponent } from './parser-versions/parser-versions.component';
import { ParserSourceSelectComponent } from './parser-source-select/parser-source-select.component';
import { NormalizerStepConfigHostDirective } from './normalizer-step-config-host.directive';
import { NormalizerConfigRenameComponent } from './normalizer-config-rename/normalizer-config-rename.component';
import { NormalizerConfigScriptComponent } from './normalizer-config-script/normalizer-config-script.component';
import { NormalizerConfigMapTraitsComponent } from './normalizer-config-map-traits/normalizer-config-map-traits.component';
import { NormalizerConfigFixDatesComponent } from './normalizer-config-fix-dates/normalizer-config-fix-dates.component';
import { NormalizerConfigNoopComponent } from './normalizer-config-noop/normalizer-config-noop.component';

@NgModule({
  declarations: [
    ParserListComponent,
    ParserStoreComponent,
    ParserComponent,
    ParserStepComponent,
    NormalizerStepComponent,
    ParserStepConfigHostDirective,
    ParserConfigNoopComponent,
    ParserRouterConfigComponent,
    ParserConfigGrokComponent,
    OutputLinesComponent,
    RawLinesComponent,
    OutputKeyValuesPipe,
    PrettyParserNamePipe,
    ParserTesterComponent,
    ParserVersionsComponent,
    ParserSourceSelectComponent,
    NormalizerStepConfigHostDirective,
    NormalizerConfigRenameComponent,
    NormalizerConfigScriptComponent,
    NormalizerConfigMapTraitsComponent,
    NormalizerConfigFixDatesComponent,
    NormalizerConfigNoopComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([ParserListState, ParserState]),
    ParsersRoutingModule,
    NzTableModule,
    NzButtonModule,
    NzFormModule,
    NzCardModule,
    NzTabsModule,
    NzIconModule,
    NzSelectModule,
    NzGridModule,
    NzRadioModule,
    NzInputModule,
    NzSwitchModule,
    NzMessageModule,
    NzUploadModule,
    NzAlertModule,
    NzTagModule,
    NzInputNumberModule,
    MonacoEditorModule
  ],
  providers: [ParserListService, ParserService],
  entryComponents: [
    ParserConfigNoopComponent,
    ParserRouterConfigComponent,
    ParserConfigGrokComponent,
    NormalizerConfigRenameComponent,
    NormalizerConfigScriptComponent,
    NormalizerConfigMapTraitsComponent,
    NormalizerConfigFixDatesComponent,
    NormalizerConfigNoopComponent
  ]

})
export class ParsersModule { }
