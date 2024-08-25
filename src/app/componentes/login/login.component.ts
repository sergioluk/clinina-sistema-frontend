import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CardHomeService } from '../card-home.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/produtoVenda';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  formulario!: FormGroup;
  loadingSpinner = false;
  loginFalhou = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: CardHomeService,
    private snackbar: SnackbarService,
    private router: Router,
    private login: LoginService
  ){}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      usuario: [''],
      senha: ['']
    });
  }

  logar() {

    if (!this.formulario.valid) {
      this.snackbar.openSnackBarFail("Formulário não está válido!!!","Fechar");
      return;
    }

    this.loadingSpinner = true;
    this.service.logar(this.formulario.value).subscribe({
      next: (response: HttpResponse<Login>) => {
        this.loadingSpinner = false;
        if (response.body != null) {
          this.login.setUsuario(response.body);
          this.snackbar.openSnackBarSucces("Logado com sucesso!!!", "Fechar");
          this.router.navigate(['/venda']);
        } else {
          this.loginFalhou = true;
          this.formulario.get('senha')?.setValue('');
          this.snackbar.openSnackBarFail("Usuário ou senha incorretos!", "Fechar");
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error("Erro: ", error.message);
        console.error("Código de status HTTP: ", error.status);
        this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
        this.loadingSpinner = false;
      },
      complete: () => {
        console.log("Requisição completa!!!");
      }
    });

  }
  
}
