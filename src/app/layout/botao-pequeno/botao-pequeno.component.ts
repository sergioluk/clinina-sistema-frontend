import { Component, Input } from '@angular/core';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-botao-pequeno',
  templateUrl: './botao-pequeno.component.html',
  styleUrls: ['./botao-pequeno.component.css']
})
export class BotaoPequenoComponent {

  @Input() texto : string | undefined;
  @Input() cor : string | undefined;
  @Input() icone :string | undefined;

  iconeParaMostrar(){

    let icone;

    switch(this.icone){
      case 'fa-circle-xmark':
        icone = faCircleXmark;
        break;
      case 'fa-circle-check':
        icone = faCircleCheck;
        break;
      default:
        icone = faCircleXmark;
    }
    return icone;
  }

}
