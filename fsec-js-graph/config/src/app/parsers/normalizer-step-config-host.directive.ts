import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appNormalizerStepConfigHost]'
})
export class NormalizerStepConfigHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }

}
