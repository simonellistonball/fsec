import { Component, OnInit, Input, ViewChild, Type, ComponentFactoryResolver } from '@angular/core';
import { NormalizeChainEntry } from '../state/parser.state';
import { NormalizerStepConfigHostDirective } from '../normalizer-step-config-host.directive';
import { NormalizerConfigNoopComponent } from '../normalizer-config-noop/normalizer-config-noop.component';
import { NormalizerStepConfigComponent } from '../nomralizer-step-config-component';
import { NormalizerConfigFixDatesComponent } from '../normalizer-config-fix-dates/normalizer-config-fix-dates.component';
import { NormalizerConfigMapTraitsComponent } from '../normalizer-config-map-traits/normalizer-config-map-traits.component';
import { NormalizerConfigRenameComponent } from '../normalizer-config-rename/normalizer-config-rename.component';
import { NormalizerConfigScriptComponent } from '../normalizer-config-script/normalizer-config-script.component';

@Component({
  selector: 'app-normalizer-step',
  templateUrl: './normalizer-step.component.html',
  styleUrls: ['./normalizer-step.component.scss']
})
export class NormalizerStepComponent implements OnInit {

  @Input() step: NormalizeChainEntry;

  @ViewChild(NormalizerStepConfigHostDirective, {static: true}) configHost: NormalizerStepConfigHostDirective;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  mapper: Map<string, Type<NormalizerStepConfigComponent>> = new Map();

  ngOnInit() {
    this.mapper.set('fixDates', NormalizerConfigFixDatesComponent);
    this.mapper.set('rename', NormalizerConfigRenameComponent);
    this.mapper.set('script', NormalizerConfigScriptComponent);
    this.mapper.set('mapTraits', NormalizerConfigMapTraitsComponent);
    this.loadConfigComponents();
  }

  loadConfigComponents() {
    const item = this.mapper.get(this.step.normalizer) || NormalizerConfigNoopComponent;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(item);
    const viewContainerRef = this.configHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as NormalizerStepConfigComponent).config = this.step.config;
  }

}
