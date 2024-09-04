import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CardHomeService } from '../../card-home.service';
import { CategoriasLancamentos, DespesaLancamento, ReceitaLancamento } from 'src/app/interfaces/produtoVenda';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-adicionar-lancamento',
  templateUrl: './adicionar-lancamento.component.html',
  styleUrls: ['./adicionar-lancamento.component.css']
})
export class AdicionarLancamentoComponent implements OnInit {

  @Output() visivel = new EventEmitter();

  isRecebida = false;
  isParcelado = false;
  menor = false;
  qtdParcelas = 2;
  formulario!: FormGroup;
  listaDeReceita: ReceitaLancamento[] = [];
  listaDeDespesa: DespesaLancamento[] = [];

  @Input() tipoLancamento = '';

  constructor(
    private formBuilder: FormBuilder,
    private service: CardHomeService
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      descricao: [''],
      categoria: [''],
      subcategoria: [''],
      dataReceita: [''],
      dataRecebimento: [''],
      valor: [''],
      parcelas: ['']
    });
    this.getCategorias();
  }

  getCategorias() {
    //this.loadingSpinner = true;
    this.service.pegarCategorias().subscribe({
      next: (response: HttpResponse<CategoriasLancamentos>) => {
        if (response.body) {
          this.listaDeReceita = response.body.receitas;
          this.listaDeDespesa = response.body.despesas;
        }
        // this.loadingSpinner = false;
        //this.snackbar.openSnackBarSucces("Vendas encontradas!","Fechar");
      },
      error: (error: HttpErrorResponse) => {
        console.error("Erro: ", error.message);
        console.error("Código de status HTTP: ", error.status);
        //this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
        //this.loadingSpinner = false;
      },
      complete: () => {
        console.log("Requisição completa!!!");
      }
    });
  }

  selecionarLancamento(tipo: string) {
    this.tipoLancamento = tipo;
  }

  toggleJanela() {
    this.visivel.emit();
  }

  teste(){
    console.log(this.formulario.get('categoria')?.value);
    console.log(this.formulario.get('subcategoria')?.value);
  }
  diminuir() {
    if (!this.isParcelado) {
      return;
    }
    this.qtdParcelas--;
    if (this.qtdParcelas <= 2) {
      this.qtdParcelas = 2;
      this.menor = true;
    } else {
      this.menor = false;
    }
  }
  aumentar() {
    if (!this.isParcelado) {
      return;
    }
    this.qtdParcelas++;
    this.menor = false;
  }
  mudancaData() {
    if (this.formulario.get('dataRecebimento')?.value) {
      this.isRecebida = true;
    } else {
      this.isRecebida = false;
    }
  }
  limparData() {
    if (!this.isRecebida) {
      this.formulario.get('dataRecebimento')?.setValue('');
    }
  }

}
