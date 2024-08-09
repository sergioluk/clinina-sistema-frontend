import { Injectable } from '@angular/core';
import { Tutor } from '../interfaces/produtoVenda';

@Injectable({
  providedIn: 'root'
})
export class EnviarTutorService {

  private tutor!: Tutor | null;

  constructor() { }

  setTutor(tutor: Tutor) {
    this.tutor = tutor;
  }

  getTutor() {
    return this.tutor;
  }

  clearTutor() {
    this.tutor = null;
  }
}
