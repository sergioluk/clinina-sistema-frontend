import { Component } from '@angular/core';
import { IconeService } from 'src/app/services/icone.service';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css']
})
export class MensagensComponent {

  constructor(private icone: IconeService) {}

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }
}
