import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconeService } from 'src/app/services/icone.service';

@Component({
  selector: 'app-gerenciar-opcao',
  templateUrl: './gerenciar-opcao.component.html',
  styleUrls: ['./gerenciar-opcao.component.css']
})
export class GerenciarOpcaoComponent {

  @Input() tipo = "";
  @Input() lista = [{id: 0, nome: ""}];
  @Output() toggleJanelaGerenciar = new EventEmitter();

  listaDeProdutos = ["Oi","Selecione uma categoria"];

  constructor(private icone: IconeService){}

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

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
