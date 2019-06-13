import { Component } from '@angular/core';
import { RouteHandler } from './route-handler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin';
  isCollapsed = false;
  isReverseArrow = false;
  width = 250;

  constructor(private routeHandler: RouteHandler) {}
}
