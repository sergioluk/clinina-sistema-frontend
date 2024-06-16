import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconeService } from 'src/app/services/icone.service';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css']
})
export class MsgComponent {

  @Input() autor!: string;
  @Input() mensagem!: string;
  @Input() data!: Date;
  @Output() marcarComoLidoOuNaoLido = new EventEmitter();
  @Output() apagar = new EventEmitter();

  constructor(private icone: IconeService) {}

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  triggerMarcarComoLidoOuNaoLido() {
    this.marcarComoLidoOuNaoLido.emit();
  }
  triggerApagar() {
    this.apagar.emit();
  }
}
