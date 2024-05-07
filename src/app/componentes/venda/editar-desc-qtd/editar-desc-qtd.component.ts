import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProdutoVenda } from 'src/app/interfaces/produtoVenda';

@Component({
  selector: 'app-editar-desc-qtd',
  templateUrl: './editar-desc-qtd.component.html',
  styleUrls: ['./editar-desc-qtd.component.css']
})
export class EditarDescQtdComponent implements OnInit {
  
  @Input() listaDeProdutos: ProdutoVenda[] = [];
  @Input() index: number = 0;
  produto!: ProdutoVenda;
  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      quantidade: 0,
    });
  }

  teste(){
    console.log("hehe fui clicado: " + this.formulario.get('quantidade')?.value);
  }

  imagemDoProduto() {
    if (this.listaVazia()) {
      return "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg";
    }
    let produto = this.listaDeProdutos[this.index];
    return produto.imagemP;
  }

  nomeDoProduto(){
    if (this.listaVazia()) {
      return "Sem produtos na lista";
    }
    let produto = this.listaDeProdutos[this.index];
    return produto.produto;
  }
  precoDeCompraProduto() {
    if (this.listaVazia()) {
      return "0";
    }
    let produto = this.listaDeProdutos[this.index];
    return produto.precoCompra;
  }

  listaVazia(){
    if (this.listaDeProdutos.length <= 0) {
      return true;
    }
    return false;
  }

  calcularLucroPorCento() {
    if (this.listaVazia()) {
      return "0";
    }
    let produto = this.listaDeProdutos[this.index];
    if (produto.precoCompra == null) {
      return "-";
    }
    let lucro = (100 * produto.preco / produto.precoCompra) - 100;
    return lucro.toFixed(2);
  }

  calcularLucroReais() {
    if (this.listaVazia()) {
      return "0";
    }
    let produto = this.listaDeProdutos[this.index];
    if (produto.precoCompra == null) {
      return "-";
    }
    let lucro = produto.preco - produto.precoCompra;
    return lucro;
  }

}
