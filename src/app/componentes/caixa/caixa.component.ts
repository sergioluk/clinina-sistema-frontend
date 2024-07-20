import { Component } from '@angular/core';
import { IconeService } from 'src/app/services/icone.service';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent {

  start: Date = new Date();
  end!: Date;
  modoEdicaoAbertura = false;
  modoEdicaoDespesas = false;
  caixaAberto = false;

  constructor(private icone: IconeService) {}

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
    let end_dia = 0;
    let end_mes = 0;
    let end_ano = 0;
    if (this.start != null) {
      start_dia = this.start.getDate();
      start_mes = this.start.getMonth() + 1;
      start_ano = this.start.getFullYear();
    }
    if (this.end != null) {
      end_dia = this.end.getDate();
      end_mes = this.end.getMonth() + 1;
      end_ano = this.end.getFullYear();
    }

    const data = {
      start_dia: start_dia,
      start_mes: start_mes,
      start_ano: start_ano,
      end_dia: end_dia,
      end_mes: end_mes,
      end_ano: end_ano
    }
    return data;
  }
  mostrarData() {
    let data = this.getData();
    let start_dia = this.formatarDigito(data.start_dia);
    let start_mes = this.formatarDigito(data.start_mes);
    let end_dia = this.formatarDigito(data.end_dia);
    let end_mes = this.formatarDigito(data.end_mes);

    let titulo = start_dia + "/" + start_mes + "/" + data.start_ano;

    if (data.end_dia > 0 || data.end_mes > 0 || data.end_ano > 0) {
      titulo = titulo + " até " + end_dia + "/" + end_mes + "/" + data.end_ano;
    }

    return titulo;
  }

  formatarDigito(numero: number) {
    return numero < 10 ? "0" + numero : numero.toString();
  }

}
