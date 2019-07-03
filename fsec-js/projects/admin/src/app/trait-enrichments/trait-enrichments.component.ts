import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetTraitEnrichmentsAction } from './state/trait-enrichments.actions';

@Component({
  selector: 'app-trait-enrichments',
  templateUrl: './trait-enrichments.component.html',
  styleUrls: ['./trait-enrichments.component.css']
})
export class TraitEnrichmentsComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() {}

}
