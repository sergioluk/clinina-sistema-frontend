import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-adicionar-lancamento',
  templateUrl: './adicionar-lancamento.component.html',
  styleUrls: ['./adicionar-lancamento.component.css']
})
export class AdicionarLancamentoComponent {

  @Output() visivel = new EventEmitter();

  toggleJanela() {
    this.visivel.emit();
  }
}
