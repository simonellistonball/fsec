import { Component, OnInit, Input, ContentChild, TemplateRef, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, ViewChild, Directive, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, ContentChildren, QueryList } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { SchemaState, SchemaStatesModel } from '../schema/state/schemas.state';
import { Observable } from 'rxjs';
import { NgxD3Service } from '@katze/ngx-d3';
import { Navigate } from '@ngxs/router-plugin';

@Directive({
  selector: "app-trait"
})
export class TraitDirective {}

@Component({
  selector: 'app-schema-trait',
  templateUrl: './schema-trait.component.html',
  styleUrls: ['./schema-trait.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SchemaTraitComponent implements OnInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
  @ContentChild('linkTemplate', {static: true}) linkTemplate: TemplateRef<any>;

  @ContentChildren(TraitDirective)
  cards !: QueryList<TraitDirective>;

  @Select(SchemaState.getSchema)
  models: Observable<SchemaStatesModel>;

  links: any[]

  constructor(private readonly ngxD3Service: NgxD3Service, private store: Store) { }
  private readonly d3 = this.ngxD3Service.getD3();

  ngOnInit() {
    this.models.subscribe((m)=> {
      if (m && m.links) {
        this.links = m.links.map(l => l);
      }
    });

  }

  enrichment(data: any) {
    this.store.dispatch(new Navigate(['/trait-enrichments/', data.id]));
  }
  edit(data: any) {

  }
  more(data: any) {
  }

  ngAfterViewInit() {

  }

  ngAfterViewChecked() {
    console.log(this.cards)
  }
  ngAfterContentChecked() {

    //this.d3.selectAll("nz-card.trait").attr("style", "border: 5px solid red");
    //this.d3.selectAll("svg path.edge").data(this.links).enter().
  }
}
