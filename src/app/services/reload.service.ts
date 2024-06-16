import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {
  //nao funcionou...

  private reloadSubject = new Subject<void>();

  constructor() { }

  
  get reload$() {
    return this.reloadSubject.asObservable();
  }

  reload() {
    this.reloadSubject.next();
  }
}
