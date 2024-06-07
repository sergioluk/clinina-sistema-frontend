import { Component, OnInit } from '@angular/core';
import { CardHomeService } from '../card-home.service';
import { Fiado, RelatorioFiado } from '../cadastro-produto/cadastro-produto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IconeService } from 'src/app/services/icone.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-relatorio-fiado',
  templateUrl: './relatorio-fiado.component.html',
  styleUrls: ['./relatorio-fiado.component.css']
})
export class RelatorioFiadoComponent implements OnInit {

  listaDeFiado: RelatorioFiado[] = [];
  janelaEditar: boolean = false;
  indexProp: number = -1;
  formulario!: FormGroup;
  loadingSpinner: boolean = false;
  linhaExpandida: number | null = null;
  fiado!: RelatorioFiado;
  index!: number;

  constructor(
    private service: CardHomeService,
    private formBuilder: FormBuilder,
    private icone: IconeService,
    private snackbar: SnackbarService
  ){}

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      situacao: [],
    })
    this.loadingSpinner = true;
    this.service.pegarListaDeFiado().subscribe({
      next: (response: HttpResponse<RelatorioFiado[]>) => {
        this.listaDeFiado = response.body ? response.body : [];
      },
      error: (error: HttpErrorResponse) => {
        console.error("Erro: ", error.message); // Mensagem de erro
        console.error("Código de status HTTP: ", error.status); // Código de status HTTP do erro
        this.loadingSpinner = false;
        this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
      },
      complete: () => {
        this.loadingSpinner = false;
        this.snackbar.openSnackBarSucces("Lista de fiado carregada!","Fechar");
      }
    });

  }
  /*meu*/
  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }
  editarItem(fiado: RelatorioFiado, index: number) {
    this.toggleEditarStatus();
    this.fiado = fiado;
    this.index = index;
  }
  toggleLinhaExpandida(index: number): void {
    this.linhaExpandida = this.linhaExpandida === index ? null : index;
  }
  getStatus(status: number): string {
    return status == 1 ? "pago" : "devendo";
  }
  toggleEditarStatus() {
    this.janelaEditar = !this.janelaEditar;
  }
  atualizarListaFiado(event: {index: number, fiado: Fiado}) {
    console.log("chegou aqui 1");
    this.listaDeFiado[event.index].pagou = event.fiado.pagou;
    this.listaDeFiado[event.index].modified_at = event.fiado.modified_at;
    this.listaDeFiado[event.index].pagamento = event.fiado.pagamento;
    console.log("chegou aqui 2");
  }
  toggleSpinner(bool: boolean) {
    this.loadingSpinner = bool;
  }
  /*fim meu */

  verificarSeFoiFracionado(peso: string) {
    if(peso == '' || peso == null){
      return false;
    }
    return true;
  }

  pagou(valor: number){
    if (valor == 1){
      return 'Pago';
    }
    return 'Devendo';
  }

}
