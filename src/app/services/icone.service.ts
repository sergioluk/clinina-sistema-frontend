import { Injectable } from '@angular/core';
import { faTrashCan, faCircleXmark, faCircleLeft, faCircleCheck, faRectangleList, faEnvelope, faEnvelopeOpen, faPaperPlane, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass, faCartPlus, faXmark, faBars, faPencil, faCartShopping, faPlus, faTriangleExclamation, faDollarSign, faMoneyBill, faBagShopping, faWarehouse, faArrowRight, faArrowLeft, faHouse, faPhone, faPaw, faMessage, faRightToBracket, faFilter, faPerson, faCheck, faShower, faScissors, faCar, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBill1, faFloppyDisk, faChartLine, faHandHoldingDollar, faDog, faStethoscope, faCircleInfo, faUser } from '@fortawesome/free-solid-svg-icons';

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
      case 'fa-right-to-bracket':
        icone = faRightToBracket;
        break;
      case 'fa-filter':
        icone = faFilter;
        break;
      case 'fa-arrow-right':
        icone = faArrowRight;
        break;
      case 'fa-pen-to-square':
        icone = faPenToSquare;
        break;
      case 'fa-message':
        icone = faMessage;
        break;
      case 'fa-paw':
        icone = faPaw;
        break;
      case 'fa-arrow-left':
        icone = faArrowLeft;
        break;
      case 'fa-dollar-sign':
        icone = faDollarSign;
        break;
      case 'fa-bag-shopping':
        icone = faBagShopping;
        break;
      case 'fa-house':
        icone = faHouse;
        break;
      case 'fa-warehouse':
        icone = faWarehouse;
        break;
      case 'fa-phone':
        icone = faPhone;
        break;
      case 'fa-user':
        icone = faUser;
        break;
      case 'fa-paper-plane':
        icone = faPaperPlane;
        break;
      case 'fa-person':
        icone = faPerson;
        break;
      case 'fa-pencil':
        icone = faPencil;
        break;
      case 'fa-check':
        icone = faCheck;
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
      case 'fa-circle-plus':
        icone = faCirclePlus;
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
      case 'fa-money-bill':
        icone = faMoneyBill;
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
      case 'fa-envelope-open':
        icone = faEnvelopeOpen;
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
      case 'fa-shower':
        icone = faShower;
        break;
      case 'fa-scissors':
        icone = faScissors;
        break;
      case 'fa-car':
        icone = faCar;
        break;
      default:
        icone = faBars;
    }
    return icone;
  }

}
