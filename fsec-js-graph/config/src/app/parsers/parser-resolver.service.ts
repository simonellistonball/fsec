import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GetParserAction } from './state/parser.actions';

@Injectable({
  providedIn: 'root'
})
export class ParserResolverService implements Resolve<any>{

  constructor(private store: Store, private router: Router) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('id');
    this.store.dispatch(new GetParserAction(id));
  }
}
