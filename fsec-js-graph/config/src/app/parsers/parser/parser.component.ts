import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ParserState, ParserChainEntry, NormalizeChainEntry, ParsedLine, OutputField } from '../state/parser.state';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { GetParserAction } from '../state/parser.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SelectFactory } from '@ngxs/store/src/decorators/select/select-factory';

@Component({
  selector: 'app-parser',
  templateUrl: './parser.component.html',
  styleUrls: ['./parser.component.scss']
})
export class ParserComponent implements OnInit {

  @Select(ParserState.getChain) chain: Observable<ParserChainEntry[]>;
  @Select(ParserState.getNormalizer) normals: Observable<NormalizeChainEntry[]>;
  @Select(ParserState.getRaw) raw: Observable<string[]>;
  @Select(ParserState.getParsed) parsedLines: Observable<ParsedLine[]>;

  validateForm: FormGroup;

  @Select(ParserState.getOutputFields) outputFields: Observable<OutputField[]>;

  submitForm(): void {
  }

  constructor(private route: ActivatedRoute, private store: Store, private fb: FormBuilder) {}

  ngOnInit() {
      this.route.params
        .subscribe((data: any) => {
          this.store.dispatch(new GetParserAction(data.id));
        });

      this.validateForm = this.fb.group({
        name: [null, [Validators.required]]
      });
  }

}
