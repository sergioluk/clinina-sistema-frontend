import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IconeService } from 'src/app/services/icone.service';
import { CardHomeService } from '../card-home.service';
import { DetalhesProduto } from 'src/app/interfaces/produtoVenda';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { CadastroProduto } from '../cadastro-produto/cadastro-produto';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {

  loadingSpinner: boolean = false;
  detalhesProduto: DetalhesProduto = {
    produto: '',
    codigoDeBarras: '',
    categoria: '',
    sabor: '',
    idade: '',
    precoCompra: 0,
    preco: 0,
    desconto: 0,
    estoque: 0,
    quantidadeVendido: 0,
    animal: '',
    peso: '',
    porte: '',
    fornecedor: '',
    castrado: 0,
    imagemP: ''
  }

  constructor(
    private iconeService: IconeService,
    private route: ActivatedRoute,
    private service: CardHomeService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    const codigo = this.route.snapshot.paramMap.get("codigo");
    this.loadingSpinner = true;
    this.service.buscarProdutoDetalhes(codigo ? codigo: "").subscribe({
      next: (response: HttpResponse<DetalhesProduto>) => {
        if (response.body) {
          this.detalhesProduto = response.body;
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error("Erro: ", error.message); // Mensagem de erro
        console.error("Código de status HTTP: ", error.status); // Código de status HTTP do erro
        this.loadingSpinner = false;
        this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
      },
      complete: () => {
        this.loadingSpinner = false;
        this.snackbar.openSnackBarSucces("Detalhes do Produto Carregado!","Fechar");
      }
    });
  
  }

  editarItem() {
    //Para editar o item, vou precisar converter esse produto para CadastroProduto...
    // let produto: CadastroProduto = {};
    // this.enviarProduto.setProduto(produto);
    // this.router.navigate(['/cadastrarProduto']);
  }

  getIcone(icone: string) {
    return this.iconeService.getIcone(icone);
  }

}
