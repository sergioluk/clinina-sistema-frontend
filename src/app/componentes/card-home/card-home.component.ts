import { Component, Input } from '@angular/core';
import { CardHome } from './card-home';
import { CadastroProduto } from '../cadastro-produto/cadastro-produto';

@Component({
  selector: 'app-card-home',
  templateUrl: './card-home.component.html',
  styleUrls: ['./card-home.component.css']
})
export class CardHomeComponent {

  @Input() card: CardHome = {
    id: 0,
    produto: 'Ola',
    //sabor: 'Cenoura',
    preco: 29
  }

  @Input() produto: CadastroProduto = {
    id: 0,
    produto: 'Ola',
    preco: 29,
    sabor: '',
    idade: '',
    peso: 0,
    castrado: 0,
    estoque: 0,
    venda: 0,
    informacao: '',
    animal: '',
    desconto: 0,
    fornecedor: '',
    litros: '',
    categoria: '',
    imagemP: '',
    imagens: ''
  }

}
