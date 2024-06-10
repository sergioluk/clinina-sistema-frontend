import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProdutoVenda } from 'src/app/interfaces/produtoVenda';

@Component({
  selector: 'app-produto-peso',
  templateUrl: './produto-peso.component.html',
  styleUrls: ['./produto-peso.component.css']
})
export class ProdutoPesoComponent implements OnInit{
  
  @Input() produtoComPeso!: ProdutoVenda;
  @Output() visivel = new EventEmitter();
  @Output() adicionarProdutoComPeso = new EventEmitter<ProdutoVenda>();
  
  formulario!: FormGroup
  total = 0;

  constructor(private formBuilder: FormBuilder){}
  
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      peso: '',
      dinheiro: ''
    });
  }
  //Chamado ao atualizar o peso
  atualizarDinheiro() {
    this.calcularTotal();
    this.formulario.get('dinheiro')?.setValue(this.total);
  }
  //Chamado ao atualizar o dinheiro
  atualizarPeso() {
    let peso = this.formulario.get('dinheiro')?.value / this.produtoComPeso.preco;
    this.formulario.get('peso')?.setValue(peso.toFixed(3));
    this.total = this.formulario.get('dinheiro')?.value;
  }

  toggleJanela() {
    this.visivel.emit();
  }
  aplicar() {
    this.produtoComPeso.peso = this.formulario.get('peso')?.value + "kg";
    this.produtoComPeso.preco = this.formulario.get('dinheiro')?.value;
    this.adicionarProdutoComPeso.emit(this.produtoComPeso);
    this.toggleJanela();
  }
  cancelar() {
    this.toggleJanela();
  }
  calcularTotal() {
    let calc = this.produtoComPeso.preco * this.formulario.get('peso')?.value;
    this.total = Number(calc.toFixed(2));
  }

}
