import { Component, Input } from '@angular/core';
import { CardHome } from './card-home';

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

}
