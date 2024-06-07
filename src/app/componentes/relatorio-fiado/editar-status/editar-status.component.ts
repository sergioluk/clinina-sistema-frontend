import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Fiado, RelatorioFiado } from '../../cadastro-produto/cadastro-produto';
import { CardHomeService } from '../../card-home.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-editar-status',
  templateUrl: './editar-status.component.html',
  styleUrls: ['./editar-status.component.css']
})
export class EditarStatusComponent implements OnInit {
 
  @Input() fiado!: RelatorioFiado;
  @Input() index!: number;
  @Output() visivel = new EventEmitter();
  @Output() atualizarLista = new EventEmitter<{index: number, fiado: Fiado}>();
  @Output() spinnerEmitter = new EventEmitter<boolean>();
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: CardHomeService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      pagamento: [],
      status: [0]
    })
    if (this.fiado != null) {
      this.formulario.get("status")?.setValue(this.fiado.pagou);
      this.formulario.get("pagamento")?.setValue(this.fiado.pagamento);
    }
    this.formulario.get('pagamento')?.valueChanges.subscribe(pagamento => {
      if (pagamento >= this.fiado.valorTotal) {
        this.formulario.get("status")?.setValue(1);
      }
    });
  }

  toggleJanela() {
    this.visivel.emit();
  }
  cancelar() {
    this.visivel.emit();
  }
  aplicar() {
    let fiado: Fiado = {
      id: this.fiado.id,
      pagou: this.formulario.get('status')?.value,
      modified_at: new Date(),
      pagamento: this.formulario.get('pagamento')?.value ? this.formulario.get('pagamento')?.value : 0
    }
    this.spinnerEmitter.emit(true);
    this.service.editarFiado(fiado).subscribe({
      error: (error: HttpErrorResponse) => {
        console.error("Erro: ", error.message); // Mensagem de erro
        console.error("Código de status HTTP: ", error.status); // Código de status HTTP do erro
        this.spinnerEmitter.emit(false);
        this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
        this.toggleJanela();
      },
      complete: () => {
        this.spinnerEmitter.emit(false);
        this.snackbar.openSnackBarSucces("Alterado com sucesso!","Fechar");
        this.atualizarLista.emit({index: this.index, fiado: fiado});
        this.toggleJanela();
      }
    });
  }
  
}
