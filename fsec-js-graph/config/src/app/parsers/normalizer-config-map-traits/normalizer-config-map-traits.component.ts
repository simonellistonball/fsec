import { Component, OnInit } from '@angular/core';
import { NormalizerStepConfigComponent } from '../nomralizer-step-config-component';

@Component({
  selector: 'app-normalizer-config-map-traits',
  templateUrl: './normalizer-config-map-traits.component.html',
  styleUrls: ['./normalizer-config-map-traits.component.scss']
})
export class NormalizerConfigMapTraitsComponent implements OnInit, NormalizerStepConfigComponent {
  config: any;

  constructor() { }

  ngOnInit() {
  }

}
