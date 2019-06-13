import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { SensorListEntry, SensorState } from './state/sensor.state';
import { Observable } from 'rxjs';
import { GetSensorsAction } from './state/sensor.actions';
import { tap } from 'rxjs/operators';
import { SearchSpec } from '../search-spec';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {
  sortName: string | null = null;
  sortValue: string | null = null;
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  loading = false;

  booleanFilter = [ 'true', 'false' ].map((v) => ({ text: v, value: v }));
  mapOfExpandData: { [key: string]: boolean } = {};

  @Select(SensorState.getSensorList) dataSet: Observable<SensorListEntry[]>;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.search();
  }

  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  filter(): void {
    this.search();
  }

  search(): void {
    //this.loading = true;
    this.store.dispatch(new GetSensorsAction(new SearchSpec(this.sortName, this.sortValue)));
  }

}
