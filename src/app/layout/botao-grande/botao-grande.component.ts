import { Component, Input, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-botao-grande',
  templateUrl: './botao-grande.component.html',
  styleUrls: ['./botao-grande.component.css']
})
export class BotaoGrandeComponent {

  @Input() texto : string | undefined;
  @Input() cor : string | undefined;
  @Input() icone :string | undefined;

  iconeParaMostrar(){

    let icone;

    switch(this.icone){
      case 'fa-magnifying-glass':
        icone = faMagnifyingGlass;
        break;
      case 'fa-circle-xmark':
        icone = faCircleXmark;
        break;
      case 'fa-cart-shopping':
        icone = faCartShopping;
        break;
      case 'fa-circle-left':
        icone = faCircleLeft;
        break;
      default:
        icone = faCircleXmark;
    }
    return icone;
  }

}


