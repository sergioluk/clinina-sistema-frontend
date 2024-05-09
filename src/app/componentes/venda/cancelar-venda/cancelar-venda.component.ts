import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cancelar-venda',
  templateUrl: './cancelar-venda.component.html',
  styleUrls: ['./cancelar-venda.component.css']
})

export class CancelarVendaComponent {

  @Output() aplicarLimpar = new EventEmitter();
  @Output() visivel = new EventEmitter();

  toggleJanela(){
    this.visivel.emit();
  }
  aplicar(){
    this.aplicarLimpar.emit();
  }
  cancelar(){
    this.toggleJanela();
  }
}
