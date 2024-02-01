import { Component, ElementRef, ViewChild } from '@angular/core';
import { CadastroProduto, Venda, VendaComQtd, Vender } from '../cadastro-produto/cadastro-produto';
import { CardHomeService } from '../card-home.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent {

  //só pra pegar o id do input pra fazer o autofocus quando apertar em cadastrar
  @ViewChild('idDoInput') inputCodigoBarras!: ElementRef;
  input: string = '';
  total: number = 0;
  modoCadastrar : boolean = false;
  divAviso : boolean = false;
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

  constructor(private service: CardHomeService,
    private router: Router){}

  venda(){

    let listaDeVenda: Vender[] = [];
    for (let produto of this.listaDeProdutos) {

      let produtosVender: Vender = {
        produto_id: produto.id,
        quantidade: produto.quantidade,
        precoUnitario: produto.preco,
        precoTotal: produto.preco * produto.quantidade,
        data: new Date()
      }
      listaDeVenda.push(produtosVender);
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
          quantidade: 1
        }
        this.listaDeProdutos.push(produtoComQtd);
      }
      //só pra pegar o total
      this.calcularTotal();
    });


  }

  calcularTotal(){
    let listaTotal = 0;
      for (let index = 0; index < this.listaDeProdutos.length; index++) {
        listaTotal += (this.listaDeProdutos[index].preco * this.listaDeProdutos[index].quantidade);
      }
      this.total = listaTotal;
  }

}
