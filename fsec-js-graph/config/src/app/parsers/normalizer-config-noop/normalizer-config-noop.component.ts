import { Component, OnInit } from '@angular/core';
import { NormalizerStepConfigComponent } from '../nomralizer-step-config-component';

@Component({
  selector: 'app-normalizer-config-noop',
  templateUrl: './normalizer-config-noop.component.html',
  styleUrls: ['./normalizer-config-noop.component.scss']
})
export class NormalizerConfigNoopComponent implements OnInit, NormalizerStepConfigComponent {
  config: any;

  constructor() { }

  ngOnInit() {
  }

}
