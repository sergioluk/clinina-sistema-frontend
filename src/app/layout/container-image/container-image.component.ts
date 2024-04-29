import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-container-image',
  templateUrl: './container-image.component.html',
  styleUrls: ['./container-image.component.css']
})
export class ContainerImageComponent {

  @Input() imagem : string | undefined;

}
