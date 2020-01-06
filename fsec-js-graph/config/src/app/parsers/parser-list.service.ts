import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParserListEntry } from './state/parser-list.state';
import { Observable } from 'rxjs';

@Injectable()
export class ParserListService {
    constructor(private http: HttpClient) {}

    find(): Observable<ParserListEntry[]> {
        return this.http.get<ParserListEntry[]>('/api/v1/parsers?format=list');
    }
}
