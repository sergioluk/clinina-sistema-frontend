import { Component, Input, OnInit } from '@angular/core';
import { IconeService } from 'src/app/services/icone.service';

@Component({
  selector: 'app-botao-grande',
  templateUrl: './botao-grande.component.html',
  styleUrls: ['./botao-grande.component.css']
})
export class BotaoGrandeComponent {

  @Input() texto : string | undefined;
  @Input() cor : string | undefined;
  @Input() icone! :string;

  constructor(private iconeService: IconeService) {}

  getIcone() {
    return this.iconeService.getIcone(this.icone);
  }

}


