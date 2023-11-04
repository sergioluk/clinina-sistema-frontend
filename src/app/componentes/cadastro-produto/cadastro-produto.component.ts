import { Component } from '@angular/core';
import { CardHomeService } from '../card-home.service';
import { Router } from '@angular/router';
import { CardHome } from '../card-home/card-home';
import { CadastroProduto } from './cadastro-produto';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent {

  nome:string;
  email:string;
  mensagem:string;

  produto: CardHome = {

    produto: '',
    preco: 0,

  }

  cadastroProduto: CadastroProduto = {
    produto: '',
    sabor: '',
    idade: '',
    categoria: '',
    animal: '',
    informacao: '',
    peso: 0,
    preco: 0,
    desconto: 0,
    estoque: 0,
    venda: 0,
    castrado: 0,
    fornecedor: '',
    litros: '',
    imagemP: '',
    imagens: ''

  }

  constructor(private service: CardHomeService, private router: Router){
    this.nome="";
    this.email="";
    this.mensagem="";
  }

  enviarFormulario(): void {
    console.log('Ok nome: ' + this.nome + " email: " + this.email + " msg: " + this.mensagem)
  }

  cadastrarProduto(){
    this.service.criar(this.cadastroProduto).subscribe(() => {
      //this.router.navigate(['/home']);
    })
  }


}
