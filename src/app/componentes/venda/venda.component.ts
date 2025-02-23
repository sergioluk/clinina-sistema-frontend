import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { VendaComQtd, Vender } from '../cadastro-produto/cadastro-produto';
import { CardHomeService } from '../card-home.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoVenda } from 'src/app/interfaces/produtoVenda';
import { TabelaVendaComponent } from './tabela-venda/tabela-venda.component';
import { IconeService } from 'src/app/services/icone.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AberturaCaixaService } from 'src/app/services/abertura-caixa.service';
import { LoginService } from 'src/app/services/login.service';





@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {

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
  statusCaixa: string = "disponível";

  formulario!: FormGroup;

  constructor(private service: CardHomeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private icone: IconeService ,
    private snackbar: SnackbarService,
    private caixa: AberturaCaixaService,
    public login: LoginService
  ){}

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      formaPagamento: ['Dinheiro'],
      nome: [],
      telefone: [],
      endereco: []
    });
    this.randomGif();
    this.titulo.emit("oi");

    this.caixa.exibirCaixa();
    this.caixa.caixaStatus$.subscribe(status => {
      this.statusCaixa = status;
    })
  }
  //Novo

  @Output() titulo = new EventEmitter<string>();

  abrirEditar = false;
  abrirCancelarCompra = false;
  metodoPagamento = false;
  janelaProcurarProduto = false;
  janelaProdutoPeso = false;
  notaFiscal = false;
  totalDesconto: number = 0;
  src = '';
  loadingSpinner = false;

  listaDeProdutos: ProdutoVenda[] = [];

  produto: ProdutoVenda = {
    codigoDeBarras: '',
    produto: '',
    preco: 0,
    imagemP: '',
    id: 0,
    peso: '',
    quantidade: 0,
    desconto: 0,
    precoCompra: 0
  }
  produtoComPeso: ProdutoVenda = {
    codigoDeBarras: '',
    produto: '',
    preco: 0,
    imagemP: '',
    id: 0,
    peso: '',
    quantidade: 0,
    desconto: 0,
    precoCompra: 0
  }
  @ViewChild(TabelaVendaComponent) tabela! : TabelaVendaComponent;
  //@ViewChild(TabelaVendaComponent) editarProduto! : EditarDescQtdComponent;

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }
  procurarProduto(codigo : string){
    this.tabela.procurarProduto(codigo);
  }
  enviarProdutoComPesoParaAdd(produto: ProdutoVenda) {
    this.adicionarProdutoComPeso(produto);
    this.janelaProdutoPeso = true;
  }
  enviarProdutoParaAdd(produto: ProdutoVenda) {
    this.tabela.adicionarProdutoPeloPesquisar(produto);
  }
  adicionarProdutoComPeso(produtoComPeso: ProdutoVenda) {
    this.produtoComPeso = produtoComPeso;
  }

  index = 0;
  abrirJanelaEditar(index: number) {
    this.index = index;
    this.toggleJanela()
  }

  toggleJanela() {
    this.abrirEditar = !this.abrirEditar;
  }
  toggleCancelarCompra() {
    this.abrirCancelarCompra = !this.abrirCancelarCompra;
  }
  toggleMetodoPagamento() {
    this.metodoPagamento = !this.metodoPagamento;
    this.toggleNotaFiscal();
  }
  toggleProcurarProduto () {
    this.janelaProcurarProduto = !this.janelaProcurarProduto;
  }
  toggleProdutoPeso() {
    this.janelaProdutoPeso = !this.janelaProdutoPeso;
  }
  toggleNotaFiscal() {
    this.notaFiscal = !this.notaFiscal;
  }
  abrirProcurarProduto() {
    this.toggleProcurarProduto();
  }
  cancelarVenda() {
    if (this.listaDeProdutos.length <= 0) {
      return;
    }
    this.toggleCancelarCompra();
  }
  vender() {
    if (this.statusCaixa != "aberto" ) {
      this.snackbar.openSnackBarFail("Caixa precisa estar aberto!!!","Fechar");
      return;
    }
    if (this.listaDeProdutos.length <= 0) {
      this.snackbar.openSnackBarFail("Não há produtos na lista!!!","Fechar");
      return;
    }
    this.toggleMetodoPagamento();
  }

  retornarSubtotal(){
    if (this.produto.desconto > 0) {
      let subtotal = (this.produto.preco * this.produto.quantidade) - this.produto.desconto;
      return `R$ ${this.produto.preco * this.produto.quantidade} - R$ ${this.produto.desconto} = R$ ${subtotal}`;
    }
    return `R$ ${this.produto.preco * this.produto.quantidade}`;
  }

  calcularDesconto(){
    this.tabela.calcularDescontoTotal();
  }

  receberTotalCalculado(totalCalculado: number){
    this.total = Number(totalCalculado.toFixed(2));
  }
  receberTotalDescontoCalculado (totalDescontoCalculado: number) {
    if (totalDescontoCalculado > 0) {
      this.totalDesconto = totalDescontoCalculado * (-1); //Mostrar Negativo no template
    } else {
      this.totalDesconto = totalDescontoCalculado;
    }

  }

  selecionarProduto(produto : ProdutoVenda){
    this.produto = produto;
  }

  limparTabela() {
    this.listaDeProdutos = [];
    if (this.abrirCancelarCompra == true) {
      this.toggleCancelarCompra();
    }
    this.produto.codigoDeBarras = '';
    this.produto.preco = 0;
    this.produto.imagemP = 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';
    this.produto.quantidade = 0;
    this.produto.produto = '';
    this.total = 0;
    this.totalDesconto = 0;

    this.randomGif();

    this.snackbar.openSnackBarSucces("Compra cancelada!","Fechar");
  }
  mostrarOuEsconder() {
    if (this.listaDeProdutos.length > 0) {
      return 'mostrar';
    }
    return 'esconder';
  }
  mostrarOuEsconderGif() {
    return (this.listaDeProdutos.length <= 0 ? 'mostrar' : 'esconder');
  }

  randomGif() {
    const gifs = [
      'https://www.portaldodog.com.br/wp-content/uploads/2014/08/tumblr_n06l2mXy1T1scjbypo1_500.gif',
      'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3A5dXd5cDhocGE0emxsajk4ZHF1ZzdrNHFrNW5pMDZlMXk5em5qbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gKHGnB1ml0moQdjhEJ/giphy.gif',
      'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHpxZnIyNGQwbDZ6d29nZGp4bnZmeDh6Mm1tanF3YXA2MGhtbWRuayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Fu3OjBQiCs3s0ZuLY3/giphy.gif',
      'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTN2amtwY21uY3A2ZWxydWUxb21xbXlkaTdnNzEzMm5pdzY3N2VwYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/k1Psl92gw7YPSPYFKm/giphy.gif',
      'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzluNGtqams1M3lxNGJzNG90aDhoZXdlZTR2Y3o5YW16c2EzMm11MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1QX8qA4I8k6MLe6QFj/giphy.gif',
      'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnBpNDduOWR3NWF6NGs2YTI5YWVmZHp3aWl4amZ6MGh3N3B0cGNjaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Z5xk7fGO5FjjTElnpT/giphy.gif',
      'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3hpNDExM3l6cWt3bm8yYzdvczByaHVuYmNmejNuaGIweDA2cHoxeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7C0wCAyx9qoKPIeToi/giphy.gif'
    ];
    const random = Math.floor(Math.random() * gifs.length);
    this.src = gifs[random];
  }
  handleImageError(event: any) {
    event.target.src = 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';
  }
  toggleSpinner(spinnerEmitter: string) {
    if (spinnerEmitter == 'true') {
      this.loadingSpinner = true;
      return;
    }
    this.loadingSpinner = false;
  }
  //Fim Novo

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



  listaDeProdutosAntigoApagar: VendaComQtd[] = [];

  produtoPesagem: VendaComQtd = {
    id: 0,
    codigoDeBarras: '',
    produto: '',
    preco: 0,
    imagemP: '',
    peso: '',
    quantidade: 1
  }




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
          desconto: produto.desconto,
          idCliente: 0,
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
          desconto: produto.desconto,
          idCliente: 0
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
    if (this.listaDeProdutosAntigoApagar[index].quantidade > 1) {
      this.listaDeProdutosAntigoApagar[index].quantidade -= 1;
    } else {
      this.listaDeProdutosAntigoApagar.splice(index,1);
    }
    //this.calcularTotal();
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

  // ApertandoEnter(){
  //   console.log("Codigo de barras: " + this.input);
  //   let data = new Date().toLocaleString('pt-BR');
  //   console.log("Hora: " + data);

  //   this.service.pesquisarPorCodigoDeBarras(this.input).subscribe((produto) => {

  //     //parte da parte para cadastrar
  //     if (this.modoCadastrar){
  //       if (produto == null) {
  //         this.router.navigate(['/cadastrarProduto']);
  //         return;
  //       } else {
  //         this.service.aumentarEstoque(this.input).subscribe((produto) => {
  //           this.input = '';
  //           this.divAviso = true;
  //           const tempoDesejado = 1000;
  //           setTimeout(() => {
  //             this.divAviso = false;
  //           }, tempoDesejado);

  //         });
  //       }
  //       return;
  //     }

  //     if (produto == null) {
  //       alert("Produto não encontrado!!!!");
  //       this.input = '';
  //       return;
  //     }
  //     //aparecer o modal de pesagem
  //     if (this.input.length <= 3) {
  //       this.pesagem = true;
  //       this.input = '';
  //       //preenchendo o objeto da pesagem
  //       this.produtoPesagem.id = produto.id;
  //       this.produtoPesagem.produto = produto.produto;
  //       this.produtoPesagem.codigoDeBarras = produto.codigoDeBarras;
  //       this.produtoPesagem.imagemP = produto.imagemP;
  //       this.produtoPesagem.preco = produto.preco;
  //       this.produtoPesagem.quantidade = 1;
  //       return;
  //     }
  //     this.produto = produto;
  //     this.input = '';
  //     console.log("Produto: " + this.produto.produto);

  //     let itemJaNaLista = false;
  //     let itemIndex = -1;
  //     for (let index = 0; index < this.listaDeProdutosAntigoApagar.length; index++) {
  //       if (this.produto.codigoDeBarras == this.listaDeProdutosAntigoApagar[index].codigoDeBarras) { //se ja tiver o item na lista de itens, só aumentar a qtd, se não criar um novo objeto para a lista
  //         itemJaNaLista = true;
  //         itemIndex = index;
  //       }
  //     }
  //     if (itemJaNaLista) {
  //       this.listaDeProdutosAntigoApagar[itemIndex].quantidade++;
  //     } else {
  //       let produtoComQtd: VendaComQtd = {
  //         id: this.produto.id,
  //         codigoDeBarras: this.produto.codigoDeBarras,
  //         produto: this.produto.produto,
  //         preco: this.produto.preco,
  //         imagemP: this.produto.imagemP,
  //         peso: '',
  //         quantidade: 1
  //       }
  //       this.listaDeProdutosAntigoApagar.push(produtoComQtd);
  //     }
  //     //só pra pegar o total
  //     //this.calcularTotal();
  //   });


  // }

  fecharModalPesagem() {
    this.pesagem = false;
    this.inputPeso = '';
  }

  vendaFormaDePagamento() {
    if (this.listaDeProdutosAntigoApagar.length < 1){
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
    this.listaDeProdutosAntigoApagar.push(produtoPesado);

    //Aparecer a imagem
    this.produto.imagemP = this.produtoPesagem.imagemP;
    //limpando o objeto
    this.produtoPesagem.id = 0;
    this.produtoPesagem.codigoDeBarras = '';
    this.produtoPesagem.produto = '';
    this.produtoPesagem.imagemP = '';
    this.produtoPesagem.quantidade = 0;
    this.produtoPesagem.preco = 0;

    //this.calcularTotal();

    this.fecharModalPesagem();
  }



  ehFiado(){
    if (this.formulario.get('formaPagamento')?.value == 'Fiado'){
      return true;
    }
    return false;
  }

}
