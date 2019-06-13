import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { SchemaState, SchemaStatesModel } from '../schema/state/schemas.state';
import { Observable } from 'rxjs';
import { NgxD3Service } from '@katze/ngx-d3';

@Component({
  selector: 'app-schema-trait',
  templateUrl: './schema-trait.component.html',
  styleUrls: ['./schema-trait.component.css']
})
export class SchemaTraitComponent implements OnInit {
  @ContentChild('linkTemplate', {static: true}) linkTemplate: TemplateRef<any>;

  @Select(SchemaState.getSchema)
  models: Observable<SchemaStatesModel>;

  constructor(private readonly ngxD3Service: NgxD3Service, private store: Store) { }
  private readonly d3 = this.ngxD3Service.getD3();

  ngOnInit() {}

}
