import { Component, Input } from '@angular/core';
import { IconeService } from 'src/app/services/icone.service';

@Component({
  selector: 'app-linha-do-tempo',
  templateUrl: './linha-do-tempo.component.html',
  styleUrls: ['./linha-do-tempo.component.css']
})
export class LinhaDoTempoComponent {

  @Input() valor!: number;
  @Input() quantidade!: number;
  @Input() data!: Date;

  constructor(private icone: IconeService) {}

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }



}
