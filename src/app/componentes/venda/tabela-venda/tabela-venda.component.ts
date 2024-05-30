import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ProdutoVenda } from 'src/app/interfaces/produtoVenda';
import { CardHomeService } from '../../card-home.service';
import { IconeService } from 'src/app/services/icone.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-tabela-venda',
  templateUrl: './tabela-venda.component.html',
  styleUrls: ['./tabela-venda.component.css']
})
export class TabelaVendaComponent {

  constructor(
    private service : CardHomeService,
    private icone: IconeService,
    private snackbar: SnackbarService
  ){}  

  @Input() listaDeProdutos: ProdutoVenda[] = [];
  @Output() totalCalculado = new EventEmitter<number>();
  @Output() produtoClicado = new EventEmitter<ProdutoVenda>();
  //@Output() editarProduto = new EventEmitter<EditarProdutoVenda>();
  @Output() indexEditarProduto = new EventEmitter<number>();
  @Output() totalDescontoCalculado = new EventEmitter<number>();
  @Output() visivelProdutoPeso = new EventEmitter();
  @Output() produtoComPeso = new EventEmitter<ProdutoVenda>();
  @Output() spinnerEmitter = new EventEmitter<string>();

  total : number = 0;

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  adicionarProdutoNaLista(produto: ProdutoVenda){
    //Verificar se o produto já está na tabela
    let itemJaNaLista = false;
    let ehPesado = false;
    let itemIndex = 1;
    for (let i = 0; i < this.listaDeProdutos.length; i++){
      if (produto.codigoDeBarras == this.listaDeProdutos[i].codigoDeBarras){
        itemJaNaLista = true;
        itemIndex = i;
        //Se o for um item pesado, não é pra acumular quantidade na tabela
        if (produto.codigoDeBarras.length <= 3) {
          ehPesado = true;
        }
      }
    }
    
    if (itemJaNaLista && !ehPesado){
      this.listaDeProdutos[itemIndex].quantidade++;
      this.selecionarProduto(itemIndex);
    } else {
      this.listaDeProdutos.push(produto);
      this.selecionarProduto(this.listaDeProdutos.length - 1);
    }
  }

  procurarProduto(codigoDeBarras : string){
    this.spinnerEmitter.emit("true");
    this.service.pesquisarPorCodigoDeBarras(codigoDeBarras).subscribe({
        next: (response: HttpResponse<ProdutoVenda>) => {
          let produto = response.body;
          this.spinnerEmitter.emit("false");
          if (produto == null) {
            this.snackbar.openSnackBarFail("Produto não encontrado!!!!", "Fechar");
            return;
          }
          this.snackbar.openSnackBarSucces("Produto encontrado!","Fechar");
          if (codigoDeBarras.length <= 3) {
            this.abrirJanelaProdutoPeso();
            this.produtoComPeso.emit(produto);
            return;
          }
          this.adicionarProdutoNaLista(produto);
          this.calcularTotal();
          console.log("Código de status HTTP do Estoque: ", response.status);
        },
        error: (error: HttpErrorResponse) => {
          console.error("Erro: ", error.message);
          console.error("Código de status HTTP: ", error.status);
          this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
          this.spinnerEmitter.emit("false");
        },
        complete: () => {
          console.log("Requisição completa!!!");
        }
    });
  }

  retornarNome(produto: ProdutoVenda) {
    if (produto.codigoDeBarras.length <= 3) {
      return produto.produto + " (" + produto.peso + ")";
    }
    return produto.produto;
  }

  abrirJanelaProdutoPeso() {
    this.visivelProdutoPeso.emit();
  }

  adicionarProdutoPeloPesquisar(produto: ProdutoVenda) {
    this.adicionarProdutoNaLista(produto);
    this.calcularTotal();
  }

  removerItemDaLista(index: number) {
    if (this.listaDeProdutos[index].quantidade > 1) {
      this.listaDeProdutos[index].quantidade -= 1;
      this.snackbar.openSnackBarSucces("Removido 1 quantidade do produto!","Fechar");
    } else {
      this.listaDeProdutos.splice(index,1);
      //Se remover algum produto, selecionar o ultimo produto da lista
      this.selecionarProduto(this.listaDeProdutos.length - 1);
      this.snackbar.openSnackBarSucces("Produto removido da lista!","Fechar");
    }
    this.calcularTotal();
  }

  editarItem(index: number) {
    this.indexEditarProduto.emit(index);
  }

  selecionarProduto(index : number) {
    if (this.listaDeProdutos.length == 0){
      let produtoZerado : ProdutoVenda = {
        id: 0,
        codigoDeBarras: '',
        produto: '',
        preco: 0,
        imagemP: '',
        peso: '',
        quantidade: 0,
        desconto: 0,
        precoCompra: 0
      }
      this.produtoClicado.emit(produtoZerado);
      return;
    }
    this.produtoClicado.emit(this.listaDeProdutos[index]);
  }

  calcularTotal(){
    let listaPrecoTotal = 0;
    for (let index = 0; index < this.listaDeProdutos.length; index++) {
      listaPrecoTotal += (this.listaDeProdutos[index].preco * this.listaDeProdutos[index].quantidade) - this.listaDeProdutos[index].desconto;
    }
    this.total = listaPrecoTotal;
    this.totalCalculado.emit(this.total);
  }
  calcularDescontoTotal(){
    let listaPrecoTotal = 0;
    let listaDescontoTotal:number = 0;
    for (let index = 0; index < this.listaDeProdutos.length; index++) {
      listaPrecoTotal += (this.listaDeProdutos[index].preco * this.listaDeProdutos[index].quantidade) - this.listaDeProdutos[index].desconto;
      listaDescontoTotal += Number(this.listaDeProdutos[index].desconto);
    }
    this.totalDescontoCalculado.emit(Number(listaDescontoTotal));
    this.totalCalculado.emit(listaPrecoTotal);
  }

}
