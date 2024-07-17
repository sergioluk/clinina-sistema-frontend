import { Component } from '@angular/core';
import { IconeService } from 'src/app/services/icone.service';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent {

  start = 0;
  end = 0;

  constructor(private icone: IconeService) {}

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  pesquisar() {

  }

}
