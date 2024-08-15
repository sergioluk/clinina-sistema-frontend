import { Component, OnInit } from '@angular/core';
import { IconeService } from 'src/app/services/icone.service';
import { CardHomeService } from '../card-home.service';
import { Caixa } from 'src/app/interfaces/produtoVenda';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AberturaCaixaService } from 'src/app/services/abertura-caixa.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent implements OnInit {

  start: Date = new Date();
  modoEdicaoAbertura = false;
  modoEdicaoDespesas = false;
  caixaAberto: string = 'disponível';
  loadingSpinner = false;
  abrirCaixaInput: number = 0;
  despesasInput: number = 0;

  caixa: Caixa = {
    abertura_data: new Date(),
    abertura_valor: this.abrirCaixaInput,
    despesas_caixa: 0,
    entrada: 0,
    fechamento_caixa_data: null,
    fechamento_caixa_valor: 0,
    credito_conferido: 0,
    debito_conferido: 0,
    dinheiro_conferido: 0,
    pix_conferido: 0,
    fiado_conferido: 0,
    status: ''
  }

  constructor(
    private icone: IconeService,
    private service: CardHomeService,
    private snackbar: SnackbarService,
    private caixaService: AberturaCaixaService
  ) {}

  ngOnInit() {
    this.caixaAberto = this.caixaService.verificarCaixa(); 
    this.exibirCaixa();
    
  }

  exibirCaixa() {
    const data = this.getData();
    this.loadingSpinner = true;
    this.service.buscarCaixa(data).subscribe({
      next: (response: HttpResponse<Caixa>) => {
        if (response.body != null) {
          this.caixa = response.body;
          this.abrirCaixaInput = this.caixa.abertura_valor;
          if (this.caixa.status == "aberto") {
            this.caixaService.abrirCaixa();
          } else if (this.caixa.status == "fechado") {
            this.caixaService.fecharCaixa();
          }
          this.caixaAberto = this.caixaService.verificarCaixa();
        } else {
          this.resetCaixa();
        }
        this.abrirCaixaInput = this.caixa.abertura_valor;
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

  resetCaixa() {
    this.caixa = {
      abertura_data: this.start,
      abertura_valor: 0,
      despesas_caixa: 0,
      entrada: 0,
      fechamento_caixa_data: null,
      fechamento_caixa_valor: 0,
      credito_conferido: 0,
      debito_conferido: 0,
      dinheiro_conferido: 0,
      pix_conferido: 0,
      fiado_conferido: 0,
      status: ''
    };
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

    this.loadingSpinner = true;
    this.caixa.status = "aberto";
    this.caixa.abertura_valor = this.abrirCaixaInput;
    this.service.abrirCaixa(this.caixa).subscribe({
      error: (error: HttpErrorResponse) => {
        console.error("Erro: ", error.message);
        console.error("Código de status HTTP: ", error.status);
        this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
        this.loadingSpinner = false;
        this.caixa.status = '';
      },
      complete: () => {
        this.caixaService.abrirCaixa();
        this.caixaAberto = this.caixaService.verificarCaixa();
        this.snackbar.openSnackBarSucces("Caixa aberto!!","Fechar");
        console.log("Requisição completa!!!");
        this.loadingSpinner = false;
      }
    });
  }
  
  fecharCaixa() {
    if (this.caixaAberto != 'Aberto') {
      this.snackbar.openSnackBarFail("Caixa precisa estar aberto para fazer o fechamento!","Fechar");
      return;
    }
    this.caixa.abertura_valor = this.abrirCaixaInput;
    this.caixa.despesas_caixa = this.despesasInput;

    this.loadingSpinner = true;
    this.caixa.status = "fechado";
    this.service.fecharCaixa(this.caixa).subscribe({
      error: (error: HttpErrorResponse) => {
        console.error("Erro: ", error.message);
        console.error("Código de status HTTP: ", error.status);
        this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
        this.loadingSpinner = false;
        this.caixa.status = 'aberto';
      },
      complete: () => {
        console.log("Requisição completa!!!");
        this.loadingSpinner = false;
        this.snackbar.openSnackBarSucces("Fechamento de caixa concluído!!","Fechar");
      }
    });
  }

  dateChangeEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (event.value != null)
      this.start = event.value;
    this.exibirCaixa();
  }

}
