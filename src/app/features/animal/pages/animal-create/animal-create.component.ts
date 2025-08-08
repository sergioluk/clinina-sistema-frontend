import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimalService } from '../../services/animal.service';
import { TutorService } from 'src/app/features/tutor/services/tutor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/core/models/animal.model';
import { Tutor } from 'src/app/core/models/tutor.model';
import { IconeService } from 'src/app/services/icone.service';
import { racasDeCachorro, racasDeGato } from 'src/app/shared/constants';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-animal-create',
  templateUrl: './animal-create.component.html',
  styleUrls: ['./animal-create.component.css']
})
export class AnimalCreateComponent implements OnInit {

  form!: FormGroup;
  isEditMode = false;
  @Input() tutorId!: number;

  tutor!: Tutor;
  listaDeRacas: string[] = racasDeCachorro;
  listaDePelagem: string[] = ['Pelagem Curta', 'Pelagem Média', 'Pelagem Longa e Lisa','Pelagem Longa e Encaracolada'];

  racasFiltradas: string[] = [];

  constructor(
    private fb: FormBuilder,
    private animalService: AnimalService,
    private tutorService: TutorService,
    private route: ActivatedRoute,
    private router: Router,
    private icone: IconeService,
    @Optional() public activeModal: NgbActiveModal,
  ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      especie: ['', Validators.required],
      sexo: ['', Validators.required],
      raca: ['', [this.racaValidaValidator.bind(this)]],
      cor: [''],
      pelagem: [''],
      dataNascimento: [''],
      tamanho: ['', Validators.required],
      castrado: [false],
      observacoes: [''],
      foto: [''],
      tutorId: [null, Validators.required]
    });

    // Inicializa com todas as raças
    this.racasFiltradas = this.listaDeRacas.slice();

    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEditMode = true;
      this.animalService.buscarPorId(+id).subscribe(animal => {
        this.form.patchValue(animal);
      });
    } else if (this.tutorId) {
      this.form.patchValue({ tutorId: this.tutorId });

      this.tutorService.buscarPorId(this.tutorId).subscribe({
        next: (tutor) => {
          this.tutor = tutor;
        },
        error: (err) => {
          console.log("Erro ao buscar tutor", err);
        }
      });
    }

    this.form.get('especie')?.valueChanges.subscribe((especie) => {
      if (especie === 'GATO') {
        this.listaDeRacas = racasDeGato;
      } else {
        this.listaDeRacas = racasDeCachorro; // Para CÃO ou OUTRO
      }
      this.form.get('raca')?.setValue('');
      // Sempre que mudar a espécie, refiltra com base no que já foi digitado
      this.filtrarRacas();
    });

  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // força exibição de erros
      return;
    }

    const animal: Animal = this.form.value;

    if (this.isEditMode) {
      const id = +this.route.snapshot.paramMap.get("id")!;
      this.animalService.atualizar(id, animal).subscribe(() => {
        alert("Animal atualizado com sucesso!");
        //this.router.navigate(["/animais"]);
        this.activeModal?.close({ salvo: true, id }); // Fecha modal após edição
      });
    } else {
      this.animalService.criar(animal).subscribe((novoAnimal) => {
        alert("Animal criado com sucesso!");
        //this.router.navigate(["/animais"]);
        this.activeModal?.close({ salvo: true, id: novoAnimal.id }); // Fecha modal e retorna ID
      })
    }
  }

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  limparCampo(campo: string): void {
    this.form.get(campo)?.setValue('');
  }

  filtrarRacas(): void {
    const input = this.form.get('raca')?.value?.toLowerCase() || '';
    this.racasFiltradas = this.listaDeRacas.filter(r =>
      r.toLowerCase().includes(input)
    );
  }
  racaValidaValidator(control: FormControl) {
    const valor = control.value;
    if (!valor) return null; // Campo vazio pode ser válido, se desejar

    const valido = this.listaDeRacas.includes(valor);
    return valido ? null : { racaInvalida: true };
  }
}
