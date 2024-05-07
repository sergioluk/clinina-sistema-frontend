import { Component, Input } from '@angular/core';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-janela',
  templateUrl: './janela.component.html',
  styleUrls: ['./janela.component.css']
})
export class JanelaComponent {

  @Input() icone: string | undefined;
  @Input() titulo: string | undefined;

  faPencil = faPencil;
  faXmark = faXmark;

  faCircleXmark = faCircleXmark;
  faCircleCheck = faCircleCheck;

  iconeParaMostrar(){

    let icone;

    switch(this.icone){
      case 'fa-pencil':
        icone = faPencil;
        break;
      case 'fa-circle-xmark':
        icone = faCircleXmark;
        break;
      default:
        icone = faPencil;
    }
    return icone;
  }

}
