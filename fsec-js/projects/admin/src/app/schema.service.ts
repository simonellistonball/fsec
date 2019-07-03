import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SchemaStateModel } from './schema/state/schemas.state';
import { SchemaFieldWithEnrichment } from './trait-enrichments/state/trait-enrichments.state';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  base = '/api/v1/schemas';

  constructor(private http: HttpClient) { }

  getSchemas() {
    return this.http.get<{ id: string, name: string }[]>(this.base, { params: { format: 'list'}});
  }

  getSchemaDetails(name: string) {
    return this.http.get<SchemaStateModel>(this.base + '/' + name);
  }

  getEnrichments(id: string) {
    return this.http.get<SchemaFieldWithEnrichment[]>(this.base + '/' + id + '/enrichments');
  }
}