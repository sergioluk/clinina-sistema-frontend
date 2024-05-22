import { Component, Input } from '@angular/core';
import { IconeService } from 'src/app/services/icone.service';

@Component({
  selector: 'app-botao-pequeno',
  templateUrl: './botao-pequeno.component.html',
  styleUrls: ['./botao-pequeno.component.css']
})
export class BotaoPequenoComponent {

  @Input() texto : string | undefined;
  @Input() cor : string | undefined;
  @Input() icone! :string;

  constructor(private iconeService: IconeService) {}

  getIcone() {
    return this.iconeService.getIcone(this.icone);
  }

}
