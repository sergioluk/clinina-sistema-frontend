import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IconeService } from 'src/app/services/icone.service';
import { CardHomeService } from '../card-home.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ListaLancamento, PaginaLancamentos } from 'src/app/interfaces/produtoVenda';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

  janelaAddLancamento: boolean = false;
  lancamentoSelecionado = '';

  listaPeriodoVisualizacao = ["Mês passado", "Este mês", "Próximo mês"];

  //listaLancamentos: ListaLancamento[] = [];

  paginaLancamentos: PaginaLancamentos = {
    aReceber: 0,
    aPagar: 0,
    projecaoSaldo: 0,
    saldoAnterior: 0,
    saldoAtual: 0,
    listaLancamentos: []
  } 

  formulario!: FormGroup;

  constructor(
    private icone: IconeService,
    private formBuilder: FormBuilder,
    private service: CardHomeService
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      periodo: ['Este mês'],
      dataInicio: [this.getDataInicio()],
      dataFim: [this.getDataFim()],
    });

    this.getLancamentos();
  }

  adicionarLancamento(tipoLancamento: string) {
    this.lancamentoSelecionado = tipoLancamento;
    this.toggleAddLancamento();
  }

  toggleAddLancamento() {
    this.janelaAddLancamento = !this.janelaAddLancamento;
  }

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  getLancamentos() {
    let data = {
      dataInicio: this.formulario.get('dataInicio')?.value,
      dataFim: this.formulario.get('dataFim')?.value
    };
    this.service.getListaLancamentos(data).subscribe({
      next: (response: HttpResponse<PaginaLancamentos>) => {
        if (response.body) {
          this.paginaLancamentos = response.body
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

  iconeStatus( status: string ) {
    if (status == "receita") {
      return this.getIcone("fa-arrow-right");
    }
    return this.getIcone("fa-arrow-left");
  }

  statusCores(status: string) {
    let classe = '';
    if (status == 'receita' || status == 'Pago') {
      classe = 'verde';
    } else if (status == 'despesa' || status == 'Vencido') {
      classe = 'vermelho';
    } else if (status == 'A vencer') {
      classe = 'azul';
    } else if (status == 'Vence hoje') {
      classe = 'amarelo';
    }

    return classe;
  }

  cor(status: string) {
    let cor = '';
    if (status == 'Pago') {
      cor = 'var(--corVerde)';
    } else if (status == 'Vencido') {
      cor = 'var(--corVermelho)';
    } else if (status == 'A vencer') {
      cor = 'var(--corAzul)';
    } else if (status == 'Vence hoje') {
      cor = 'var(--corAmarelo)';
    }
    return cor;
  }

  pesquisarPorData() {
    console.log("Inicio: " + this.formulario.get('dataInicio')?.value)
    console.log("Fim: " + this.formulario.get('dataFim')?.value)
  }

  // Define a data de início padrão
  getDataInicio(): string {
    const dataAtual = new Date();
    dataAtual.setDate(1); // Define o primeiro dia do mês atual
    return dataAtual.toISOString().substring(0, 10); // Formato 'yyyy-MM-dd'
  }

  // Define a data de fim padrão
  getDataFim(): string {
    const dataAtual = new Date();
    const ultimoDia = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0); // Último dia do mês atual
    return ultimoDia.toISOString().substring(0, 10); // Formato 'yyyy-MM-dd'
  }
  
}
