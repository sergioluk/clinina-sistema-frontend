import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IconeService } from 'src/app/services/icone.service';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

  janelaAddLancamento: boolean = false;

  listaPeriodoVisualizacao = ["Mês passado", "Este mês", "Próximo mês"];

  formulario!: FormGroup;

  constructor(
    private icone: IconeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      periodo: ['Este mês'],
      dataInicio: [''],
      dataFim: [''],
    });
  }

  toggleAddLancamento() {
    this.janelaAddLancamento = !this.janelaAddLancamento;
  }

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }
}
