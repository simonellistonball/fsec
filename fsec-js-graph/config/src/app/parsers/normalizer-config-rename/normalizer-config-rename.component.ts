import { Component, OnInit } from '@angular/core';
import { NormalizerStepConfigComponent } from '../nomralizer-step-config-component';

@Component({
  selector: 'app-normalizer-config-rename',
  templateUrl: './normalizer-config-rename.component.html',
  styleUrls: ['./normalizer-config-rename.component.scss']
})
export class NormalizerConfigRenameComponent implements OnInit, NormalizerStepConfigComponent {
  config: any;

  constructor() { }

  ngOnInit() {
  }

}
