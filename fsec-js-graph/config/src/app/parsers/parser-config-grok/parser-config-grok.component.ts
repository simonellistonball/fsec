import { Component, OnInit, Input } from '@angular/core';
import { ParserStepConfigComponent } from '../parser-step-config-component';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-parser-config-grok',
  templateUrl: './parser-config-grok.component.html',
  styleUrls: ['./parser-config-grok.component.scss']
})
export class ParserConfigGrokComponent implements OnInit, ParserStepConfigComponent {

  private config$ = new BehaviorSubject<any>({});
  @Input('config') set config(config: any) { this.config$.next(config); };
  @Input() public inputFields: string[];

  grokEditor = new FormControl('');

  editorOptions = {
    theme: 'vs-light',
    language: 'grok',
    minimap: { enabled: false }
  };

  constructor() {}

  ngOnInit() {
    this.config$.pipe(
      distinctUntilChanged()).
      subscribe((c) => {
        if (this.grokEditor.value !== c.pattern) {
          this.grokEditor.setValue(c.pattern);
        }
    });

    this.grokEditor.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged())
      .subscribe((content) => {
        this.config$.next({ ...this.config$.value, ...{ pattern: content }});
      });
  }
}
