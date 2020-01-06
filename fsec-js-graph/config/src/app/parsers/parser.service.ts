import { Injectable } from '@angular/core';
import { CrudService } from '../crud.service';
import { ParserStateModel, ParserCreateRequest, ParserChainEntry, NormalizeChainEntry, ParsedLine } from './state/parser.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParserService extends CrudService<ParserStateModel, ParserCreateRequest> {
  base = '/api/v1/parsers';
  rawBase = '/api/v1/rawlines';
  parserBase = '/api/v1/parseRun';

  searchRaw(search: {
    source: string,
    search: string,
    advancedClustering: boolean
  }) {
    return this.http.post<{ raw: string[], parsed: ParsedLine[] }>(this.rawBase, search);
  }

  parse(rawLines: string[], parserConfig: { parseChain: ParserChainEntry[], normalizeChain: NormalizeChainEntry[] }){
    return this.http.post<ParsedLine[]>(this.parserBase, { rawLines, parserConfig });
  }

  upload() {

  }
}
