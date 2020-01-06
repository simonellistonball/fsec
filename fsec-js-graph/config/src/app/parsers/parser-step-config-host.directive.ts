import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appParserStepConfigHost]'
})
export class ParserStepConfigHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
