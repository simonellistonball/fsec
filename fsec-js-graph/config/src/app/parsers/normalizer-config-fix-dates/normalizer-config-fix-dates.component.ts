import { Component, OnInit } from '@angular/core';
import { NormalizerStepConfigComponent } from '../nomralizer-step-config-component';

@Component({
  selector: 'app-normalizer-config-fix-dates',
  templateUrl: './normalizer-config-fix-dates.component.html',
  styleUrls: ['./normalizer-config-fix-dates.component.scss']
})
export class NormalizerConfigFixDatesComponent implements OnInit, NormalizerStepConfigComponent {
  config: any;

  constructor() { }

  ngOnInit() {
  }

}
