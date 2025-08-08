import { Component, Input, OnInit, signal } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IconeService } from 'src/app/services/icone.service';
import { AgendamentoCreateComponent } from '../../pages/agendamento-create/agendamento-create.component';
import { AnimalService } from 'src/app/features/animal/services/animal.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, of, switchMap } from 'rxjs';
import { TutorComAnimais } from 'src/app/core/models/pesquisaAnimalTutor/tutorComAnimais.model';
import { AnimalDetalhado } from 'src/app/core/models/pesquisaAnimalTutor/animalDetalhado.model';
import { AnimalResumo } from 'src/app/core/models/pesquisaAnimalTutor/animalResumo.model';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  readonly panelOpenState = signal(false);

  panelOpenStateAnimais: Set<number> = new Set();
  // IDs dos painéis de tutor atualmente abertos
  panelOpenTutores: Set<number> = new Set();

  busca = new FormControl<string>('', { nonNullable: true });
  resultadosTutores: TutorComAnimais[] = [];
  resultadosAnimais: AnimalDetalhado[] = [];

  @Input() data: any;
  @Input() modo = '';

  constructor(
    private icone: IconeService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private animalService: AnimalService
  ){}

  ngOnInit(): void {
    this.busca.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((termo: string) => {
      if (termo.length >= 2) {
        return this.animalService.pesquisar(termo);
      } else {
        // retorna resultado vazio
        return of({ tutoresLista: [], animaisLista: [] });
      }
    })
    ).subscribe(resultados => {
      this.resultadosTutores = resultados.tutoresLista;
      this.resultadosAnimais = resultados.animaisLista;
    });
    console.log("Modo: " + this.modo)
  }

  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  selecionarAnimal(animal: AnimalResumo | AnimalDetalhado) {
    const modalRef = this.modalService.open(AgendamentoCreateComponent, { size: 'lg' });

    modalRef.componentInstance.data = {
      data: this.data?.data,
      horaEntrada: this.data?.horaEntrada,
      animalId: animal.id
    };

    modalRef.closed.subscribe(result => {
      if (result?.salvo) {
        // Só agora fecha o modal do ConsultaComponent
        this.activeModal.close({ salvo: true });
      }
    });
  }

  selecionarTutor(tutor: TutorComAnimais) {
    console.log("Hehe clicou no criar novo animal hehe e o modo era: " + this.modo);
    this.activeModal.close({ tutorSelecionado: tutor });
  }

  calcularIdade(data: string): string {
    const nascimento = new Date(data);
    const hoje = new Date();

    let anos = hoje.getFullYear() - nascimento.getFullYear();
    let meses = hoje.getMonth() - nascimento.getMonth();

    if (meses < 0) {
      anos--;
      meses += 12;
    }

    if (anos > 0 && meses > 0) {
      return `${anos} ano${anos > 1 ? 's' : ''} e ${meses} ${meses > 1 ? 'meses' : 'mês'}`;
    } else if (anos > 0) {
      return `${anos} ano${anos > 1 ? 's' : ''}`;
    } else {
      return `${meses} ${meses > 1 ? 'meses' : 'mês'}`;
    }
  }

  abrirPainelTutor(animalId: number) {
    this.panelOpenTutores.add(animalId);
  }

  fecharPainelTutor(animalId: number) {
    this.panelOpenTutores.delete(animalId);
  }

  isPainelTutorAberto(animalId: number): boolean {
    return this.panelOpenTutores.has(animalId);
  }

  abrirPainelAnimais(tutorId: number) {
    this.panelOpenStateAnimais.add(tutorId);
  }

  fecharPainelAnimais(tutorId: number) {
    this.panelOpenStateAnimais.delete(tutorId);
  }

  isPainelAnimalAberto(tutorId: number): boolean {
    return this.panelOpenStateAnimais.has(tutorId);
  }

  getPlaceholder() {
    if (this.modo === 'criar-animal') {
      return 'Buscar por um(a) Tutor(a) pelo Nome, CPF ou Telefone';
    } else {
      return 'Buscar por Animal ou um(a) Tutor(a) pelo Nome, CPF ou Telefone';
    }
  }

}
