import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent {

  nome:string;
  email:string;
  mensagem:string;

  constructor(){
    this.nome="";
    this.email="";
    this.mensagem="";
  }

  enviarFormulario(): void {
    console.log('Ok nome: ' + this.nome + " email: " + this.email + " msg: " + this.mensagem)
  }

}
