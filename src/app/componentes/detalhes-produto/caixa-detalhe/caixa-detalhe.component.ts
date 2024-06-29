import { Component } from '@angular/core';
import { IconeService } from 'src/app/services/icone.service';

@Component({
  selector: 'app-caixa-detalhe',
  templateUrl: './caixa-detalhe.component.html',
  styleUrls: ['./caixa-detalhe.component.css']
})
export class CaixaDetalheComponent {

  constructor(
    private iconeService: IconeService,
  ) {}

  getIcone(icone: string) {
    return this.iconeService.getIcone(icone);
  }
}
