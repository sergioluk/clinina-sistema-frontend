import { Component } from '@angular/core';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-janela',
  templateUrl: './janela.component.html',
  styleUrls: ['./janela.component.css']
})
export class JanelaComponent {

  faPencil = faPencil;
  faXmark = faXmark;

}
