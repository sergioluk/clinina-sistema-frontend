import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProdutoVenda } from 'src/app/interfaces/produtoVenda';
import { CardHomeService } from '../../card-home.service';
import { IconeService } from 'src/app/services/icone.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-pesquisar-produto',
  templateUrl: './pesquisar-produto.component.html',
  styleUrls: ['./pesquisar-produto.component.css']
})
export class PesquisarProdutoComponent {

  @Input() listaDeProdutos: ProdutoVenda[] = [];
  @Output() visivel = new EventEmitter();
  @Output() enviarProdutoParaAdd = new EventEmitter<ProdutoVenda>();
  @Output() enviarProdutoComPesoParaAdd = new EventEmitter<ProdutoVenda>();
  @Output() spinnerEmitter = new EventEmitter<string>();

  listaDeProdutosEncontrados: ProdutoVenda[] = []

  constructor(private service: CardHomeService,
     private icone: IconeService,
     private snackbar: SnackbarService
    ){}

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  procurarProduto(nome: string) {
    this.spinnerEmitter.emit("true");
    this.service.pesquisarPorNome(nome).subscribe({
      next: (response: HttpResponse<ProdutoVenda[]>) => {
        response.body ? this.listaDeProdutosEncontrados = response.body : [];
      },
      error: (error: HttpErrorResponse) => {
        this.spinnerEmitter.emit("false");
        this.snackbar.openSnackBarFail("Algo deu errado " + error.status,"Fechar");
      },
      complete: () => {
        this.spinnerEmitter.emit("false");
        if (this.listaDeProdutosEncontrados.length <= 0) {
          this.snackbar.openSnackBarSucces("Nenhum produto encontrado!","Fechar");
          return;
        }
        this.snackbar.openSnackBarSucces("Produto encontrado com sucesso!","Fechar");
      }
    });
  }
  toggleJanela() {
    this.visivel.emit();
  }
  adicionar(index: number) {
    let produto = this.listaDeProdutosEncontrados[index];
    //se o produto for fracionado, mandar para o componente produto-peso
    if (produto.codigoDeBarras.length <= 3) {
      this.enviarProdutoComPesoParaAdd.emit(produto);
      return;
    }
    this.enviarProdutoParaAdd.emit(produto);
    //this.listaDeProdutos.push(produto);
  }

}
