import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { ProdutoVenda } from 'src/app/interfaces/produtoVenda';
import { CardHomeService } from '../../card-home.service';

@Component({
  selector: 'app-pesquisar-produto',
  templateUrl: './pesquisar-produto.component.html',
  styleUrls: ['./pesquisar-produto.component.css']
})
export class PesquisarProdutoComponent {

  @Input() listaDeProdutos: ProdutoVenda[] = [];
  @Output() visivel = new EventEmitter();
  @Output() enviarProdutoParaAdd = new EventEmitter<ProdutoVenda>();

  faMagnifyingGlass = faMagnifyingGlass;
  faCartPlus = faCartPlus;

  listaDeProdutosEncontrados: ProdutoVenda[] = []

  constructor(private service: CardHomeService){}

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
