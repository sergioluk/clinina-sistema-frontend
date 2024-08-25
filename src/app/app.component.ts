import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'clinina';

  //Custom meu pra baixo

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  currentComponent: string | undefined;

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.activatedRoute.firstChild;
      while (route?.firstChild) {
        route = route.firstChild;
      }
      const routeSnapshot = route?.snapshot;
      if (routeSnapshot) {
        this.currentComponent = routeSnapshot.component?.name;
      }
    });
  }

}
