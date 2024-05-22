import { Injectable } from '@angular/core';
import { faBars, faPencil } from '@fortawesome/free-solid-svg-icons';


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
      default:
        icone = faBars;
    }
    return icone;
  }

}
