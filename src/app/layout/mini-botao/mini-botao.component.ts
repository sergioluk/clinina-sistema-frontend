import { Component, Input } from '@angular/core';
import { IconeService } from 'src/app/services/icone.service';

@Component({
  selector: 'app-mini-botao',
  templateUrl: './mini-botao.component.html',
  styleUrls: ['./mini-botao.component.css']
})
export class MiniBotaoComponent {
  
  @Input() cor : string | undefined;
  @Input() icone! :string;

  constructor(private iconeService: IconeService) {}

  getIcone() {
    return this.iconeService.getIcone(this.icone)
  }
  
}
