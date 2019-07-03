import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnrichmentConfig } from './enrichments/state/enrichment-configs.state';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class EnrichmentConfigsService extends CrudService<EnrichmentConfig,EnrichmentConfig> {
  base = '/api/v1/enrichments';
}
