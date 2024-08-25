import { Injectable } from '@angular/core';
import { Login } from '../interfaces/produtoVenda';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuario: Login | null = null;

  constructor() { }

  setUsuario(usuario: Login) {
    this.usuario = usuario;
  }

  getUsuario() {
    return this.usuario;
  }

  deslogarUsuario() {
    this.usuario = null;
  }
}
