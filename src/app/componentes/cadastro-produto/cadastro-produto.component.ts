import { Component, OnInit } from '@angular/core';
import { CardHomeService } from '../card-home.service';
import { Router } from '@angular/router';
import { CardHome } from '../card-home/card-home';
import { CadastroProduto } from './cadastro-produto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {



  produto: CardHome = {

    produto: '',
    preco: 0,

  }

  /*
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

  }*/

  formulario!: FormGroup

  constructor(private service: CardHomeService,
     private router: Router,
     private formBuilder: FormBuilder
     ){




  }
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      produto: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        //Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      sabor: ['', Validators.compose([
        Validators.required,
        //Validators.minLength(3)
        //minusculoValidator
      ])],
      idade: [''],
      categoria: ['', Validators.compose([
        Validators.required
      ])],
      animal: [''],
      informacao: [''],
      peso: [0],
      preco: [0],
      desconto: [0],
      estoque: [0],
      venda: [0],
      castrado: [0],
      fornecedor: [''],
      litros: [''],
      imagemP: [''],
      imagens: ['']
    })
  }

  enviarFormulario(): void {

  }

  cadastrarProduto(){
    /*
    this.service.criar(this.cadastroProduto).subscribe(() => {
      //this.router.navigate(['/home']);
    })*/

    if (this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe(() => {
        //this.router.navigate(['/home']);
      })
    }

  }


}
