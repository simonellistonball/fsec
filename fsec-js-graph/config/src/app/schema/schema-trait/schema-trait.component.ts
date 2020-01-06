import { Component, OnInit, ContentChild, TemplateRef, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { SchemaState, SchemaStatesModel, SchemaLink } from '../state/schemas.state';
import { Observable } from 'rxjs';
import { NgxD3Service } from '@katze/ngx-d3';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schema-trait',
  templateUrl: './schema-trait.component.html',
  styleUrls: ['./schema-trait.component.css']
})
export class SchemaTraitComponent implements OnInit {
  @ContentChild('linkTemplate', {static: true}) linkTemplate: TemplateRef<any>;
  @Select(SchemaState.getLinks) links: Observable<SchemaLink[]>;
  @Select(SchemaState.getSchema)
  models: Observable<SchemaStatesModel>;

  @Input()
  edit = false;

  private readonly d3 = this.ngxD3Service.getD3();

  constructor(private readonly ngxD3Service: NgxD3Service, private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {}
}
