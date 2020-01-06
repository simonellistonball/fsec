import { Component, OnInit, Input } from '@angular/core';
import { ParsedLine, ParserState } from '../state/parser.state';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-output-lines',
  templateUrl: './output-lines.component.html',
  styleUrls: ['./output-lines.component.scss']
})
export class OutputLinesComponent implements OnInit {

  @Select(ParserState.getParsed)
  lines: Observable<ParsedLine[]>;

  constructor(private store: Store) { }

  ngOnInit() {
  }

}
