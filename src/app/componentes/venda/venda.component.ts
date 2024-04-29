import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CadastroProduto, Venda, VendaComQtd, Vender } from '../cadastro-produto/cadastro-produto';
import { CardHomeService } from '../card-home.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';/**/




import { faCartShopping } from '@fortawesome/free-solid-svg-icons';/**/


import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';/**/





@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {

  faXmark = faXmark;
  faCircleXmark = faCircleXmark;
  faBars = faBars;
  faMagnifyingGlass = faMagnifyingGlass;/**/
  faPencil = faPencil;
  faTrashCan = faTrashCan;

 





  faCartShopping = faCartShopping;

  //só pra pegar o id do input pra fazer o autofocus quando apertar em cadastrar
  @ViewChild('idDoInput') inputCodigoBarras!: ElementRef;
  input: string = '';
  inputPeso: string = '';
  total: number = 0;
  totalPeso: number = 0;
  modoCadastrar : boolean = false;
  divAviso : boolean = false;
  pesagem: boolean = false;
  formaDePagamento: boolean = false;

  formulario!: FormGroup;

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      formaPagamento: ['Dinheiro'],
      nome: [],
      telefone: [],
      endereco: []
    })
  }

/*
  produto: CadastroProduto = {
    produto: '',
    codigoDeBarras: '',
    sabor: '',
    idade: '',
    categoria: '',
    animal: '',
    informacao: [],
    peso: '',
    preco: 0,
    desconto: 0,
    estoque: 0,
    castrado: false,
    fornecedor: '',
    imagens: [],
    porte: '',
    imagemP: ''
  }
  */
  produto: Venda = {
    codigoDeBarras: '',
    produto: '',
    preco: 0,
    imagemP: '',
    id: 0
  }

  listaDeProdutos: VendaComQtd[] = [];

  produtoPesagem: VendaComQtd = {
    id: 0,
    codigoDeBarras: '',
    produto: '',
    preco: 0,
    imagemP: '',
    peso: '',
    quantidade: 1
  }

  constructor(private service: CardHomeService,
    private router: Router,
    private formBuilder: FormBuilder){}

  venda(){

    let listaDeVenda: Vender[] = [];
    for (let produto of this.listaDeProdutos) {

      if (this.formulario.get('formaPagamento')?.value == 'Fiado') {
        let produtosVender: Vender = {
          produto_id: produto.id,
          quantidade: produto.quantidade,
          precoUnitario: produto.preco,
          precoTotal: produto.preco * produto.quantidade,
          peso: produto.peso,
          data: new Date(),
          pagamento: this.formulario.get('formaPagamento')?.value,
          nome: this.formulario.get('nome')?.value,
          telefone: this.formulario.get('telefone')?.value,
          endereco: this.formulario.get('endereco')?.value
        }
        listaDeVenda.push(produtosVender);
      } else {
        let produtosVender: Vender = {
          produto_id: produto.id,
          quantidade: produto.quantidade,
          precoUnitario: produto.preco,
          precoTotal: produto.preco * produto.quantidade,
          peso: produto.peso,
          data: new Date(),
          pagamento: this.formulario.get('formaPagamento')?.value,
        }
        listaDeVenda.push(produtosVender);
      }



    }
    if (listaDeVenda.length > 0) {
      this.service.vender(listaDeVenda).subscribe(() => {
        //this.router.navigate(['/home']);
        window.location.reload();
      });
    } else {
      alert("Não há produtos na lista!!");
      window.location.reload();
    }

  }

  removerItemDaLista(index: number) {
    if (this.listaDeProdutos[index].quantidade > 1) {
      this.listaDeProdutos[index].quantidade -= 1;
    } else {
      this.listaDeProdutos.splice(index,1);
    }
    this.calcularTotal();
  }

  recarregar(){
    window.location.reload();
  }

  cadastrar(){
    this.modoCadastrar = !this.modoCadastrar;
    //fazer o focus automatico no input
    this.inputCodigoBarras.nativeElement.focus();
  }

  cadastrarOuPesquisar() {
    if (this.modoCadastrar) {
      return 'modo-cadastrar barra-de-pesquisa'
    }
    return 'barra-de-pesquisa'
  }

  aviso(){
    this.divAviso = !this.divAviso;
  }

  listarFiado(){
    //this.router.navigate(['/fiado']);
    window.open('/fiado', '_blank');
  }

  ApertandoEnter(){
    console.log("Codigo de barras: " + this.input);
    let data = new Date().toLocaleString('pt-BR');
    console.log("Hora: " + data);

    this.service.pesquisarPorCodigoDeBarras(this.input).subscribe((produto) => {

      //parte da parte para cadastrar
      if (this.modoCadastrar){
        if (produto == null) {
          this.router.navigate(['/cadastrarProduto']);
          return;
        } else {
          this.service.aumentarEstoque(this.input).subscribe((produto) => {
            this.input = '';
            this.divAviso = true;
            const tempoDesejado = 1000;
            setTimeout(() => {
              this.divAviso = false;
            }, tempoDesejado);

          });
        }
        return;
      }

      if (produto == null) {
        alert("Produto não encontrado!!!!");
        this.input = '';
        return;
      }
      //aparecer o modal de pesagem
      if (this.input.length <= 3) {
        this.pesagem = true;
        this.input = '';
        //preenchendo o objeto da pesagem
        this.produtoPesagem.id = produto.id;
        this.produtoPesagem.produto = produto.produto;
        this.produtoPesagem.codigoDeBarras = produto.codigoDeBarras;
        this.produtoPesagem.imagemP = produto.imagemP;
        this.produtoPesagem.preco = produto.preco;
        this.produtoPesagem.quantidade = 1;
        return;
      }
      this.produto = produto;
      this.input = '';
      console.log("Produto: " + this.produto.produto);

      let itemJaNaLista = false;
      let itemIndex = -1;
      for (let index = 0; index < this.listaDeProdutos.length; index++) {
        if (this.produto.codigoDeBarras == this.listaDeProdutos[index].codigoDeBarras) { //se ja tiver o item na lista de itens, só aumentar a qtd, se não criar um novo objeto para a lista
          itemJaNaLista = true;
          itemIndex = index;
        }
      }
      if (itemJaNaLista) {
        this.listaDeProdutos[itemIndex].quantidade++;
      } else {
        let produtoComQtd: VendaComQtd = {
          id: this.produto.id,
          codigoDeBarras: this.produto.codigoDeBarras,
          produto: this.produto.produto,
          preco: this.produto.preco,
          imagemP: this.produto.imagemP,
          peso: '',
          quantidade: 1
        }
        this.listaDeProdutos.push(produtoComQtd);
      }
      //só pra pegar o total
      this.calcularTotal();
    });


  }

  fecharModalPesagem() {
    this.pesagem = false;
    this.inputPeso = '';
  }

  vendaFormaDePagamento() {
    if (this.listaDeProdutos.length < 1){
      alert('Não há itens na lista!');
      return;
    }
    this.formaDePagamento = true;
  }

  fecharModalPagamento() {
    this.formaDePagamento = false;
  }

  calcularPrecoPorPeso(event: KeyboardEvent) {
    //Aqui é pra não colocar mais de 100kg em peso pra ficar sempre no 00,000
    if (this.inputPeso.length > 6) {
      this.inputPeso = this.inputPeso.slice(0,-1);
      return;
    }
    const teclaDigitada = event.key;
    // Permite apenas números (0-9) e backspace
    if (!(teclaDigitada >= '0' && teclaDigitada <= '9') && teclaDigitada !== 'Backspace') {
      event.preventDefault();
      this.inputPeso = this.inputPeso.slice(0,-1);
    }

    //Isso tudo só pra aparecer o valor do jeito certo no input...
    let bola = false;
    let valorDigitado = '';
    for (let i = 0; i < this.inputPeso.length; i++) {
      if ((this.inputPeso.charAt(i) == '0' || this.inputPeso.charAt(i) == ',') && bola == false) {
      } else {
        bola = true;
        valorDigitado += this.inputPeso.charAt(i);
      }
    }

    let valorCustom = '';
    for (let i = 0; i < valorDigitado.length; i++) {
      if (valorDigitado.charAt(i) != ','){
        valorCustom += valorDigitado.charAt(i);
      }
    }
    valorDigitado = valorCustom;
    console.log("valor digitado: " + valorDigitado)

    if (valorDigitado.length == 1) {
      this.inputPeso = '0,00' + valorDigitado;
    } else if (valorDigitado.length == 2) {
      this.inputPeso = '0,0' + valorDigitado;
    } else if (valorDigitado.length == 3) {
      this.inputPeso = '0,' + valorDigitado;
    } else if (valorDigitado.length == 4) {
      let parte1 = valorDigitado.substring(0,1);
      let parte2 = valorDigitado.substring(1);
      this.inputPeso = parte1 + ',' + parte2;
    } else {
      let parte1 = valorDigitado.substring(0,2);
      let parte2 = valorDigitado.substring(2);
      this.inputPeso = parte1 + ',' + parte2;
    }

    //calcular o preço com o peso mesmo...
    let valorPeso: number = Number(valorDigitado)/1000;
    this.totalPeso = this.produtoPesagem.preco * valorPeso;

  }

  adicionarProdutoPesadoNaLista(){
    let produtoPesado: VendaComQtd = {
      id: this.produtoPesagem.id,
      codigoDeBarras: this.produtoPesagem.codigoDeBarras,
      produto: this.produtoPesagem.produto + " (" + this.inputPeso + "g)",
      preco: this.totalPeso,
      imagemP: this.produtoPesagem.imagemP,
      peso: this.inputPeso + 'g',
      quantidade: 1
    };
    this.inputPeso = '';
    this.listaDeProdutos.push(produtoPesado);

    //Aparecer a imagem
    this.produto.imagemP = this.produtoPesagem.imagemP;
    //limpando o objeto
    this.produtoPesagem.id = 0;
    this.produtoPesagem.codigoDeBarras = '';
    this.produtoPesagem.produto = '';
    this.produtoPesagem.imagemP = '';
    this.produtoPesagem.quantidade = 0;
    this.produtoPesagem.preco = 0;

    this.calcularTotal();

    this.fecharModalPesagem();
  }

  calcularTotal(){
    let listaTotal = 0;
    for (let index = 0; index < this.listaDeProdutos.length; index++) {
      listaTotal += (this.listaDeProdutos[index].preco * this.listaDeProdutos[index].quantidade);
    }
    this.total = listaTotal;
  }

  ehFiado(){
    if (this.formulario.get('formaPagamento')?.value == 'Fiado'){
      return true;
    }
    return false;
  }

}
