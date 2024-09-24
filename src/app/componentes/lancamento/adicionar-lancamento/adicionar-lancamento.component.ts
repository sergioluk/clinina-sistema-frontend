import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardHomeService } from '../../card-home.service';
import { CadastrarLancamento, CategoriasLancamentos, DespesaLancamento, ReceitaLancamento } from 'src/app/interfaces/produtoVenda';
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
      tipoReceita: [this.tipoLancamento],
      categoriaId: ['', Validators.compose([
        Validators.required,
        // Validators.minLength(3),
        //Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      subcategoria: [''],
      dataDaReceitaVencimento: [''],
      dataRecebimentoPagamento: [''],
      valor: [''],
      quantidadeParcelas: ['']
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

    if (tipo == 'receita') {
      this.formulario.get('categoriaId')?.setValue(this.listaDeReceita[0]);
    }
    if (tipo == 'despesa') {
      this.formulario.get('categoriaId')?.setValue(this.listaDeDespesa[0]);
    }
  }

  toggleJanela() {
    this.visivel.emit();
  }

  teste(){
    console.log('categoria: ' + this.formulario.get('categoriaId')?.value);
    console.log('subcategoria: ' + this.formulario.get('subcategoria')?.value.id);
  }
  cadastrarLancamento() {
    if (!this.formulario.valid) {
      console.log("nao está valido")
      return;
    }
    const id = this.formulario.get('categoriaId')?.value.id;
    this.formulario.get('categoriaId')?.setValue(id);
    this.formulario.get('tipoReceita')?.setValue(this.tipoLancamento);
    if (this.isParcelado) {
      this.formulario.get('quantidadeParcelas')?.setValue(this.qtdParcelas);
    } else {
      this.formulario.get('quantidadeParcelas')?.setValue(1);
    }

    const dataDaReceitaVencimentoString: string = this.formulario.get('dataDaReceitaVencimento')?.value;
    const dataRecebimentoPagamentoString: string = this.formulario.get('dataRecebimentoPagamento')?.value;

    // Converta as strings de data para objetos Date
    const dataDaReceitaVencimento: Date = new Date(dataDaReceitaVencimentoString);
    const dataRecebimentoPagamento: Date = new Date(dataRecebimentoPagamentoString);

    // Verifique se as datas são válidas antes de chamar toISOString
    if (!isNaN(dataDaReceitaVencimento.getTime())) {
      this.formulario.get('dataDaReceitaVencimento')?.setValue(dataDaReceitaVencimento.toISOString());
    }

    if (!isNaN(dataRecebimentoPagamento.getTime())) {
      this.formulario.get('dataRecebimentoPagamento')?.setValue(dataRecebimentoPagamento.toISOString());
    }
    
    console.log('formularo', this.formulario.value);
    this.service.cadastrarLancamento(this.formulario.value).subscribe({
      next: (response: HttpResponse<CadastrarLancamento[]>) => {
        if (response.body) {
          console.log(response.body)
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
        this.toggleJanela();
      }
    });

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
    if (this.formulario.get('dataRecebimentoPagamento')?.value) {
      this.isRecebida = true;
    } else {
      this.isRecebida = false;
    }
  }
  limparData() {
    if (!this.isRecebida) {
      this.formulario.get('dataRecebimentoPagamento')?.setValue('');
    }
  }

}
