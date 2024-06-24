import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconeService } from 'src/app/services/icone.service';
import { Mensagem } from '../../cadastro-produto/cadastro-produto';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css']
})
export class MsgComponent {

  @Input() autor!: string;
  @Input() mensagem!: string;
  @Input() data!: Date;
  @Input() msgObj!: Mensagem;
  @Output() marcarComoLidoOuNaoLido = new EventEmitter();
  @Output() apagar = new EventEmitter();

  constructor(private icone: IconeService) {}

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  getIconeLidoNaoLido() {
    let icone: string = 'fa-envelope-open';
    if (this.msgObj.leitura == 1) {
      icone = "fa-envelope";
    }
    return this.getIcone(icone);
  }

  triggerMarcarComoLidoOuNaoLido() {
    this.marcarComoLidoOuNaoLido.emit();
  }
  triggerApagar() {
    this.apagar.emit();
  }
  getLeitura() {
    if (this.msgObj.leitura == 1) {
      return "barra-azul-lido";
      
    }
    return "barra-azul-nao-lido";
  }
}
