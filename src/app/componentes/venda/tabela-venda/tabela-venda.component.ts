import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ProdutoVenda } from 'src/app/interfaces/produtoVenda';

@Component({
  selector: 'app-tabela-venda',
  templateUrl: './tabela-venda.component.html',
  styleUrls: ['./tabela-venda.component.css']
})
export class TabelaVendaComponent {

  //@Input() listaDeProdutos: VendaComQtd[] = [];
  @Input() listaDeProdutos: ProdutoVenda[] = [];
  @Output() calcularTotal = new EventEmitter();
  @Output() produtoClicado = new EventEmitter<ProdutoVenda>();

  faPencil = faPencil;
  faTrashCan = faTrashCan;

  removerItemDaLista(index: number) {
    if (this.listaDeProdutos[index].quantidade > 1) {
      this.listaDeProdutos[index].quantidade -= 1;
    } else {
      this.listaDeProdutos.splice(index,1);
      //Se remover algum produto, selecionar o ultimo produto da lista
      this.selecionarProduto(this.listaDeProdutos.length - 1);
    }
    this.calcularTotal.emit();
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
        desconto: 0
      }
      this.produtoClicado.emit(produtoZerado);
      return;
    }
    this.produtoClicado.emit(this.listaDeProdutos[index]);
  }

}
