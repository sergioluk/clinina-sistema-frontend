import { Component, OnInit, Optional, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { TutorService } from '../../services/tutor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutor } from 'src/app/core/models/tutor.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { listaDeEstados } from 'src/app/shared/constants';
import { CepService } from 'src/app/shared/services/cep.service';
import { er } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-tutor-create',
  templateUrl: './tutor-create.component.html',
  styleUrls: ['./tutor-create.component.css']
})
export class TutorCreateComponent implements OnInit {

  isEditMode = false;
  form!: FormGroup;
  readonly panelOpenState = signal(false);

  listaUF: string[] = listaDeEstados;
  listaUFFiltradas: string[] = [];

  constructor(
    private fb: FormBuilder,
    private tutorService: TutorService,
    private router: Router,
    private route: ActivatedRoute,
    @Optional() public activeModal: NgbActiveModal,
    private cepService: CepService
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: [''],
      celular: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      endereco: this.fb.group({
        cep: ['', [Validators.required, this.cepValidator.bind(this)]],
        rua: ['', Validators.required],
        numero: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        uf: ['', [Validators.required, this.UFValidaValidator.bind(this)]],
        complemento: [''],
      }),
    });

    //Parte de preencher o cep pela viaCEP api
    this.form.get('endereco.cep')?.valueChanges.subscribe((cep: string) => {
      if (!cep) return;

      const cepLimpo = cep.replace(/\D/g, '');

      if (cepLimpo.length !== 8) return;

      this.cepService.buscar(cepLimpo).subscribe({
        next: (dados) => {
          const cepControl = this.form.get('endereco.cep');
          if (dados.erro) {

            cepControl?.setErrors({ cepNaoEncontrado: true });
            // Limpa os outros campos
            this.form.patchValue({
              endereco: {
                rua: '',
                bairro: '',
                cidade: '',
                uf: '',
                complemento: ''
              }
            });

            return;
          }

          //remove o erro se existir
          if (cepControl?.hasError('cepNaoEncontrado')) {
            cepControl.setErrors(null);
            cepControl.updateValueAndValidity();
          }
          // Preenche os dados
          this.form.patchValue({
            endereco: {
              rua: dados.logradouro,
              bairro: dados.bairro,
              cidade: dados.localidade,
              uf: dados.uf,
              complemento: dados.complemento
            }
          });
        },
        error: () => {
          this.form.get('endereco.cep')?.setErrors({ cepNaoEncontrado: true });
        }
      });
    });


    // Inicializa com todas as raças
    this.listaUFFiltradas = this.listaUF.slice();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.tutorService.buscarPorId(+id).subscribe(tutor => {
        this.form.patchValue(tutor.pessoa); // `pessoa` tem os campos esperados no form
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // força exibição de erros
      return;
    }

    const id = this.route.snapshot.paramMap.get("id");
    this.isEditMode = true;
    const tutor: Tutor = {
      pessoa: this.form.value
    }

    if (id) {
      this.tutorService.atualizar(+id, tutor).subscribe({
        next: () => {
          alert("Tutor atualizado com sucesso!");
          //this.router.navigate(["/tutores"]);
          this.activeModal.close({ salvo: true, id: +id });
        },
        error: (err) => {
          console.error("Erro ao atualizar tutor:", err);
          alert("Erro ao atualizar tutor. Verifique os dados e tente novamente.");
        }
      });
    } else {
      this.tutorService.criar(tutor).subscribe({
        next: (novoTutor) => {
          alert("Tutor cadastrado com sucesso!");
          //this.router.navigate(["/tutores"]);
          this.activeModal.close({ salvo: true, id: novoTutor.id })
        },
        error: (err) => {
          console.error("Erro ao cadastrar tutor:", err);
          alert("Erro ao cadastrar tutor. Verifique os dados e tente novamente.");
        }
      });
    }
  }

  limparCampo(campo: string): void {
    this.form.get(campo)?.setValue('');
  }

  filtrarUF(): void {
    const input = this.form.get('endereco.uf')?.value?.toLowerCase() || '';
    this.listaUFFiltradas = this.listaUF.filter(uf =>
      uf.toLowerCase().includes(input)
    );
  }
  UFValidaValidator(control: FormControl) {
    const valor = control.value;
    if (!valor) return null; // Campo vazio pode ser válido, se desejar

    const valido = this.listaUF.includes(valor);
    return valido ? null : { ufInvalida: true };
  }
  cepValidator(control: AbstractControl): ValidationErrors | null {
    const cep = control.value?.replace(/\D/g, '');
    if (!cep) return null;

    const valido = /^[0-9]{8}$/.test(cep);
    return valido ? null : { cepInvalido: true };
  }

}
