import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardHomeService } from 'src/app/componentes/card-home.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit, OnDestroy {

  private timer: any;
  //private tempo = 300000;
  private tempo = 180000;

  constructor(
    private service: CardHomeService
  ) {}
  
  ngOnInit(): void {
     // Verifica se já existe um timer ativo e limpa-o
    if(this.timer) {
      clearInterval(this.timer);
    }
    //Criar um novo timer
    this.timer = setInterval(() => {
      this.service.pingar().subscribe(
        (response: HttpResponse<{ message: string}>) => {
        console.log("Resposta do servidor: ", response.body?.message); // Mensagem do corpo da resposta
        console.log("Código de status HTTP: ", response.status); // Código de status HTTP
        },
        (error: HttpErrorResponse) => {
          console.error("Erro: ", error.message); // Mensagem de erro
          console.error("Código de status HTTP: ", error.status); // Código de status HTTP do erro
        }
      );
    }, this.tempo);
  }

  ngOnDestroy(): void {
    if(this.timer) {
      clearInterval(this.timer);
    }
  }

  teste() {
    console.log("clicou")
    this.service.pingar().subscribe(
      (response: HttpResponse<{ message: string}>) => {
      console.log("Resposta do servidor: ", response.body?.message); // Mensagem do corpo da resposta
      console.log("Código de status HTTP: ", response.status); // Código de status HTTP
      },
      (error: HttpErrorResponse) => {
        console.error("Erro: ", error.message); // Mensagem de erro
        console.error("Código de status HTTP: ", error.status); // Código de status HTTP do erro
      }
    );
  }

}
