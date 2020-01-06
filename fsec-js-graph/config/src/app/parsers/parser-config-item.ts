import { Type } from '@angular/core';
import { ParserStepConfigComponent } from './parser-step-config-component';

export class ParserConfigItem {
  constructor(public component: Type<ParserStepConfigComponent>, public config: any) {}
}
