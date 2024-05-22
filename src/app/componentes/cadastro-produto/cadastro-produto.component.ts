import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CardHomeService } from '../card-home.service';
import { Router } from '@angular/router';
import { CardHome } from '../card-home/card-home';
import { CadastroProduto, Categoria, Fornecedor, Idade, Sabor } from './cadastro-produto';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';
import { ListaId } from 'src/app/interfaces/produtoVenda';
import { EnviarProdutoService } from 'src/app/services/enviar-produto.service';
import { IconeService } from 'src/app/services/icone.service';




@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {

  /*Meu*/

  produto!: CadastroProduto;

  listaDeCategoria: Categoria [] = [];
  listaDeImagens: string [] = [''];
  listaDeInformacao: string [] = [''];
  listaDeIdade: Idade [] = [];
  listaDeSabor: Sabor [] = [];
  listaDeFornecedor: Fornecedor [] = [];
  listaDeUnidades: ListaId[] = [{'nome': 'kg'},{'nome': 'g'},{'nome': 'mg'},{'nome': 'l'},{'nome': 'ml'}];

  formulario!: FormGroup;
  formularioSecundario!: FormGroup;
  janelaGerenciar: boolean = false;
  tipo = "";
  lista = [{id: 0, nome: ""}];
  modoEdicao: boolean = false;
  titulo = "Cadastrar";

  constructor(private service: CardHomeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private viewportScroller: ViewportScroller,
    private enviarProduto: EnviarProdutoService,
    private icone: IconeService
 ){}

 ngOnInit(): void {

  //Carregar os selects
  this.listarCategoria();
  this.listarSabor();
  this.listarIdade();
  this.listarFornecedor();

  this.formulario = this.formBuilder.group({
    codigoDeBarras: ['', Validators.compose([
      // Validators.required
    ])],
    categoria: ['Ração'],
    produto: ['', Validators.compose([
      // Validators.required,
      // Validators.minLength(3),
      //Validators.pattern(/(.|\s)*\S(.|\s)*/)
    ])],
    imagens: [this.listaDeImagens],
    sabor: ['Carne'],
    idade: ['Adulto'],
    preco: [],
    precoCompra: [],
    peso: [1],
    desconto: [0],
    animal: ['Cachorro'],
    castrado: [0],
    porte: this.buildPortes(),
    informacao: [this.listaDeInformacao],
    fornecedor: ['Sem fornecedor'],
    estoque: [1],
    imagemP: [''],
    lucro: []
  });

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

  //Parte do Alterar produto
  let produtoRecebido = this.enviarProduto.getProduto();
  if (produtoRecebido != null || produtoRecebido != undefined) {
    this.modoEdicao = true;
    this.titulo = "Alterar";
    this.produto = produtoRecebido;
    this.enviarProduto.clearProduto();
    this.setarProdutoNoFormulario();
  }

}

  setIcone(icone: string) {
    return this.icone.getIcone(icone);
  }
  estilos() {
    return {
      'font-weight':'bold',
      'flex-grow': '1'
    };
  }

  cadastrarProduto(){
    //Setar imagem Principal
    let imagemPrincipal = this.formulario.get('imagens')?.value[0];
    this.formulario.get('imagemP')?.setValue(imagemPrincipal);

    //colocar o peso com a sua unidade
    let unidadePeso = this.formularioSecundario.get('unidadeNovaForm')?.value;
    let peso = this.formulario.get('peso')?.value;
    let pesoComUnidade = peso + unidadePeso;
    this.formulario.get('peso')?.setValue(pesoComUnidade);

    this.formulario.get('categoria')?.setValue(this.salvarCategoria());//forma de enviar no json o objeto categoria
    this.formulario.get('sabor')?.setValue(this.salvarSabor());
    this.formulario.get('idade')?.setValue(this.salvarIdade());
    this.formulario.get('fornecedor')?.setValue(this.salvarFornecedor());

    let valueSubmit = Object.assign({}, this.formulario.value);
    valueSubmit = Object.assign(valueSubmit, {
      porte: valueSubmit.porte.map((v: any,i: number) => v ? this.porte[i] : null).filter((v: null) => v !== null)
    });

    console.log('pingamoanidaba',valueSubmit);
    console.log("valido:" + this.formulario.valid);
    if (this.formulario.valid){
      if (this.modoEdicao) {
        console.log("modo editar");
        this.service.editarProduto(valueSubmit).subscribe(() => {
          this.viewportScroller.scrollToPosition([0, 0]);
          window.location.reload();
        });
      } else {
        this.service.criar(valueSubmit).subscribe(() => {
          //this.router.navigate(['/home']);
          this.viewportScroller.scrollToPosition([0, 0]);
          window.location.reload();
        });
      }
    }
  }

  verificarCodigoDeBarras() {
    let codigo = this.formulario.get('codigoDeBarras')?.value;
    this.service.verificarCodigoDeBarras(codigo).subscribe((resultado) => {
      if (resultado == true) {
        alert("Produto Já registrado!!!");
        window.location.reload();
      }
    });
  }

  setarProdutoNoFormulario() {
    this.formulario.get('codigoDeBarras')?.setValue(this.produto.codigoDeBarras);
    this.formulario.get('produto')?.setValue(this.produto.produto);
    this.formulario.get('imagemP')?.setValue(this.produto.imagemP);
    if (this.produto.precoCompra != null) {
      this.formulario.get('precoCompra')?.setValue(this.produto.precoCompra);
      let lucro = (100*this.produto.preco/this.produto.precoCompra) - 100;
      this.formulario.get('lucro')?.setValue(lucro.toFixed(2));
    }
    this.getImagensByIndex(0).setValue(this.produto.imagemP);
    this.populandoListaDeImagens(0);
    this.formulario.get('preco')?.setValue(this.produto.preco);
    this.formulario.get('estoque')?.setValue(this.produto.estoque);
  }
  cancelar() {
    this.router.navigate(['/venda']);
  }
  fecharJanelaGerenciar() {
    this.janelaGerenciar = !this.janelaGerenciar;
  }
  converterLista(array: any[]) {
    this.lista = [];
    for(let i = 0; i < array.length; i++) {
      this.lista.push({id: array[i].id, nome: array[i].nome});
    }
  }

  toggleEditarCategoria() {
    this.janelaGerenciar = !this.janelaGerenciar;
    this.tipo = "Categoria";
    this.converterLista(this.listaDeCategoria);
  }
  toggleEditarSabor() {
    this.janelaGerenciar = !this.janelaGerenciar;
    this.tipo = "Sabor";
    this.converterLista(this.listaDeSabor);
  }
  toggleEditarIdade() {
    this.janelaGerenciar = !this.janelaGerenciar;
    this.tipo = "Idade";
    this.converterLista(this.listaDeIdade);
  }
  toggleEditarFornecedor() {
    this.janelaGerenciar = !this.janelaGerenciar;
    this.tipo = "Fornecedor";
    this.converterLista(this.listaDeFornecedor);
  }

  atualizar() {
    let lucro = this.formulario.get('lucro')?.value;
    if (lucro <= 0) {
      return;
    }
    this.atualizarVenda();
    return;
  }
  atualizarVenda() {
    let precoCompra = this.formulario.get('precoCompra')?.value;
    if (!precoCompra) {
      return;
    }
    let lucro = this.formulario.get('lucro')?.value;
    let precoVenda = Number((precoCompra*lucro/100)) + Number(precoCompra);
    this.formulario.get('preco')?.setValue(precoVenda.toFixed(2));
  }
  atualizarLucro() {
    let precoCompra = this.formulario.get('precoCompra')?.value;
    if (!precoCompra) {
      return;
    }
    let precoVenda = this.formulario.get('preco')?.value;
    let lucro = (100*precoVenda/precoCompra) - 100;
    this.formulario.get('lucro')?.setValue(lucro.toFixed(2));
  }

  salvarCategoria(): Categoria {
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
    return categoria;
  }
  salvarSabor(): Sabor {
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
    return sabor;
  }
  salvarIdade(): Idade {
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
    return idade;
  }
  salvarFornecedor(): Fornecedor {
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
    return fornecedor;
  }

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

  /*FIM MEU*/

  modal: boolean = false;
  removerCategoria: boolean = false;
  categoriaNova!: string;
  modalIdade: boolean = false;
  removerIdade: boolean = false;
  modalSabor: boolean = false;
  modalRemoverSabor: boolean = false;
  modalFornecedor: boolean = false;
  modalRemoverFornecedor: boolean = false;


  testagemDeValores() {

    console.log(this.formulario.get('codigoDeBarras')?.value);
    console.log(this.formulario.get('categoria')?.value);
    console.log(this.formulario.get('imagemP')?.value[0]);
    console.log(this.formulario.get('produto')?.value);
    console.log(this.formulario.get('sabor')?.value);
    console.log(this.formulario.get('idade')?.value);
    console.log(this.formulario.get('informacao')?.value[0]);
    console.log(this.formulario.get('preco')?.value);
    console.log(this.formulario.get('precoCompra')?.value);
    console.log(this.formulario.get('peso')?.value);
    console.log(this.formulario.get('desconto')?.value);
    console.log(this.formulario.get('animal')?.value);
    console.log(this.formulario.get('castrado')?.value);
    console.log(this.formulario.get('porte')?.value);
    console.log(this.formulario.get('fornecedor')?.value);
    console.log(this.formulario.get('estoque')?.value);

    console.log("Lista imagens");
    for (let i = 0; i < this.listaDeImagens.length; i++) {
      console.log(this.listaDeImagens[i]);
    }
    console.log("Lista informacao");
    for (let i = 0; i < this.listaDeInformacao.length; i++) {
      console.log(this.listaDeInformacao[i]);
    }

    console.log('Unidade: ' + this.formularioSecundario.get('unidadeNovaForm')?.value);
    

    console.log(this.formulario);
  }

  modalCategoria(){
    this.modal = true;
  }
  fecharModalCategoria(){
    this.modal = false;
  }
  adicionarCategoria(){
    let novaCategoria = this.formularioSecundario.get('categoriaNovaForm')?.value;
    this.formularioSecundario.get('categoriaNovaForm')?.setValue('');

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

  acaoRemoverCategoria(index: number) {
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
    return this.formularioSecundario.controls['imagemNovaForm'] as FormArray
  }

  get informacoesFormArray() {
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
    const url = this.imagensFormArray.at(index)?.value;
    console.log("nova url:", url);
    this.listaDeImagens[index] = url;
  }

  populandoListaDeInformacao(index: number) {
    const informacao = this.informacoesFormArray.at(index)?.value;
    console.log("nova informacao:", informacao);
    this.listaDeInformacao[index] = informacao;
  }

 
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
