import { Component } from '@angular/core';
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

  faPencil = faPencil;
  faXmark = faXmark;

  faCircleXmark = faCircleXmark;
  faCircleCheck = faCircleCheck;

}
