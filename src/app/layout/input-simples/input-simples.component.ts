import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { IconeService } from 'src/app/services/icone.service';

@Component({
  selector: 'app-input-simples',
  templateUrl: './input-simples.component.html',
  styleUrls: ['./input-simples.component.css']
})
export class InputSimplesComponent {
  
  @Input() placeholder : string | undefined;
  faMagnifyingGlass = faMagnifyingGlass;

  @Output() texto = new EventEmitter<string>();
  input : string = '';

  constructor(private icone: IconeService) {}

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  enviarTexto(texto : string){
    this.texto.emit(texto);
    this.input = '';
  }
  
}
