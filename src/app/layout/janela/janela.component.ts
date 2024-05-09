import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

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
  @Output() toggleJanela = new EventEmitter();

  faPencil = faPencil;
  faXmark = faXmark;

  faCircleXmark = faCircleXmark;
  faCircleCheck = faCircleCheck;
  faTriangleExclamation = faTriangleExclamation;

  iconeParaMostrar(){

    let icone;

    switch(this.icone){
      case 'fa-pencil':
        icone = faPencil;
        break;
      case 'fa-circle-xmark':
        icone = faCircleXmark;
        break;
      case 'fa-triangule-exclamation':
        icone = faTriangleExclamation;
        break;
      default:
        icone = faPencil;
    }
    return icone;
  }

  abrirFecharJanela() {
    this.toggleJanela.emit();
  }

}
