import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gerenciar-opcao',
  templateUrl: './gerenciar-opcao.component.html',
  styleUrls: ['./gerenciar-opcao.component.css']
})
export class GerenciarOpcaoComponent {

  @Input() tipo = "";
  @Input() lista = [{id: 0, nome: ""}];
  @Output() toggleJanelaGerenciar = new EventEmitter();

  faPencil = faPencil;
  faTrashCan = faTrashCan;

  listaDeProdutos = ["Oi","Selecione uma categoria"];

  toggleJanela() {
    this.toggleJanelaGerenciar.emit();
  }
  cancelar() {
    this.toggleJanela();
  }
  receberTexto(texto: string) {

  }
  editarItem(index: number) {

  }
  removerItemDaLista(index: number) {

  }
}
