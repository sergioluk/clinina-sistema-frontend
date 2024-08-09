import { Component, OnInit } from '@angular/core';
import { IconeService } from 'src/app/services/icone.service';
import { Fiado, RelatorioFiado } from '../cadastro-produto/cadastro-produto';
import { CardHomeService } from '../card-home.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Endereco, Tutor } from 'src/app/interfaces/produtoVenda';
import { EnviarTutorService } from 'src/app/services/enviar-tutor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banho-e-tosa',
  templateUrl: './banho-e-tosa.component.html',
  styleUrls: ['./banho-e-tosa.component.css']
})
export class BanhoETosaComponent implements OnInit{

  listaDeFiado: RelatorioFiado[] = [];
  janelaEditar: boolean = false;
  indexProp: number = -1;
  loadingSpinner: boolean = false;
  linhaExpandida: number | null = null;
  fiado!: RelatorioFiado;
  index!: number;

  listaDeTutores: Tutor[] = [];
  


  constructor(
    private icone: IconeService,
    private service: CardHomeService,
    private snackbar: SnackbarService,
    private enviarTutor: EnviarTutorService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.loadingSpinner = true;
    this.service.pegarListaDeTutores().subscribe({
      next: (response: HttpResponse<Tutor[]>) => {
        this.listaDeTutores = response.body ? response.body : [];
      },
      error: (error: HttpErrorResponse) => {
        console.error("Erro: ", error.message); // Mensagem de erro
        console.error("Código de status HTTP: ", error.status); // Código de status HTTP do erro
        this.loadingSpinner = false;
        this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
      },
      complete: () => {
        this.loadingSpinner = false;
        this.snackbar.openSnackBarSucces("Lista de tutores carregada!","Fechar");
      }
    });
  }



  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  toggleLinhaExpandida(index: number): void {
    this.linhaExpandida = this.linhaExpandida === index ? null : index;
  }

  verificarSeFoiFracionado(peso: string) {
    if(peso == '' || peso == null){
      return false;
    }
    return true;
  }

  getStatus(status: number): string {
    return status == 1 ? "pago" : "devendo";
  }

  pagou(valor: number){
    if (valor == 1){
      return 'Pago';
    }
    return 'Devendo';
  }

  getEndereco(en: Endereco) {
    return en.rua + " " + en.numero + " " + en.complemento + ", " + en.bairro + " " + en.cidade + " " + en.uf;
  }

  getIdade(dataNascimento: Date) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade + " anos";
  }

  editarItem(index: number) {
    let tutor = this.listaDeTutores[index];
    this.enviarTutor.setTutor(tutor);
    this.router.navigate(['/cadastrar-tutor']);
  }

  cadastrarTutor() {
    this.router.navigate(['/cadastrar-tutor']);
  }
}
