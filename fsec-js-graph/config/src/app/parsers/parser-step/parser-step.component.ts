import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, Type } from '@angular/core';
import { ParserChainEntry } from '../state/parser.state';
import { ParserStepConfigHostDirective } from '../parser-step-config-host.directive';
import { ParserStepConfigComponent } from '../parser-step-config-component';
import { ParserConfigNoopComponent } from '../parser-config-noop/parser-config-noop.component';
import { ParserRouterConfigComponent } from '../parser-router-config/parser-router-config.component';
import { FormControl } from '@angular/forms';
import { ParserConfigGrokComponent } from '../parser-config-grok/parser-config-grok.component';

@Component({
  selector: 'app-parser-step',
  templateUrl: './parser-step.component.html',
  styleUrls: ['./parser-step.component.scss']
})
export class ParserStepComponent implements OnInit {
  tabIndex = 0;
  mapper: Map<string, Type<ParserStepConfigComponent>> = new Map();
  advancedEditor = new FormControl('');

  @Input() previousStep: ParserChainEntry;
  @Input() step: ParserChainEntry;
  @ViewChild(ParserStepConfigHostDirective, {static: false}) configHost: ParserStepConfigHostDirective;

  editorOptions = {
    theme: 'vs-light',
    language: 'json',
    minimap: { enabled: false }
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.mapper.set('fsec.parser.Router', ParserRouterConfigComponent);
    this.mapper.set('fsec.parser.GrokParser', ParserConfigGrokComponent);
    this.loadConfigComponents();
    this.advancedEditor.setValue(JSON.stringify(this.step, null, 2));
  }

  changeTab() {
    if (this.tabIndex === 1) {
      this.loadConfigComponents();
    }
  }

  loadConfigComponents() {
    if (this.tabIndex === 1) {
      const item = this.mapper.get(this.step.parser) || ParserConfigNoopComponent;
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(item);
      const viewContainerRef = this.configHost.viewContainerRef;
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent(componentFactory);
      (componentRef.instance as ParserStepConfigComponent).config = this.step.config;
      if (this.previousStep) {
        (componentRef.instance as ParserStepConfigComponent).inputFields = this.previousStep.outputFields;
      }
    }
  }
}
