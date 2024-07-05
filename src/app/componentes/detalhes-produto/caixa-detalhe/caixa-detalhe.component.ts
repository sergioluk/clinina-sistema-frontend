import { Component, Input } from '@angular/core';
import { IconeService } from 'src/app/services/icone.service';

@Component({
  selector: 'app-caixa-detalhe',
  templateUrl: './caixa-detalhe.component.html',
  styleUrls: ['./caixa-detalhe.component.css']
})
export class CaixaDetalheComponent {

  @Input() icone!: string;
  @Input() valor!: number;
  @Input() titulo!: string;
  @Input() cor!: string;
  @Input() borda!: string;

  constructor(
    private iconeService: IconeService,
  ) {}

  getIcone(icone: string) {
    return this.iconeService.getIcone(icone);
  }

  estilos() {
    let borda = "";
    let color = "";
    if (this.borda) {
      borda = "1px solid var(--corPrincipal)";
      color = "var(--corTexto)";
    }
    return {'background-color': this.cor, 'border': borda, 'color': color};
  }
}
