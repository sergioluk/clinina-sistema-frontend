import { Component, OnInit } from '@angular/core';
import { CadastroProduto } from '../cadastro-produto/cadastro-produto';
import { Router } from '@angular/router';
import { CardHomeService } from '../card-home.service';
import { EnviarProdutoService } from 'src/app/services/enviar-produto.service';
import { IconeService } from 'src/app/services/icone.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css'],
})
export class EstoqueComponent implements OnInit {

  loadingSpinner: boolean = false;
  listaDeProdutos: CadastroProduto[] = [];

  filtrosDisponiveis = [
    { key: 'imagemP', label: 'Foto' },
    { key: 'codigoDeBarras', label: 'Código' },
    { key: 'produto', label: 'Nome do produto' },
    { key: 'estoque', label: 'Estoque' },
    { key: 'precoCompra', label: 'P. custo' },
    { key: 'preco', label: 'P. venda' },
    { key: 'lucro', label: 'Lucro' },
    { key: 'peso', label: 'Peso' },
    { key: 'dataVencimento', label: 'Data de Vencimento' }
  ];

  filtrosSelecionados: { [key: string]: boolean } = {};


  constructor(
    private router: Router,
    private service: CardHomeService,
    private enviarProduto: EnviarProdutoService,
    private icone: IconeService,
    private snackbar: SnackbarService) {}


  ngOnInit(): void {
    this.inicializarFiltros();
    this.buscarProdutos();
  }

  inicializarFiltros() {
    // Ativa todos os filtros por padrão
    // this.filtrosDisponiveis.forEach(filtro => {
    //   this.filtrosSelecionados[filtro.key] = true;
    // });
    this.filtrosSelecionados['imagemP'] = true;
    this.filtrosSelecionados['codigoDeBarras'] = true;
    this.filtrosSelecionados['produto'] = true;
    this.filtrosSelecionados['estoque'] = true;
    this.filtrosSelecionados['precoCompra'] = true;
    this.filtrosSelecionados['preco'] = true;
    this.filtrosSelecionados['peso'] = true;
    this.filtrosSelecionados['dataVencimento'] = true;
  }

  buscarProdutos() {
    this.loadingSpinner = true;

    // Gera os parâmetros da API com base nos filtros ativados
    const params: any = {};
    Object.keys(this.filtrosSelecionados).forEach(filtro => {
      if (this.filtrosSelecionados[filtro]) {
        params[filtro] = true;
      }
    });

    this.service.listarProdutos(params).subscribe(
      (dados: CadastroProduto[]) => {
        this.listaDeProdutos = dados;
        this.loadingSpinner = false;
      },
      error => {
        console.error('Erro ao buscar produtos:', error);
        this.loadingSpinner = false;
      }
    );
  }

  calcularDiasParaVencer(dataVencimento: Date | null): number | string {
    if (!dataVencimento) {
        return 'N/A'; // Caso não tenha data de vencimento
    }

    const hoje = new Date();
    const vencimento = new Date(dataVencimento); // Garante que seja um objeto Date

    const diferenca = vencimento.getTime() - hoje.getTime();
    const diasRestantes = Math.ceil(diferenca / (1000 * 60 * 60 * 24)); // Convertendo para dias

    return diasRestantes >= 0 ? diasRestantes : 'Vencido'; // Se for negativo, já venceu
}



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
