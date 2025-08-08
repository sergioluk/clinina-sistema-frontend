import { Component, ElementRef, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AgendamentoService } from '../../services/agendamento.service';
import { AnimalService } from 'src/app/features/animal/services/animal.service';
import { ServicoService } from 'src/app/features/servico/services/servico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Agendamento } from 'src/app/core/models/agendamento.modal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable, startWith } from 'rxjs';
import { Animal } from 'src/app/core/models/animal.model';
import { MatCheckboxChange } from '@angular/material/checkbox';



@Component({
  selector: 'app-agendamento-create',
  templateUrl: './agendamento-create.component.html',
  styleUrls: ['./agendamento-create.component.css']
})
export class AgendamentoCreateComponent implements OnInit {

  @Input() data: any;

  imgPadrao: string = "https://cdn-icons-png.flaticon.com/512/4823/4823463.png";
  img: string = this.imgPadrao;

  isEditMode = false;
  form!: FormGroup;
  servicos: any[] = [];

  animal: Animal = {
    nome: '',
    especie: '',
    sexo: '',
    tamanho: '',
    castrado: false,
    tutorId: 0,
    tutorNome: ''
  };

  constructor(
    private fb: FormBuilder,
    private agendamentoService: AgendamentoService,
    private animalService: AnimalService,
    private servicoService: ServicoService,
    private route: ActivatedRoute,
    private router: Router,
    @Optional() public activeModal: NgbActiveModal
  ){

  }

  ngOnInit(): void {

    this.form = this.fb.group({
      animalId: [null, Validators.required],
      data: ['', Validators.required],
      horaEntrada: [''],
      horaSaida: [''],
      tipo: ['AVULSO', Validators.required],
      status: ['PRE_AGENDADO', Validators.required],
      descricao: [''],
      observacoes: [''],
      servicosIds: [[]]
    });

    // Agora só aqui tratamos o restante, após animais carregados
    this.servicoService.listar().subscribe((data) => (this.servicos = data));

    const id = this.data?.id || this.route.snapshot.paramMap.get('id');
    //editar consulta
    if (id) {
      this.isEditMode = true;
      this.agendamentoService.buscarPorId(+id).subscribe((agendamento) => {
        const dataSplit = agendamento.data.split('-');
        const dataLocal = new Date(
          Number(dataSplit[0]),
          Number(dataSplit[1]) - 1,
          Number(dataSplit[2])
        );

        const agendamentoCorrigido = {
          ...agendamento,
          data: dataLocal,
          horaEntrada: agendamento.horaEntrada ? agendamento.horaEntrada.slice(0, 5) : '',
          horaSaida: agendamento.horaSaida ? agendamento.horaSaida.slice(0, 5) : '',
        };

        this.form.patchValue(agendamentoCorrigido);

        this.animalService.buscarPorId(agendamento.animalId).subscribe((animal) => {
          this.animal = animal
          this.img = animal.foto || this.imgPadrao;
        });
      });
    }
    //clicando no calendario
    if (this.data?.horaEntrada) {
      this.form.patchValue({
        data: new Date(this.data.data),
        horaEntrada: this.data.horaEntrada ? this.data.horaEntrada.slice(0, 5) : ''
      });
    }

    //clicando no botao de cadastrar consulta
    if (this.data?.animalId) {
      console.log("Ta caindo aqui?")
      this.animalService.buscarPorId(this.data.animalId).subscribe((animal) => {
          this.animal = animal
          this.img = animal.foto || this.imgPadrao;
        });
      this.form.patchValue({ animalId: this.data.animalId });
    }

  }


  onSubmit(): void {
    if (this.form.invalid) return;

    const id = this.data?.id || this.route.snapshot.paramMap.get('id');
    const agendamento: Agendamento = this.form.value;

    if (id) {
      this.agendamentoService.atualizar(+id, agendamento).subscribe(() => {
        alert('Agendamento atualizado com sucesso!');
        this.activeModal?.close({ salvo: true });
        this.router.navigate(['/banho-e-tosa/agendamentos']);
      });
    } else {
      this.agendamentoService.criar(agendamento).subscribe(() => {
        alert('Agendamento criado com sucesso!');
        this.activeModal?.close({ salvo: true });
        this.router.navigate(['/banho-e-tosa/agendamentos']);
      });
    }
  }

  onServicoToggle(servicoId: number, event: MatCheckboxChange): void {
  const selectedIds = this.form.value.servicosIds || [];

  if (event.checked) {
    this.form.patchValue({
      servicosIds: [...selectedIds, servicoId]
    });
  } else {
    this.form.patchValue({
      servicosIds: selectedIds.filter((id: number) => id !== servicoId)
    });
  }
}

}
