import { Component, OnInit, Input } from '@angular/core';
import { ParserStepConfigComponent } from '../parser-step-config-component';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-parser-router-config',
  templateUrl: './parser-router-config.component.html',
  styleUrls: ['./parser-router-config.component.scss']
})
export class ParserRouterConfigComponent implements OnInit, ParserStepConfigComponent {

  private config$ = new BehaviorSubject<any>({});
  @Input('config') set config(config: any) { this.config$.next(config); };
  private dataSet: any[];
  private editId: number;

  @Input() public inputFields: string[];

  validateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      routingField: ['', [Validators.required]],
      routeEditor: ['']
    });
  }

  ngOnInit() {
    this.config$.subscribe((c) => {
      this.dataSet = Object.keys(c)
        .filter(k => k !== 'route')
        .map((k, i) => {
          return {
            id: i, route: k, parseChain: c[k].parseChain
          };
        });
    });
  }
  
  startEdit(id: number, value: string, event: MouseEvent): void {
    this.validateForm.get('routeEditor').setValue(value);
    event.preventDefault();
    event.stopPropagation();
    this.editId = id;
  }

  submitForm(value: any): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }
}


