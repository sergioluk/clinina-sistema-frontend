import { Component, Input } from '@angular/core';
import { AgendamentoCalendario } from 'src/app/core/models/agendamentoCalendario.model';
import { Servico } from 'src/app/core/models/servico.model';

@Component({
  selector: 'app-card-banho-tosa',
  templateUrl: './card-banho-tosa.component.html',
  styleUrls: ['./card-banho-tosa.component.css']
})
export class CardBanhoTosaComponent {
  @Input() agendamento: AgendamentoCalendario | undefined;
}
