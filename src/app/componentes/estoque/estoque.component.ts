import { Component } from '@angular/core';
import { CadastroProduto } from '../cadastro-produto/cadastro-produto';
import { Router } from '@angular/router';
import { CardHomeService } from '../card-home.service';
import { EnviarProdutoService } from 'src/app/services/enviar-produto.service';
import { IconeService } from 'src/app/services/icone.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css'],
})
export class EstoqueComponent {

  loadingSpinner: boolean = false;
  listaDeProdutos: CadastroProduto[] = [];

  constructor(
    private router: Router, 
    private service: CardHomeService, 
    private enviarProduto: EnviarProdutoService, 
    private icone: IconeService,
    private snackbar: SnackbarService) {}

  

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  pesquisar(texto: string) {
    this.loadingSpinner = true;
    this.service.pesquisarPorCodigoDeBarrasOuNome(texto).subscribe({
      next: (response: HttpResponse<CadastroProduto[]>) => {
        this.listaDeProdutos = response.body ? response.body : [];
        console.log("Código de status HTTP do Estoque: ", response.status);
        this.loadingSpinner = false;
        this.snackbar.openSnackBarSucces("Pesquisa concluída!","Fechar");
      },
      error: (error: HttpErrorResponse) => {
        console.error("Erro: ", error.message); // Mensagem de erro
        console.error("Código de status HTTP: ", error.status); // Código de status HTTP do erro
        this.loadingSpinner = false;
        this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
      },
      complete: () => {
        console.log("Requisição completa!!!");
      }
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
    return lucro.toFixed(2) + "%";
  }
  editarItem(index: number) {
    let produto: CadastroProduto = this.listaDeProdutos[index];
    this.enviarProduto.setProduto(produto);
    this.router.navigate(['/cadastrarProduto']);
  }

}
