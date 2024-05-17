import { Injectable } from '@angular/core';
import { CadastroProduto } from '../componentes/cadastro-produto/cadastro-produto';

@Injectable({
  providedIn: 'root'
})
export class EnviarProdutoService {

  private produto!: CadastroProduto | null;

  constructor() { }

  setProduto(produto: CadastroProduto) {
    this.produto = produto;
  }

  getProduto() {
    return this.produto;
  }

  clearProduto() {
    this.produto = null;
  }
  
}
