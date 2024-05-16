import { Component, Input } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mini-botao',
  templateUrl: './mini-botao.component.html',
  styleUrls: ['./mini-botao.component.css']
})
export class MiniBotaoComponent {
  
  @Input() cor : string | undefined;
  @Input() icone :string | undefined;

  iconeParaMostrar(){

    let icone;

    switch(this.icone){
      case 'fa-x-xmark':
        icone = faXmark;
        break;
      case 'fa-plus':
        icone = faPlus;
        break;
      default:
        icone = faXmark;
    }
    return icone;
  }
}
