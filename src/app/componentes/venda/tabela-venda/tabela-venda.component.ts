import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ProdutoVenda } from 'src/app/interfaces/produtoVenda';
import { CardHomeService } from '../../card-home.service';

@Component({
  selector: 'app-tabela-venda',
  templateUrl: './tabela-venda.component.html',
  styleUrls: ['./tabela-venda.component.css']
})
export class TabelaVendaComponent {

  constructor(private service : CardHomeService){}  

  @Input() listaDeProdutos: ProdutoVenda[] = [];
  @Output() totalCalculado = new EventEmitter<number>();
  @Output() produtoClicado = new EventEmitter<ProdutoVenda>();
  //@Output() editarProduto = new EventEmitter<EditarProdutoVenda>();
  @Output() indexEditarProduto = new EventEmitter<number>();

  faPencil = faPencil;
  faTrashCan = faTrashCan;

  total : number = 0;

  adicionarProdutoNaLista(produto: ProdutoVenda){
    //Verificar se o produto já está na tabela
    let itemJaNaLista = false;
    let itemIndex = 1;
    for (let i = 0; i < this.listaDeProdutos.length; i++){
      if (produto.codigoDeBarras == this.listaDeProdutos[i].codigoDeBarras){
        itemJaNaLista = true;
        itemIndex = i;
      }
    }
    
    if (itemJaNaLista){
      this.listaDeProdutos[itemIndex].quantidade++;
      this.selecionarProduto(itemIndex);
    } else {
      this.listaDeProdutos.push(produto);
      this.selecionarProduto(this.listaDeProdutos.length - 1);
    }
  }

  procurarProduto(codigoDeBarras : string){
    this.service.pesquisarPorCodigoDeBarras(codigoDeBarras).subscribe((produto) => {
    
      if (produto == null) {
        alert("Produto não encontrado!!!!");
        //this.input = '';
        return;
      }
      this.adicionarProdutoNaLista(produto);
      this.calcularTotal();
      console.log("preco de compra: " + produto.precoCompra);
    });
  }

  removerItemDaLista(index: number) {
    if (this.listaDeProdutos[index].quantidade > 1) {
      this.listaDeProdutos[index].quantidade -= 1;
    } else {
      this.listaDeProdutos.splice(index,1);
      //Se remover algum produto, selecionar o ultimo produto da lista
      this.selecionarProduto(this.listaDeProdutos.length - 1);
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
      listaPrecoTotal += (this.listaDeProdutos[index].preco * this.listaDeProdutos[index].quantidade);
    }
    this.total = listaPrecoTotal;
    this.totalCalculado.emit(this.total);
  }

}
