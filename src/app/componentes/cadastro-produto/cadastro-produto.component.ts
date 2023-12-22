import { Component, OnInit } from '@angular/core';
import { CardHomeService } from '../card-home.service';
import { Router } from '@angular/router';
import { CardHome } from '../card-home/card-home';
import { CadastroProduto } from './cadastro-produto';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  modal: boolean = false;
  removerCategoria: boolean = false;
  categoriaNova!: string;

  listaDeCategoria: string [] = [
    "Ração","Sachê","Acessório"
  ];

  listaDeImagens: string [] = [''];




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

  formulario!: FormGroup;
  formularioSecundario!: FormGroup;

  constructor(private service: CardHomeService,
     private router: Router,
     private formBuilder: FormBuilder
     ){




  }
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      codigoDeBarras: [''],
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
      categoria: ['Ração', Validators.compose([
        Validators.required
      ])],
      animal: ['Cachorro'],
      informacao: [''],
      peso: [],
      preco: [],
      desconto: [],
      estoque: [],
      venda: [],
      castrado: [],
      fornecedor: [''],
      litros: [''],
      imagemP: [this.listaDeImagens],
      imagens: ['']
    })

    this.formularioSecundario = new FormGroup({
      categoriaNovaForm: new FormControl(),
      imagemNovaForm: new FormControl([])
    });
  }

  enviarFormulario(): void {

  }

  cadastrarProduto(){
    /*
    this.service.criar(this.cadastroProduto).subscribe(() => {
      //this.router.navigate(['/home']);
    })*/
    console.log('ola')
    console.log(this.formulario.get('categoria')?.value);
    console.log(this.formulario.get('animal')?.value);
    console.log(this.formulario.get('castrado')?.value);
    console.log(this.formulario.get('imagemP')?.value[0]);
    console.log(this.formulario);
    if (this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe(() => {
        //this.router.navigate(['/home']);
      })
    }

  }

  teste(){
    const informações = 'Recomendado para cães filhotes; Filhotes mais felizes; Ossos mais fortes; Sem corantes.';

    const linhasDeInformações = informações.split(';');

    console.log(linhasDeInformações);
  }

  modalCategoria(){
    this.modal = true;
  }
  fecharModalCategoria(){
    this.modal = false;
  }
  adicionarCategoria(){
    this.categoriaNova = this.formularioSecundario.get('categoriaNovaForm')?.value;
    this.listaDeCategoria.push(this.categoriaNova);
    this.formularioSecundario.get('categoriaNovaForm')?.setValue('');
    console.log(this.listaDeCategoria)
    this.fecharModalCategoria();
  }

  modalRemoverCategoria(){
    this.removerCategoria = true;
  }

  fecharRemoverCategoria(){
    this.removerCategoria = false;
  }

  acaoRemoverCategoria(index: number){
    this.listaDeCategoria.splice(index, 1);
  }

  adicionarImagem(){
    //const imagemNova = this.formularioSecundario.get('imagemNovaForm')?.value;
    //this.listaDeImagens.push(imagemNova);

    this.listaDeImagens.push('');
    //this.formularioSecundario.get('imagemNovaForm')?.setValue('');

  }

  removerImagem(index: number){
    this.listaDeImagens.splice(index, 1);
  }

  populandoListaDeImagens(index: number){
    this.listaDeImagens[index] = this.formularioSecundario.get('imagemNovaForm')?.value;
  }


}
