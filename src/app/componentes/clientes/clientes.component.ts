import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IconeService } from 'src/app/services/icone.service';
import { CardHomeService } from '../card-home.service';
import { Cliente } from 'src/app/interfaces/produtoVenda';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/services/snackbar.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {


  formulario!: FormGroup;
  loadingSpinner = false;


  clientes: Cliente[] = [];

  constructor(
    private icone:IconeService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private service: CardHomeService,
    private snackbar: SnackbarService
  ){}

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      nome: [''],
      telefone: ['']
    });

    this.loadingSpinner = true;
    this.service.listarClientes().subscribe({
      next: (response: HttpResponse<Cliente[]>) => {
        this.clientes = response.body ? response.body : [];
      },
      error: (error: HttpErrorResponse) => {
        console.error("Erro: ", error.message); // Mensagem de erro
        console.error("Código de status HTTP: ", error.status); // Código de status HTTP do erro
        this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
        this.loadingSpinner = false;
      },
      complete: () => {
        this.snackbar.openSnackBarSucces("Lista de fiado carregada!","Fechar");
        this.loadingSpinner = false;
      }
    });
    
  }

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  cancelar() {
    this.router.navigate(['/venda']);
  }

  cadastrarCliente() {
    if (!this.formulario.valid) {
      console.log("nao está valido")
      return;
    }

    this.loadingSpinner = true;
    this.service.cadastrarCliente(this.formulario.value).subscribe({
      next: (response: HttpResponse<Cliente>) => {
        if (response.body) {
          console.log(response.body)
        }
        this.loadingSpinner = false;
        this.snackbar.openSnackBarSucces("Cadastro concluído!","Fechar");
      },
      error: (error: HttpErrorResponse) => {
        console.error("Erro: ", error.message);
        console.error("Código de status HTTP: ", error.status);
        this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
        this.loadingSpinner = false;
      },
      complete: () => {
        console.log("Requisição completa!!!");
      }
    });

  }


}
