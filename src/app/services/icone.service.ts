import { Injectable } from '@angular/core';
import { faTrashCan, faCircleXmark, faCircleLeft, faCircleCheck, faRectangleList, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faCartPlus, faXmark, faBars, faPencil, faCartShopping, faPlus, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBill1, faFloppyDisk, faChartLine, faHandHoldingDollar, faDog, faStethoscope, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconeService {

  constructor() { }

  getIcone(iconeText: string) {
    let icone = faBars;
    switch(iconeText) {
      case 'fa-bars':
        icone = faBars;
        break;
      case 'fa-trash-can':
        icone = faTrashCan;
        break;
      case 'fa-pencil':
        icone = faPencil;
        break;
      case 'fa-magnifying-glass':
        icone = faMagnifyingGlass;
        break;
      case 'fa-cart-plus':
        icone = faCartPlus;
        break;
      case 'fa-xmark':
        icone = faXmark;
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
      case 'fa-plus':
        icone = faPlus;
        break;
      case 'fa-circle-check':
        icone = faCircleCheck;
        break;
      case 'fa-triangule-exclamation':
        icone = faTriangleExclamation;
        break;
      case 'fa-money-bill-1':
        icone = faMoneyBill1;
        break;
      case 'fa-floppy-disk':
        icone = faFloppyDisk;
        break;
      case 'fa-rectangle-list':
        icone = faRectangleList;
        break;
      case 'fa-chart-line':
        icone = faChartLine;
        break;
      case 'fa-envelope':
        icone = faEnvelope;
        break;
      case 'fa-hand-holding-dollar':
        icone = faHandHoldingDollar;
        break;
      case 'fa-dog':
        icone = faDog;
        break;
      case 'fa-stethoscope':
        icone = faStethoscope;
        break;
      case 'fa-circle-info':
        icone = faCircleInfo;
        break;
      default:
        icone = faBars;
    }
    return icone;
  }

}
