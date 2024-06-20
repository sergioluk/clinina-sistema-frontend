import { Component, OnInit } from '@angular/core';
import { IconeService } from 'src/app/services/icone.service';
import { CardHomeService } from '../card-home.service';
import { Mensagem } from '../cadastro-produto/cadastro-produto';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css']
})
export class MensagensComponent implements OnInit {

  loadingSpinner = false;
  listaDeMensagens: Mensagem[] = [];
  formulario!: FormGroup;

  constructor(
    private icone: IconeService, 
    private service: CardHomeService,
    private snackbar: SnackbarService,
    private formBuilder: FormBuilder
  ) {}
  
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      mensagem: ['', Validators.compose([
        Validators.required
      ])],
      autor: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
      ])]
    });
    this.listarMensagens();
  }

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  handleMarcarComoLidoOuNaoLido(index: number) {
    this.loadingSpinner = false;
    let mensagem = this.listaDeMensagens[index];
    mensagem.leitura == 0 ? mensagem.leitura = 1 : mensagem.leitura = 0;
    this.service.editarMensagemVisto(mensagem).subscribe({
      error: (error: HttpErrorResponse) => {
        console.error("Erro: ", error.message); // Mensagem de erro
        console.error("Código de status HTTP: ", error.status); // Código de status HTTP do erro
        this.loadingSpinner = false;
        this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
      },
      complete: () => {
        this.loadingSpinner = false;
        this.snackbar.openSnackBarSucces("Ação confirmada!","Fechar");
        this.listaDeMensagens.splice(index,1,mensagem);
      }
    });
  }

  handleApagar(index: number) {
    this.loadingSpinner = false;
    let mensagem = this.listaDeMensagens[index];
    mensagem.excluir = 1;
    this.service.apagarMensagem(mensagem).subscribe({
      error: (error: HttpErrorResponse) => {
        console.error("Erro: ", error.message); // Mensagem de erro
        console.error("Código de status HTTP: ", error.status); // Código de status HTTP do erro
        this.loadingSpinner = false;
        this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
      },
      complete: () => {
        this.loadingSpinner = false;
        this.snackbar.openSnackBarSucces("Mensagem apagada!","Fechar");
      }
    });
  }

  listarMensagens() {
    this.loadingSpinner = true;
    this.service.listarMensagens().subscribe({
      next: (response: HttpResponse<Mensagem[]>) => {
        this.listaDeMensagens = response.body ? response.body : [];
      },
      error: (error: HttpErrorResponse) => {
        console.error("Erro: ", error.message); // Mensagem de erro
        console.error("Código de status HTTP: ", error.status); // Código de status HTTP do erro
        this.loadingSpinner = false;
        this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
      },
      complete: () => {
        this.loadingSpinner = false;
        this.snackbar.openSnackBarSucces("Lista de mensagens carregada!","Fechar");
      }
    });
  }

  enviarMensagem() {

    if (!this.formulario.valid) {
      this.snackbar.openSnackBarFail("Não enviado, preencha todos os campos!", "Fechar");
      return;
    }

    let msg: Mensagem = {
      autor: this.formulario.get("autor")?.value,
      mensagem: this.formulario.get("mensagem")?.value,
      created_at: new Date,
      excluir: 0,
      leitura: 0
    }

    this.loadingSpinner = true;
    this.service.salvarMensagem(msg).subscribe({
      error: (error: HttpErrorResponse) => {
        console.error("Erro: ", error.message); // Mensagem de erro
        console.error("Código de status HTTP: ", error.status); // Código de status HTTP do erro
        this.loadingSpinner = false;
        this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
      },
      complete: () => {
        this.loadingSpinner = false;
        this.snackbar.openSnackBarSucces("Mensagem enviada!","Fechar");
        this.listarMensagens();
      }
    });
  }
}
