import { Component, OnInit, Input } from '@angular/core';
import { ParserStepConfigComponent } from '../parser-step-config-component';

@Component({
  selector: 'app-parser-config-noop',
  templateUrl: './parser-config-noop.component.html',
  styleUrls: ['./parser-config-noop.component.scss']
})
export class ParserConfigNoopComponent implements OnInit, ParserStepConfigComponent {

  @Input() public config: any;
  @Input() public inputFields: string[];
  constructor() { }

  ngOnInit() {
  }

}
