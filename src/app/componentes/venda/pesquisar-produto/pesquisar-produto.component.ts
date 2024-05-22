import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProdutoVenda } from 'src/app/interfaces/produtoVenda';
import { CardHomeService } from '../../card-home.service';
import { IconeService } from 'src/app/services/icone.service';

@Component({
  selector: 'app-pesquisar-produto',
  templateUrl: './pesquisar-produto.component.html',
  styleUrls: ['./pesquisar-produto.component.css']
})
export class PesquisarProdutoComponent {

  @Input() listaDeProdutos: ProdutoVenda[] = [];
  @Output() visivel = new EventEmitter();
  @Output() enviarProdutoParaAdd = new EventEmitter<ProdutoVenda>();

  listaDeProdutosEncontrados: ProdutoVenda[] = []

  constructor(private service: CardHomeService, private icone: IconeService){}

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  procurarProduto(nome: string) {
    this.service.pesquisarPorNome(nome).subscribe((listaProdutosRetornados) => {
      this.listaDeProdutosEncontrados = listaProdutosRetornados;
    });
  }
  toggleJanela() {
    this.visivel.emit();
  }
  adicionar(index: number) {
    let produto = this.listaDeProdutosEncontrados[index];
    this.enviarProdutoParaAdd.emit(produto);
    //this.listaDeProdutos.push(produto);
  }

}
