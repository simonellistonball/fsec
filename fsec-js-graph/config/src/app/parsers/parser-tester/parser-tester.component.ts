import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ParserState, ParserTestRun } from '../state/parser.state';
import { Observable } from 'rxjs';
import { RequestNewTestAction, RunTestAction } from '../state/parser.actions';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-parser-tester',
  templateUrl: './parser-tester.component.html',
  styleUrls: ['./parser-tester.component.scss']
})
export class ParserTesterComponent implements OnInit {

  mapOfExpandData: { [key: string]: boolean } = {};

  @Select(ParserState.getTests) dataSet: Observable<ParserTestRun[]>;
  @Select(ParserState.creatingTest) creatingTest: Observable<boolean>;

  testForm = this.fb.group({
    runCount: [''],
    kafkaTopic: [''],
    url: [''],
    rawSource: [''],
    generationRate: ['']
  });

  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit() {
  }

  newTest() {
    this.store.dispatch(new RequestNewTestAction());
  }

  submitTestForm(value: any) {
    this.store.dispatch(new RunTestAction(this.testForm.value));
  }
}
