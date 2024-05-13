import { Component, OnInit } from '@angular/core';
import { CardHomeService } from '../card-home.service';
import { Router } from '@angular/router';
import { CardHome } from '../card-home/card-home';
import { CadastroProduto, Categoria, Fornecedor, Idade, Sabor } from './cadastro-produto';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';
import { faBars } from '@fortawesome/free-solid-svg-icons';





@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {


  faBars = faBars;

  /*
    Meu*/

    estilos() {
      return {
        'font-weight':'bold'
      };
    }

    /*FIM MEU
  */

  modal: boolean = false;
  removerCategoria: boolean = false;
  categoriaNova!: string;
  modalIdade: boolean = false;
  removerIdade: boolean = false;
  modalSabor: boolean = false;
  modalRemoverSabor: boolean = false;
  modalFornecedor: boolean = false;
  modalRemoverFornecedor: boolean = false;

  listaDeCategoria: Categoria [] = [
    //"Ração","Sachê","Acessório"
  ];

  listaDeImagens: string [] = [''];

  listaDeInformacao: string [] = [''];

  listaDeIdade: Idade [] = [
    //"Adulto","Filhote","Idoso"
  ];

  listaDeSabor: Sabor [] = [
    //"Carne","Frango","Peixe"
  ];

  listaDeFornecedor: Fornecedor [] = [
    //"Admax", "Donizete", "FVO"
  ];

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
     private formBuilder: FormBuilder,
     private viewportScroller: ViewportScroller
  ){}

  listaCards2: CadastroProduto[] = []

    listarCategoria() {
      this.service.pegarListaCategoria().subscribe((listaDeCategoria) =>{
        this.listaDeCategoria = listaDeCategoria;
      });
    }

    listarSabor() {
      this.service.pegarListaSabor().subscribe((listaDeSabor) =>{
        this.listaDeSabor = listaDeSabor;
      });
    }

    listarIdade() {
      this.service.pegarListaIdade().subscribe((listaDeIdade) =>{
        this.listaDeIdade = listaDeIdade;
      });
    }

    listarFornecedor() {
      this.service.pegarListaFornecedor().subscribe((listaDeFornecedor) =>{
        this.listaDeFornecedor = listaDeFornecedor;
      });
    }

  ngOnInit(): void {
    //Carregar os selects
    this.listarCategoria();
    this.listarSabor();
    this.listarIdade();
    this.listarFornecedor();

    this.formulario = this.formBuilder.group({
      codigoDeBarras: [''],
      categoria: ['Ração', Validators.compose([
        Validators.required
      ])],
      produto: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        //Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      imagens: [this.listaDeImagens], /** */
      sabor: ['Carne', Validators.compose([
        Validators.required,
        //Validators.minLength(3)
        //minusculoValidator
      ])],
      idade: ['Adulto'],
      preco: [],
      peso: [],
      desconto: [0],
      animal: ['Cachorro'],
      castrado: [0],
      porte: this.buildPortes(),
      informacao: [this.listaDeInformacao],
      fornecedor: ['Admax'],
      estoque: [1],
      imagemP: [''],

    })
/*
    this.formularioSecundario = this.formBuilder.group({
      categoriaNovaForm: new FormControl(),
      imagemNovaForm: this.formBuilder.array([
        this.formBuilder.control('https://img.quizur.com/f/img653acaa2ba4a70.55763262.jpeg?lastEdited=1698351787'),
        this.formBuilder.control('https://images-americanas.b2w.io/produtos/1648551649/imagens/pera-em-eva/1648551649_1_large.jpg')
        //new FormControl('https://img.quizur.com/f/img653acaa2ba4a70.55763262.jpeg?lastEdited=1698351787'),
        //new FormControl('https://images-americanas.b2w.io/produtos/1648551649/imagens/pera-em-eva/1648551649_1_large.jpg')
      ])
    });*/

    this.formularioSecundario = new FormGroup({
      categoriaNovaForm: new FormControl(),
      imagemNovaForm: new FormArray([
        new FormControl('')
      ]),
      informacaoNovaForm: new FormArray([
        new FormControl('')
      ]),
      idadeNovaForm: new FormControl(),
      saborNovaForm: new FormControl(),
      fornecedorNovaForm: new FormControl(),
      unidadeNovaForm: new FormControl('kg'),
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


    let imagemPrincipal = this.formulario.get('imagens')?.value[0];
    this.formulario.get('imagemP')?.setValue(imagemPrincipal);

    //colocar o peso com a sua unidade
    let unidadePeso = this.formularioSecundario.get('unidadeNovaForm')?.value;
    let peso = this.formulario.get('peso')?.value;
    let pesoComUnidade = peso + unidadePeso;
    this.formulario.get('peso')?.setValue(pesoComUnidade);

    //Salvar categoria - Enviar o JSON como objeto categoria
    let nomeCategoria = this.formulario.get('categoria')?.value;
    let idCat: number | undefined = 0;
    for (let i = 0; i < this.listaDeCategoria.length; i++) {
      if (nomeCategoria === this.listaDeCategoria[i].nome){
        idCat = this.listaDeCategoria[i].id;
      }
    }
    let categoria: Categoria = {
      id: idCat,
      nome: this.formulario.get('categoria')?.value
    }
    this.formulario.get('categoria')?.setValue(categoria); //forma de enviar no json o objeto categoria

    //Salvar sabor - Enviar o JSON como objeto sabor
    let nomeSabor = this.formulario.get('sabor')?.value;
    let idSabor: number | undefined = 0;
    for (let i = 0; i < this.listaDeSabor.length; i++) {
      if (nomeSabor === this.listaDeSabor[i].nome){
        idSabor = this.listaDeSabor[i].id;
      }
    }
    let sabor: Sabor = {
      id: idSabor,
      nome: nomeSabor
    }
    this.formulario.get('sabor')?.setValue(sabor); //forma de enviar no json o objeto sabor

    //Salvar idade - Enviar o JSON como objeto idade
    let nomeIdade = this.formulario.get('idade')?.value;
    let idIdade: number | undefined = 0;
    for (let i = 0; i < this.listaDeIdade.length; i++) {
      if (nomeIdade === this.listaDeIdade[i].nome){
        idIdade = this.listaDeIdade[i].id;
      }
    }
    let idade: Idade = {
      id: idIdade,
      nome: nomeIdade
    }
    this.formulario.get('idade')?.setValue(idade); //forma de enviar no json o objeto idade

    //Salvar fornecedor - Enviar o JSON como objeto fornecedor
    let nomeFornecedor = this.formulario.get('fornecedor')?.value;
    let idFornecedor: number | undefined = 0;
    for (let i = 0; i < this.listaDeFornecedor.length; i++) {
      if (nomeFornecedor === this.listaDeFornecedor[i].nome){
        idFornecedor = this.listaDeFornecedor[i].id;
      }
    }
    let fornecedor: Fornecedor = {
      id: idFornecedor,
      nome: nomeFornecedor
    }
    this.formulario.get('fornecedor')?.setValue(fornecedor); //forma de enviar no json o objeto fornecedor

    let valueSubmit = Object.assign({}, this.formulario.value);
    valueSubmit = Object.assign(valueSubmit, {
      porte: valueSubmit.porte.map((v: any,i: number) => v ? this.porte[i] : null).filter((v: null) => v !== null)
    });



    console.log('pingamoanidaba',valueSubmit);
    console.log("valido:" + this.formulario.valid);
    if (this.formulario.valid){
      //this.service.criar(this.formulario.value).subscribe(() => {
        this.service.criar(valueSubmit).subscribe(() => {//provavelmente é assim, só testando pra saber
        //this.router.navigate(['/home']);
        this.viewportScroller.scrollToPosition([0, 0]);
        window.location.reload();
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
    let novaCategoria = this.formularioSecundario.get('categoriaNovaForm')?.value;
    //this.listaDeCategoria.push(this.categoriaNova); por enquanto para compilar
    this.formularioSecundario.get('categoriaNovaForm')?.setValue('');
    //console.log(this.listaDeCategoria)


    let categoria: Categoria = {
      nome: novaCategoria
    }
    this.service.adicionarCategoria(categoria).subscribe(() => {
      this.listarCategoria();
    });

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
    this.formulario.get('categoria')?.setValue( this.listaDeCategoria[0]);
  }

  abrirModalIdade(){
    this.modalIdade = true;
  }

  fecharModalIdade() {
    this.modalIdade = false;
  }

  //-------

  abrirRemoverModalIdade() {
    this.removerIdade = true;
  }

  fecharRemoverIdade(){
    this.removerIdade = false;
  }

  acaoRemoverIdade(index: number) {
    this.listaDeIdade.splice(index, 1);
    this.formulario.get('idade')?.setValue( this.listaDeIdade[0]);
  }

  adicionarIdade() {
    let idadeNova = this.formularioSecundario.get('idadeNovaForm')?.value;
    this.formularioSecundario.get('idadeNovaForm')?.setValue('');
    let idade: Idade = {
      nome: idadeNova
    }
    this.service.adicionarIdade(idade).subscribe(() => {
      this.listarIdade();
    });
    this.fecharModalIdade();
  }

  abrirFecharModalSabor() {
    this.modalSabor = !this.modalSabor;
  }

  abrirFecharModalRemoverSabor() {
    this.modalRemoverSabor = !this.modalRemoverSabor;
  }

  adicionarSabor() {
    let saborNova = this.formularioSecundario.get('saborNovaForm')?.value;
    this.formularioSecundario.get('saborNovaForm')?.setValue('');
    let sabor: Sabor = {
      nome: saborNova
    }
    this.service.adicionarSabor(sabor).subscribe(() => {
      this.listarSabor();
    });
    this.abrirFecharModalSabor();
  }

  acaoRemoverSabor(index: number) {
    this.listaDeSabor.splice(index, 1);
    this.formulario.get('sabor')?.setValue( this.listaDeSabor[0]);

  }

  abrirFecharModalFornecedor() {
    this.modalFornecedor = !this.modalFornecedor;
  }

  abrirFecharModalRemoverFornecedor() {
    this.modalRemoverFornecedor = !this.modalRemoverFornecedor;
  }

  adicionarFornecedor() {
    let fornecedorNova = this.formularioSecundario.get('fornecedorNovaForm')?.value;
    this.formularioSecundario.get('fornecedorNovaForm')?.setValue('');
    let fornecedor: Fornecedor = {
      nome: fornecedorNova
    }
    this.service.adicionarFornecedor(fornecedor).subscribe(() => {
      this.listarFornecedor();
    });
    this.abrirFecharModalFornecedor();
  }

  acaoRemoverFornecedor(index: number) {
    this.listaDeFornecedor.splice(index, 1);
    this.formulario.get('fornecedor')?.setValue( this.listaDeFornecedor[0]);
  }

  get imagensFormArray() {
    //return this.formularioSecundario.get('imagemNovaForm') as FormArray;
    return this.formularioSecundario.controls['imagemNovaForm'] as FormArray
  }

  get informacoesFormArray() {
    //return this.formularioSecundario.get('imagemNovaForm') as FormArray;
    return this.formularioSecundario.controls['informacaoNovaForm'] as FormArray
  }

  adicionarImagem(){
    this.imagensFormArray.push(new FormControl(''));
    this.listaDeImagens.push('');
  }

  // Used to get a strongly typed FormControl
  getImagensByIndex(index: number): FormControl {
    return this.imagensFormArray.at(index) as FormControl;
  }

  getInformacoesByIndex(index: number): FormControl {
    return this.informacoesFormArray.at(index) as FormControl;
  }

  removerImagem(index: number){
    this.imagensFormArray.removeAt(index);
    this.listaDeImagens.splice(index, 1);
  }

  removerInformacao(index: number) {
    this.informacoesFormArray.removeAt(index);
    this.listaDeInformacao.splice(index, 1);
  }

  populandoListaDeImagens(index: number){
    //this.listaDeImagens[index] = this.formularioSecundario.get('imagemNovaForm')?.value;
    const url = this.imagensFormArray.at(index)?.value;
    console.log("nova url:", url);
    this.listaDeImagens[index] = url;
  }

  populandoListaDeInformacao(index: number) {
    const informacao = this.informacoesFormArray.at(index)?.value;
    console.log("nova informacao:", informacao);
    this.listaDeInformacao[index] = informacao;
  }

  /*
  Colocar isso na hora de cadastrar pq ta hard...
  juntarComUnidade() {
    const peso = this.formulario.get('peso')?.value;
    const unidade: string = this.formularioSecundario.get('unidadeNovaForm')?.value;
    this.formulario.get('peso')?.setValue(peso + unidade);
  }*/

  adicionarInformacao() {
    this.informacoesFormArray.push(new FormControl(''));
    this.listaDeInformacao.push('');
  }

  porte = ['Grande','Medio','Pequeno'];

  buildPortes() {
    const values = this.porte.map(v =>  new FormControl(false));
    return this.formBuilder.array(values);
    /*
    this.formBuilder.array( [
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ])
    */
  }

  getPorteControls() {
    return this.formulario.get('porte') ? (<FormArray>this.formulario.get('porte')).controls : null;
  }



}
