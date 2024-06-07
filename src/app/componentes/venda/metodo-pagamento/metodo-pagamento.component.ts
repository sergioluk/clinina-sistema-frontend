import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProdutoVenda } from 'src/app/interfaces/produtoVenda';
import { Vender } from '../../cadastro-produto/cadastro-produto';
import { CardHomeService } from '../../card-home.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-metodo-pagamento',
  templateUrl: './metodo-pagamento.component.html',
  styleUrls: ['./metodo-pagamento.component.css']
})
export class MetodoPagamentoComponent implements OnInit{

  @Output() visivel = new EventEmitter();
  @Output() aplicarLimpar = new EventEmitter();
  @Output() spinnerEmitter = new EventEmitter<string>();
  @Input() listaDeProdutos: ProdutoVenda[] = [];
  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder,
     private service: CardHomeService,
     private snackbar: SnackbarService
    ){}
  
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      formaPagamento: 'Crédito',
      nome: '',
      telefone: '',
      endereco: ''
    })
  }

  fiadoClasse(){
    if (this.formulario.get('formaPagamento')?.value == 'Fiado'){
      return 'fiado-aberto';
    }
    return '';
  }
  ehFiado(){
    if (this.formulario.get('formaPagamento')?.value == 'Fiado'){
      return true;
    }
    return false;
  }
  toggleJanela(){
    this.setVisivel();
  }
  setVisivel() {
    this.visivel.emit();
  }
  cancelar() {
    this.setVisivel();
  }
  vender() {
    let listaDeVenda: Vender[] = [];
    for (let produto of this.listaDeProdutos) {
        let produtosVender: Vender = {
          produto_id: produto.id,
          quantidade: produto.quantidade,
          precoUnitario: produto.preco,
          precoTotal: produto.preco * produto.quantidade,
          peso: produto.peso,
          data: new Date(),
          pagamento: this.formulario.get('formaPagamento')?.value,
          desconto: produto.desconto,
          nome: this.formulario.get('nome')?.value,
          telefone: this.formulario.get('telefone')?.value,
          endereco: this.formulario.get('endereco')?.value
        }
        listaDeVenda.push(produtosVender);
      }

    if (listaDeVenda.length <= 0) {
      alert("Não há produtos na lista!!");
      this.toggleJanela();
      return;
    }
    this.spinnerEmitter.emit("true");
    if (this.formulario.get('formaPagamento')?.value == "Fiado") {
      this.cadastrarFiado(listaDeVenda);
      console.log("fiado")
    } else {
      console.log("venda")
      this.cadastrarVenda(listaDeVenda);
    }
  }

  cadastrarVenda(listaDeVenda: Vender[]) {
    this.service.vender(listaDeVenda).subscribe({
      //this.router.navigate(['/home']);
      //window.location.reload();
      next: (response: HttpResponse<Vender[]>) => {
        this.aplicarLimpar.emit();
        this.toggleJanela();
        console.log("resposta: " + response.body);
      },
      error: (error: HttpErrorResponse) => {
        this.snackbar.openSnackBarFail("Algo deu errado!: " + error.status, "Fechar");
        this.spinnerEmitter.emit("false");
      },
      complete: () => {
        console.log("Requisição completa!!!");
        this.spinnerEmitter.emit("false");
        this.snackbar.openSnackBarSucces("Venda concluída com sucesso!","Fechar");
      }

    });
  }
  cadastrarFiado(listaDeVenda: Vender[]) {
    this.service.cadastrarFiado(listaDeVenda).subscribe({
      next: (response: HttpResponse<Vender[]>) => {
        this.aplicarLimpar.emit();
        this.toggleJanela();
      },
      error: (error: HttpErrorResponse) => {
        this.snackbar.openSnackBarFail("Algo deu errado!: " + error.status, "Fechar");
        this.spinnerEmitter.emit("false");
      },
      complete: () => {
        console.log("Requisição completa!!!");
        this.spinnerEmitter.emit("false");
        this.snackbar.openSnackBarSucces("Fiado cadastrado com sucesso!","Fechar");
      }
    });
  }

}
