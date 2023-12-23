import { Component, OnInit } from '@angular/core';
import { CardHomeService } from '../card-home.service';
import { Router } from '@angular/router';
import { CardHome } from '../card-home/card-home';
import { CadastroProduto } from './cadastro-produto';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';




@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  modal: boolean = false;
  removerCategoria: boolean = false;
  categoriaNova!: string;
  modalIdade: boolean = false;
  removerIdade: boolean = false;
  modalSabor: boolean = false;
  modalRemoverSabor: boolean = false;
  modalFornecedor: boolean = false;
  modalRemoverFornecedor: boolean = false;

  listaDeCategoria: string [] = [
    "Ração","Sachê","Acessório"
  ];

  listaDeImagens: string [] = [''];

  listaDeInformacao: string [] = [''];

  listaDeIdade: string [] = [
    "Adulto","Filhote","Idoso"
  ];

  listaDeSabor: string [] = [
    "Carne","Frango","Peixe"
  ];

  listaDeFornecedor: string [] = [
    "Admax", "Donizete", "FVO"
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
      sabor: ['Carne', Validators.compose([
        Validators.required,
        //Validators.minLength(3)
        //minusculoValidator
      ])],
      idade: ['Adulto'],
      categoria: ['Ração', Validators.compose([
        Validators.required
      ])],
      animal: ['Cachorro'],
      informacao: [this.listaDeInformacao],
      peso: [],
      preco: [],
      desconto: [],
      estoque: [],
      venda: [],
      castrado: [0],
      fornecedor: ['Admax'],
      porte: this.buildPortes(),
      litros: [''],
      imagemP: [this.listaDeImagens],
      imagens: ['']
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

    //só teste
    let valueSubmit = Object.assign({}, this.formulario.value);
    valueSubmit = Object.assign(valueSubmit, {
      porte: valueSubmit.porte.map((v: any,i: number) => v ? this.porte[i] : null).filter((v: null) => v !== null)
    });

    console.log('pingamoanidaba',valueSubmit);

    if (this.formulario.valid){
      //this.service.criar(this.formulario.value).subscribe(() => {
        this.service.criar(valueSubmit).subscribe(() => {//provavelmente é assim, só testando pra saber
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
    this.listaDeIdade.push(this.formularioSecundario.get('idadeNovaForm')?.value);
    this.formularioSecundario.get('idadeNovaForm')?.setValue('');
    console.log(this.listaDeIdade);
    this.fecharModalIdade();
  }

  abrirFecharModalSabor() {
    this.modalSabor = !this.modalSabor;
  }

  abrirFecharModalRemoverSabor() {
    this.modalRemoverSabor = !this.modalRemoverSabor;
  }

  adicionarSabor() {
    this.listaDeSabor.push(this.formularioSecundario.get('saborNovaForm')?.value);
    this.formularioSecundario.get('saborNovaForm')?.setValue('');
    console.log(this.listaDeSabor);
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
    this.listaDeFornecedor.push(this.formularioSecundario.get('fornecedorNovaForm')?.value);
    this.formularioSecundario.get('fornecedorNovaForm')?.setValue('');
    console.log(this.listaDeFornecedor);
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
