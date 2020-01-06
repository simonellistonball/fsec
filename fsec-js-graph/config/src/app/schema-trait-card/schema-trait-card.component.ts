import { Component, OnInit, Input, AfterViewInit, ViewChildren, QueryList, Directive, ElementRef, OnDestroy } from '@angular/core';
import { Store, Actions, ofActionSuccessful, Select, Selector } from '@ngxs/store';
import { TraitsLaidOutAction } from '../schema/state/schema-links.actions';
import { Navigate, RouterDataResolved, RouterState } from '@ngxs/router-plugin';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { ChangeEditModeAction } from '../schema/state/schemas.actions';

@Directive({
  selector: '[appTrait]'
})
export class TraitDirective {
  constructor(public el: ElementRef<TraitDirective>) {}
}

@Component({
  selector: 'app-schema-trait-card',
  templateUrl: './schema-trait-card.component.html',
  styleUrls: ['./schema-trait-card.component.scss']
})
export class SchemaTraitCardComponent implements OnInit, AfterViewInit, OnDestroy {

  @Select(RouterState.state) routerState: Observable<RouterStateSnapshot>;

  constructor(private store: Store, actions$: Actions) {
    actions$.pipe(
      ofActionSuccessful(RouterDataResolved),
      takeUntil(this.destroy$)
    ).subscribe((action: RouterDataResolved) => {
      console.log(action.routerState.root.firstChild.data);
    });
  }
  @Input()
  data: any;

  @ViewChildren('fieldItem')
  childrenV: QueryList<any>;

  private destroy$ = new Subject<void>();

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngAfterViewInit(): void {
    const fields = [];
    this.childrenV.forEach((r) => {
      fields.push(r.nativeElement.getClientRects()[0]);
    });
    const locs = this.data.fields.map(f => f.id)
      .map((k, i) => { return { field: k, rect: fields[i] } });

    /*this.store.dispatch(new TraitsLaidOutAction({
      trait: this.data.id,
      fields: locs
    }));*/

    console.log({
      trait: this.data.id,
      fields: locs
    });

    this.childrenV.changes.subscribe((c) => {
      console.log('changes to fields', c);
    });
  }

  enrichment(data: any) {
    this.store.dispatch(new Navigate(['/schemas/' + data.id + '/trait-enrichments', ]));
  }
  edit(data: any) {
    this.store.dispatch(new ChangeEditModeAction(data.id));
  }

}
