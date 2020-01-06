import { Injectable } from '@angular/core';
import { CrudService } from '../crud.service';
import { EnrichmentConfig } from './state/enrichment-configs.state';

@Injectable({
  providedIn: 'root'
})
export class EnrichmentConfigsService extends CrudService<EnrichmentConfig, EnrichmentConfig> {
  base = '/api/v1/enrichments';
}
