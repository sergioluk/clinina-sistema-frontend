import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'clinina';

  //Custom meu pra baixo

  constructor(private router: Router, public login: LoginService) {}

  currentComponent: string | undefined;

  ngOnInit() {
    //Verificar se não está logado e redirecionar para a pagina de login
    if (this.login.getUsuario() == null) {
      this.router.navigate(['/login']);
    }
  }

}
