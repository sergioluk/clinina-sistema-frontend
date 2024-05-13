import { Component, Input } from '@angular/core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faRectangleList } from '@fortawesome/free-regular-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { faDog } from '@fortawesome/free-solid-svg-icons';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu-opcao',
  templateUrl: './menu-opcao.component.html',
  styleUrls: ['./menu-opcao.component.css']
})
export class MenuOpcaoComponent {

  @Input() icone : string | undefined;
  @Input() texto : string | undefined;
  @Input() componente: string | undefined;

  iconeParaMostrar(){

    let icone;

    switch(this.icone){
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
        icone = faCircleXmark;
    }
    return icone;
  }

}
