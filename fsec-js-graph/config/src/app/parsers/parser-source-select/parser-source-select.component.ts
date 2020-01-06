import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { KafkaService } from 'src/app/kafka.service';
import { Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-parser-source-select',
  templateUrl: './parser-source-select.component.html',
  styleUrls: ['./parser-source-select.component.scss']
})
export class ParserSourceSelectComponent implements OnInit {

  uploadVisible$ = new BehaviorSubject<boolean>(false);
  kafkaVisible$ = new BehaviorSubject<boolean>(false);
  urlVisible$ = new BehaviorSubject<boolean>(false);

  @Input() manual = true;
  @Input() search = true;
  @Input() advancedClustering = false;
  @Input() kafka = true;
  @Input() upload = true;

  @Output() dosearch = new EventEmitter();

  form = this.fb.group({
    rawSource: [''],
    kafkaTopic: [''],
    search: [''],
    url: [''],
    advancedClustering: ['']
  });

  isLoading = false;
  kafkaSearchChange$ = new BehaviorSubject('');
  optionList: string[];

  constructor(private fb: FormBuilder, private kafkaService: KafkaService, private store: Store) { }

  ngOnInit() {
    this.registerFormActions();
    if (this.kafka) {
      this.kafkaSearchChange$.asObservable().pipe(
        debounceTime(500),
        distinctUntilChanged()).subscribe((value) => {
          this.kafkaService.searchTopics(value).subscribe((results) => {
            this.optionList = results;
            this.isLoading = false;
            console.log(results);
          });
        });
    }
  }

  registerFormActions() {
    this.form.get('rawSource').valueChanges.subscribe(v => {
      if (v === 'manual') {
        this.urlVisible$.next(false);
        this.kafkaVisible$.next(false);
        this.uploadVisible$.next(false);
      }
      if (v === 'kafka') {
        this.urlVisible$.next(false);
        this.kafkaVisible$.next(true);
        this.uploadVisible$.next(false);
      }
      if (v === 'url') {
        this.urlVisible$.next(true);
        this.kafkaVisible$.next(false);
        this.uploadVisible$.next(false);
      }
      if (v === 'upload') {
        this.urlVisible$.next(false);
        this.kafkaVisible$.next(false);
        this.uploadVisible$.next(true);
      }
      this.submit();
    });

    this.form.get('advancedClustering').valueChanges.subscribe(v => {
      this.submit();
    });
    this.form.get('search').valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged()).subscribe(v => {
      this.submit();
    });
  }

  submit() {
    if (this.form.valid) {
      this.dosearch.emit(this.form.value);
    }
  }

  onSearchKafka(value: string) {
    console.log('Searching kafka', value);
    this.kafkaSearchChange$.next(value);
    this.isLoading = true;
  }

}
