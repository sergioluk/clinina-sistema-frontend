import { Component } from '@angular/core';
import { CadastroProduto } from '../cadastro-produto/cadastro-produto';
import { Router } from '@angular/router';
import { CardHomeService } from '../card-home.service';
import { EnviarProdutoService } from 'src/app/services/enviar-produto.service';
import { IconeService } from 'src/app/services/icone.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent {

  listaDeProdutos: CadastroProduto[] = [];

  constructor(private router: Router, private service: CardHomeService, private enviarProduto: EnviarProdutoService, private icone: IconeService) {}

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  pesquisar(texto: string) {
    this.service.pesquisarPorCodigoDeBarrasOuNome(texto).subscribe((lista) => {
      /*
      if (produto == null) {
        alert("Produto não encontrado!!!!");
        return;
      }*/
      this.listaDeProdutos = lista;
    });
  }
  cadastrarProduto() {
    this.router.navigate(['/cadastrarProduto']);
  }

  calcularLucro(produto: CadastroProduto) {
    if (!produto.precoCompra) {
      return "-";
    }
    let lucro = (produto.preco*100/produto.precoCompra) - 100;
    return lucro.toFixed(2);
  }
  editarItem(index: number) {
    let produto: CadastroProduto = this.listaDeProdutos[index];
    this.enviarProduto.setProduto(produto);
    this.router.navigate(['/cadastrarProduto']);
  }

}
