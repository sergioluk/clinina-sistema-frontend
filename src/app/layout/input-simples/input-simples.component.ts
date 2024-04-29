import { Component, Input } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-simples',
  templateUrl: './input-simples.component.html',
  styleUrls: ['./input-simples.component.css']
})
export class InputSimplesComponent {

  @Input() placeholder : string | undefined;
  faMagnifyingGlass = faMagnifyingGlass;
}
