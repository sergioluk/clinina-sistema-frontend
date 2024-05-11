import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { CardHomeService } from 'src/app/componentes/card-home.service';
import { ProdutoVenda } from 'src/app/interfaces/produtoVenda';

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

  enviarTexto(texto : string){
    this.texto.emit(texto);
    this.input = '';
  }
  
}
