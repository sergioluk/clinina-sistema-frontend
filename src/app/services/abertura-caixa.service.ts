import { Injectable, OnInit } from '@angular/core';
import { CardHomeService } from '../componentes/card-home.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Caixa } from '../interfaces/produtoVenda';
import { SnackbarService } from './snackbar.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AberturaCaixaService implements OnInit{

  private caixaStatusSubject = new BehaviorSubject<string>('disponível');
  caixaStatus$ = this.caixaStatusSubject.asObservable();

  constructor(
    private service: CardHomeService,
    private snackbar: SnackbarService
  ) {}
  
  ngOnInit(): void {
    console.log("Ligando");
    this.exibirCaixa();
  }

  abrirCaixa() {
    this.caixaStatusSubject.next('aberto');
  }
  fecharCaixa() {
    this.caixaStatusSubject.next('fechado');
  }
  verificarCaixa() {
    return this.caixaStatusSubject.value;
  }


  exibirCaixa() {
    const data = this.getData();
    this.service.buscarCaixa(data).subscribe({
      next: (response: HttpResponse<Caixa>) => {
        if (response.body != null) {
            response.body;
          if (response.body.status == "aberto") {
            this.abrirCaixa();
          } else if (response.body.status == "fechado") {
            this.fecharCaixa();
          }
        } 
        this.snackbar.openSnackBarSucces("Serviço concluído!","Fechar");
      },
      error: (error: HttpErrorResponse) => {
        console.error("Erro: ", error.message);
        console.error("Código de status HTTP: ", error.status);
        this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
      },
      complete: () => {
        console.log("Requisição completa!!!");
      }
    });
  }

  getData() {
    let start_dia = 0;
    let start_mes = 0;
    let start_ano = 0;
    let dataHoje = new Date();
    if (dataHoje != null) {
      start_dia = dataHoje.getDate();
      start_mes = dataHoje.getMonth() + 1;
      start_ano = dataHoje.getFullYear();
    }

    const data = {
      start_dia: start_dia,
      start_mes: start_mes,
      start_ano: start_ano,
    }
    return data;
  }

}
