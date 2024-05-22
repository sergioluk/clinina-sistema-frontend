import { Component, Input } from '@angular/core';
import { IconeService } from 'src/app/services/icone.service';

@Component({
  selector: 'app-menu-opcao',
  templateUrl: './menu-opcao.component.html',
  styleUrls: ['./menu-opcao.component.css']
})
export class MenuOpcaoComponent {

  @Input() icone! : string;
  @Input() texto : string | undefined;
  @Input() componente: string | undefined;

  constructor(private iconeService: IconeService) {}

  getIcone() {
    return this.iconeService.getIcone(this.icone);
  }

}
