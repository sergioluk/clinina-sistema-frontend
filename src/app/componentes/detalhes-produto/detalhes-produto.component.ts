import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconeService } from 'src/app/services/icone.service';
import { CardHomeService } from '../card-home.service';
import { DetalhesProduto, LinhaDoTempo } from 'src/app/interfaces/produtoVenda';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { CadastroProduto } from '../cadastro-produto/cadastro-produto';
import { EnviarProdutoService } from 'src/app/services/enviar-produto.service';

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
    imagemP: '',
    valorVendaEstoque: 0,
    valorCustoEstoque: 0,
    linhaDoTempo: []
  }
  botaoSelecionado = "30 dias";
  loadingSpinnerLinhaDoTempo = false;

  constructor(
    private iconeService: IconeService,
    private route: ActivatedRoute,
    private service: CardHomeService,
    private snackbar: SnackbarService,
    private enviarProduto: EnviarProdutoService,
    private router: Router
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
    let produto: CadastroProduto = {
      codigoDeBarras: this.detalhesProduto.codigoDeBarras,
      categoria: this.detalhesProduto.categoria,
      produto: this.detalhesProduto.produto,
      imagens: [],
      sabor: this.detalhesProduto.sabor,
      idade: this.detalhesProduto.idade,
      preco: this.detalhesProduto.preco,
      precoCompra: this.detalhesProduto.precoCompra,
      peso: this.detalhesProduto.peso,
      desconto: this.detalhesProduto.desconto,
      animal: this.detalhesProduto.animal,
      castrado: this.detalhesProduto.castrado==1?true:false,
      porte: this.detalhesProduto.porte,
      informacao: [],
      fornecedor: this.detalhesProduto.fornecedor,
      estoque: this.detalhesProduto.estoque,
      imagemP: this.detalhesProduto.imagemP,
      id: this.detalhesProduto.id
    };
    this.enviarProduto.setProduto(produto);
    this.router.navigate(['/cadastrarProduto']);
  }

  selecionarBotao(valor: string) {
    this.botaoSelecionado = valor;
    this.detalhesProduto.linhaDoTempo = [];


    //Adicionar um spiner no linha do tempo, mudar a linha 122 para false o novo spiner, pegar o valor da ultima compra também
    const produtoAndValor = {
      codigoDeBarras: this.detalhesProduto.codigoDeBarras,
      valor: valor
    }
    this.loadingSpinnerLinhaDoTempo = true;
    this.service.buscarListaLinhaDoTempo(produtoAndValor).subscribe({
      next: (response: HttpResponse<LinhaDoTempo[]>) => {
        if (response.body) {
          this.detalhesProduto.linhaDoTempo = response.body;
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error("Erro: ", error.message); // Mensagem de erro
        console.error("Código de status HTTP: ", error.status); // Código de status HTTP do erro
        this.loadingSpinner = false;
        this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
      },
      complete: () => {
        this.loadingSpinnerLinhaDoTempo = false;
        this.snackbar.openSnackBarSucces("Detalhes do Produto Carregado!","Fechar");
      }
    });
  }

  getIcone(icone: string) {
    return this.iconeService.getIcone(icone);
  }

}
