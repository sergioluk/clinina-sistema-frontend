import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label-informacoes',
  templateUrl: './label-informacoes.component.html',
  styleUrls: ['./label-informacoes.component.css']
})
export class LabelInformacoesComponent {

  @Input() propriedade!: string;
  @Input() valor!: string;

}
