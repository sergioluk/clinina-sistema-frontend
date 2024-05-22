import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { IconeService } from 'src/app/services/icone.service';


@Component({
  selector: 'app-janela',
  templateUrl: './janela.component.html',
  styleUrls: ['./janela.component.css']
})
export class JanelaComponent {

  @Input() icone!: string;
  @Input() titulo: string | undefined;
  @Output() toggleJanela = new EventEmitter();

  faXmark = faXmark;

  constructor(private iconeService: IconeService) {}

  getIcone() {
    return this.iconeService.getIcone(this.icone);
  }

  abrirFecharJanela() {
    this.toggleJanela.emit();
  }

}
