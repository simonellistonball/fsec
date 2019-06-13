import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnrichmentConfig } from './enrichments/state/enrichment-configs.state';

@Injectable({
  providedIn: 'root'
})
export class EnrichmentConfigsService {
  base = '/api/v1/encrichmentConfigs';

  constructor(private http: HttpClient) { }

  searchConfigs(q: string) {
    return this.http.get<EnrichmentConfig[]>(this.base, { params: { q: q }});
  }
}
