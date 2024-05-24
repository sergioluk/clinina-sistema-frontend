import { Component, Input } from '@angular/core';
import { timeInterval } from 'rxjs';
import { IconeService } from 'src/app/services/icone.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {

  @Input() texto!: string;

  constructor(private icone: IconeService) {}

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }
  
}
