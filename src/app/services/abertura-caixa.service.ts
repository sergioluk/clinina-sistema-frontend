import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AberturaCaixaService {

  isCaixaAberto: boolean = false;

  constructor() { }

  abrirCaixa() {
    this.isCaixaAberto = true;
  }
  fecharCaixa() {
    this.isCaixaAberto = false;
  }
  verificarCaixa() {
    return this.isCaixaAberto;
  }
}
