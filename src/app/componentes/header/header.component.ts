import { Component } from '@angular/core';
import { CardHomeService } from '../card-home.service';
import { CadastroProduto, Venda } from '../cadastro-produto/cadastro-produto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  input: string = '';

  /*
  produto: CadastroProduto = {
    produto: '',
    codigoDeBarras: '',
    sabor: '',
    idade: '',
    categoria: '',
    animal: '',
    informacao: [],
    peso: '',
    preco: 0,
    desconto: 0,
    estoque: 0,
    castrado: false,
    fornecedor: '',
    imagens: [],
    porte: '',
    imagemP: ''
  }
*/
produto: Venda = {
  codigoDeBarras: '',
  produto: '',
  preco: 0,
  imagemP: '',
  id: 0
}
constructor(private service: CardHomeService){}

onEnter(){
    console.log(this.input);

    this.service.pesquisarPorCodigoDeBarras(this.input).subscribe((produto) => {
      //this.produto = produto;
      this.input = '';
    });


  }

}
