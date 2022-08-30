import { Component } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'emeryporter-net';
  currentRouteName: string = "";
  routeNames: string[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  public onRouteDropdownOpenChange(isOpen: boolean): void {
    if(isOpen) {
      this.routeNames = this.getRouteNames();
    }
  }

  public onRouteActivated(): void {
    this.currentRouteName = this.getMainRouteFromURL();
  }

  private getMainRouteFromURL(): string {
    return this.router.url.split('/')[1];
  }

  private getRouteNames(): string[] {
    let routeNames: string[] = [];
    this.router.config.forEach(route => {
      if(route.path != undefined && route.path != "**" && route.path != this.currentRouteName) {
        routeNames.push(route.path);
      }
    });
    return routeNames;
  }
}
