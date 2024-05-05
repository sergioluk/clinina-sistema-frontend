import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  @Input() label: string | undefined;
  @Input() type: string | undefined;
  @Input() placeholder: string | undefined;
  @Input() for: string | undefined;

}
