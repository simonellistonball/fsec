import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KafkaService {
  base = '/api/v1/kafkaTopics';

  constructor(private http: HttpClient) { }

  searchTopics(search: string) {
    console.log("Searching kafka", search)
    return this.http.post<string[]>(this.base + '/search', { q: search });
  }
}
