import { Component, OnInit } from '@angular/core';
import { NormalizerStepConfigComponent } from '../nomralizer-step-config-component';

@Component({
  selector: 'app-normalizer-config-script',
  templateUrl: './normalizer-config-script.component.html',
  styleUrls: ['./normalizer-config-script.component.scss']
})
export class NormalizerConfigScriptComponent implements OnInit, NormalizerStepConfigComponent {
  config: any;

  constructor() { }

  ngOnInit() {
  }

}
