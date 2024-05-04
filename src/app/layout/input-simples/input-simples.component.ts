import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { CardHomeService } from 'src/app/componentes/card-home.service';
import { ProdutoVenda } from 'src/app/interfaces/produtoVenda';

@Component({
  selector: 'app-input-simples',
  templateUrl: './input-simples.component.html',
  styleUrls: ['./input-simples.component.css']
})
export class InputSimplesComponent {

  constructor(private service : CardHomeService){}

  @Input() placeholder : string | undefined;
  faMagnifyingGlass = faMagnifyingGlass;

  @Output() produto = new EventEmitter<ProdutoVenda>();
  input : string = '';

  procurarProduto(codigoDeBarras:string){
    
    this.service.pesquisarPorCodigoDeBarras(codigoDeBarras).subscribe((produto) => {
    
      if (produto == null) {
        alert("Produto não encontrado!!!!");
        this.input = '';
        return;
      }
      this.input = '';
      this.produto.emit(produto);
    });

  }
  
}
