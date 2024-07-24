import { Component, OnInit } from '@angular/core';
import { IconeService } from 'src/app/services/icone.service';
import { CardHomeService } from '../card-home.service';
import { Caixa } from 'src/app/interfaces/produtoVenda';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent implements OnInit {

  start: Date = new Date();
  end!: Date;
  modoEdicaoAbertura = false;
  modoEdicaoDespesas = false;
  caixaAberto = false;
  loadingSpinner = false;
  abrirCaixaInput: number = 0;

  caixa: Caixa = {
    abertura_data: null,
    abertura_valor: 0,
    despesas_caixa: 0,
    entrada: 0,
    fechamento_caixa_data: null,
    fechamento_caixa_valor: 0,
    credito_conferido: 0,
    debito_conferido: 0,
    dinheiro_conferido: 0,
    pix_conferido: 0,
    fiado_conferido: 0
  }

  constructor(
    private icone: IconeService,
    private service: CardHomeService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    const data = this.getData();
    this.exibirCaixa(data);
  }

  exibirCaixa(data: {start_dia: number, start_mes: number, start_ano: number} ) {
    this.loadingSpinner = true;
    this.service.buscarCaixa(data).subscribe({
      next: (response: HttpResponse<Caixa>) => {
        if (response.body != null) {
          this.caixa = response.body;
          this.abrirCaixaInput = this.caixa.abertura_valor;
        }
        this.loadingSpinner = false;
        this.snackbar.openSnackBarSucces("Pesquisa concluída!","Fechar");
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

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  toggleEdicaoAbertura() {
    this.modoEdicaoAbertura = !this.modoEdicaoAbertura;
  }
  toggleEdicaoDespesas() {
    this.modoEdicaoDespesas = !this.modoEdicaoDespesas;
  }

  pesquisar() {

  }
  getData() {
    let start_dia = 0;
    let start_mes = 0;
    let start_ano = 0;
    if (this.start != null) {
      start_dia = this.start.getDate();
      start_mes = this.start.getMonth() + 1;
      start_ano = this.start.getFullYear();
    }

    const data = {
      start_dia: start_dia,
      start_mes: start_mes,
      start_ano: start_ano,
    }
    return data;
  }
  mostrarData() {
    let data = this.getData();
    let start_dia = this.formatarDigito(data.start_dia);
    let start_mes = this.formatarDigito(data.start_mes);

    let titulo = start_dia + "/" + start_mes + "/" + data.start_ano;

    return titulo;
  }

  formatarDigito(numero: number) {
    return numero < 10 ? "0" + numero : numero.toString();
  }

  abrirCaixa() {
    if (this.abrirCaixaInput == 0) {
      this.snackbar.openSnackBarFail("Precisa inserir o valor de abertura!!","Fechar");
      return;
    }
  }

}
