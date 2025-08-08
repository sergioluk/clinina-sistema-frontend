import { Component, OnInit } from '@angular/core';
import { Agendamento } from 'src/app/core/models/agendamento.modal';
import { AgendamentoService } from '../../services/agendamento.service';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

import { AgendamentoCalendario } from 'src/app/core/models/agendamentoCalendario.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendamentoCreateComponent } from '../agendamento-create/agendamento-create.component';
import { ConsultaComponent } from '../../components/consulta/consulta.component';
import { IconeService } from 'src/app/services/icone.service';
import { Cliente } from 'src/app/core/models/cliente.model';
import { Endereco, Pessoa } from 'src/app/core/models/tutor.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnimalCreateComponent } from 'src/app/features/animal/pages/animal-create/animal-create.component';
import { TutorCreateComponent } from 'src/app/features/tutor/pages/tutor-create/tutor-create.component';


@Component({
  selector: 'app-agendamento-list',
  templateUrl: './agendamento-list.component.html',
  styleUrls: ['./agendamento-list.component.css']
})
export class AgendamentoListComponent implements OnInit {



  constructor(
    private agendamentoService: AgendamentoService,
    private router: Router,
    private modalService: NgbModal,
    private icone: IconeService,
    private snackBar: MatSnackBar
  ) {}

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    eventClick: this.onEventClick.bind(this),
    locale: ptBrLocale,
    slotLabelFormat: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
    },
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    weekends: true, // initial value
    slotMinTime: '07:00:00',
    slotMaxTime: '19:00:00',
    slotDuration: '00:15:00', // intervalo de 30 minutos
    defaultTimedEventDuration: '00:30:00',
    forceEventDuration: true,
    allDayContent: false,
  };

  // {{arg.event.start | date:'HH:mm'}}
  //       <fa-icon class="editar" [icon]="getIcone('fa-car')"></fa-icon>
  //       <fa-icon class="editar" [icon]="getIcone('fa-shower')"></fa-icon>
  //       <fa-icon class="editar" [icon]="getIcone('fa-scissors')"></fa-icon>
  //       {{arg.event.extendedProps.animalNome}}
  //       -
  //       {{arg.event.extendedProps.animalTutor}}

  preAgendadosList: AgendamentoCalendario[] = [];
  encaixesList: AgendamentoCalendario[] = [];
  atendendosList: AgendamentoCalendario[] = [];
  prontosList: AgendamentoCalendario[] = [];

  carregarAgendamentosCalendario() {
    this.agendamentoService.listarParaCalendario().subscribe((dados) => {

      this.agendamentosCalendario = [];
      this.preAgendadosList = [];
      this.encaixesList = [];
      this.atendendosList = [];
      this.prontosList = [];

      const eventosFormatados: any[] = [];

      //const hoje = new Date();
      //const dataHoje = hoje.toISOString().slice(0, 10); // yyyy-MM-dd

      const dataHoje = this.formatarDataLocal(new Date());

      dados.forEach(agendamento => {
        this.agendamentosCalendario.push(agendamento);

        const dataEntrada = new Date(agendamento.data).toISOString().slice(0, 10); // yyyy-MM-dd
        //const dataEntrada = this.formatarDataLocal(new Date(agendamento.data));

        if (dataEntrada == dataHoje) {
          console.log("DataEntrada: " + dataEntrada + " | dataHoje: " + dataHoje);
          // Popula as listas por status
          switch (agendamento.status) {
            case 'PRE_AGENDADO':
              this.preAgendadosList.push(agendamento);
              break;
            case 'ENCAIXE':
              this.encaixesList.push(agendamento);
              break;
            case 'ATENDENDO':
              this.atendendosList.push(agendamento);
              break;
            case 'PRONTO':
              this.prontosList.push(agendamento);
              break;
          }
        }
        // Cria evento para o calendário
        eventosFormatados.push({
          title: '',
          start: `${agendamento.data}T${agendamento.horaEntrada}`,
          end: agendamento.horaSaida ? `${agendamento.data}T${agendamento.horaSaida}` : undefined,
          id: String(agendamento.id),
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          extendedProps: {
            animalNome: agendamento.animalNome,
            animalId: agendamento.animalId,
            animalTutor: agendamento.tutorNome,
            agendamentoStatus: agendamento.status,
            categorias: agendamento.servicos
          }
        });
    });
    this.calendarOptions.events = eventosFormatados;
    });
  }

  temCategoria(servicos: any[], categoria: string): boolean {
    if (!servicos) return false;
    return servicos.some(s => s.categoria?.toLowerCase() === categoria.toLowerCase());
  }

  corDoCard(status: string) {
    let classe = "";
    switch (status) {
      case 'PRE_AGENDADO':
        classe = "corCinza";
        break;
      case 'ENCAIXE':
        classe = "corLaranja";
        break;
      case 'ATENDENDO':
        classe = "corRoxo";
        break;
      case 'PRONTO':
        classe = "corVerde";
        break;
    }
    return classe;
  }

  agendar() {
    const modalRef = this.modalService.open(ConsultaComponent, { size: 'lg' });

    // Não passamos data nem hora
    modalRef.componentInstance.data = {};

    modalRef.closed.subscribe((resultado) => {
      // Se foi salvo um agendamento
      if (resultado?.salvo) {
        this.carregarAgendamentosCalendario();
      }

      //// Se o usuário clicou em "Cadastrar novo animal"
      if (resultado?.tutorSelecionado) {
        const tutor = resultado.tutorSelecionado;

        const modalAnimal = this.modalService.open(AnimalCreateComponent, { size: 'lg '});
        modalAnimal.componentInstance.tutorId = tutor.id;
      }
    });
  }

  handleDateClick(arg: DateClickArg) {
    alert('date click! ' + arg.dateStr)
    let date = new Date(arg.dateStr);

     // Detecta se o dateStr tem hora
    const hasTime = arg.dateStr.includes('T');

    // Se não tem hora (visão mensal), criar a data local corretamente (sem conversão UTC)
    if (!hasTime) {
      const [year, month, day] = arg.dateStr.split('-').map(Number);
      // Cria a data no fuso horário local (corrige o erro de um dia a menos)
      date = new Date(year, month - 1, day, 0, 0, 0);
    }

    // Extrai data local no formato Date (sem hora)
    const data = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Zera hora (meia-noite local)

    // Extrai a hora de entrada apenas se ela existir
    const horaEntrada = hasTime ? date.toTimeString().slice(0, 5) : '09:00';

    console.log("data:", data, "| horaEntrada:", horaEntrada);

    const modalRef = this.modalService.open(ConsultaComponent, { size: 'lg' });
    modalRef.componentInstance.data = {
      data,
      horaEntrada
    };

    modalRef.closed.subscribe((resultado) => {
      if (resultado?.salvo) {
        this.carregarAgendamentosCalendario(); // método para atualizar os eventos
      }
    });
  }

  formatarDataLocal(data: Date): string {
    // Extrai ano, mês e dia com ajuste para 2 dígitos
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  onEventClick(info: any) {
    console.log(info)
    alert('Agendamento: ' + info.event.title);
    const agendamentoId = info.event.id;
    //const agendamentoId = info.event.extendedProps.animalId;
    console.log("id: " + agendamentoId);
    const modalRef = this.modalService.open(AgendamentoCreateComponent, { size: 'lg' });
    modalRef.componentInstance.data = {
      id: agendamentoId,
      modo: 'editar'
    };

    modalRef.closed.subscribe((resultado) => {
      if (resultado?.salvo) {
        this.carregarAgendamentosCalendario();
      }
    });

  }

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }

  novoAnimal() {
    const modalRef = this.modalService.open(ConsultaComponent, { size: 'lg' });
    modalRef.componentInstance.modo = 'criar-animal'; // MODO ESPECÍFICO

    modalRef.closed.subscribe(result => {
      if (result?.tutorSelecionado) {
        // Agora você pode abrir o componente de criação do animal
        const modalAnimal = this.modalService.open(AnimalCreateComponent, { size: 'lg' });
        modalAnimal.componentInstance.tutorId = result.tutorSelecionado.id;
      }
    });
    // modalRef.closed.subscribe(resultado => {
    //   if (resultado?.tutorSelecionado) {
    //     const tutor = resultado.tutorSelecionado;

    //     const modalAnimal = this.modalService.open(AnimalCreateComponent, { size: 'lg' });
    //     modalAnimal.componentInstance.tutorId = tutor.id;
    //   }
    // });
  }

  novoTutor(): void {
    const modalRef = this.modalService.open(TutorCreateComponent, { size: 'lg' });

    modalRef.closed.subscribe(result => {
      if (result?.salvo) {
        // Tutor salvo com sucesso, você pode atualizar a lista se quiser
        console.log('Novo tutor cadastrado, ID:', result.id);
      }
    });
  }



  agendamentos: Agendamento[] = [];
  agendamentosCalendario: AgendamentoCalendario[] = [];

  // calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  // agendamentos2: any[] = [];
  // headerToolbar = {
  //   left: 'prev,next today',
  //   center: 'title',
  //   right: 'dayGridMonth,timeGridWeek,timeGridDay'
  // };




  getIcone(icone: string) {
    return this.icone.getIcone(icone);
  }

  ngOnInit(): void {
    //this.carregarAgendamentos();
    this.carregarAgendamentosCalendario();

    // this.agendamentos2 = [
    //   {
    //     title: 'Banho - Rex 🐶',
    //     start: '2025-06-27T10:00:00',
    //     end: '2025-06-27T10:30:00',
    //     backgroundColor: '#7cc',
    //   }
    // ];
  }

  carregarAgendamentos(): void {
    this.agendamentoService.listar().subscribe((dados) => {
      this.agendamentos = dados;

      // Mapeia os agendamentos para o formato do FullCalendar
      const eventosFormatados = this.agendamentos.map((agendamento) => ({
        title: `Animal ${agendamento.animalId}`,
        start: `${agendamento.data}T${agendamento.horaEntrada}`,
        end: agendamento.horaSaida ? `${agendamento.data}T${agendamento.horaSaida}` : undefined,
        id: String(agendamento.id), //opcional
        // backgroundColor: "#6c9", //opcional
        extendedProps: {
          animalNome: agendamento.animalId,
        }
      }));

      //atualizar o calendario
      this.calendarOptions.events = eventosFormatados;
    });
  }



  editar(id: number): void {
    this.router.navigate(['/banho-e-tosa/agendamentos/editar', id]);
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir este agendamento?')) {
      this.agendamentoService.excluir(id).subscribe(() => {
        this.agendamentos = this.agendamentos.filter(a => a.id !== id);
      });
    }
  }







//  pesquisar(texto: string) {
//     this.loadingSpinner = true;
//     this.service.pesquisarPorCodigoDeBarrasOuNome(texto).subscribe({
//       next: (response: HttpResponse<CadastroProduto[]>) => {
//         this.listaDeProdutos = response.body ? response.body : [];
//         console.log("Código de status HTTP do Estoque: ", response.status);
//         this.loadingSpinner = false;
//         this.snackbar.openSnackBarSucces("Pesquisa concluída!","Fechar");
//       },
//       error: (error: HttpErrorResponse) => {
//         console.error("Erro: ", error.message); // Mensagem de erro
//         console.error("Código de status HTTP: ", error.status); // Código de status HTTP do erro
//         this.loadingSpinner = false;
//         this.snackbar.openSnackBarFail("Algo deu errado!", "Fechar");
//       },
//       complete: () => {
//         console.log("Requisição completa!!!");
//       }
//     });
//   }

  endereco: Endereco = {
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: '',
    cep: ''
  }
  pessoa: Pessoa = {
    nome: '',
    cpf: '',
    telefone: '',
    celular: '',
    email: '',
    endereco: this.endereco
  }
  cliente: Cliente = {
    pessoa: this.pessoa
  }
  listaDeClientes: Cliente[] = [];


  // todo:string[] = [];
  // done:string[] = [];
  // drop(event: CdkDragDrop<string[]>) {}

  drop(event: CdkDragDrop<AgendamentoCalendario[]>) {

    const itemArrastado = event.previousContainer.data[event.previousIndex];
    const containerOrigem = event.previousContainer.id;
    const containerDestino = event.container.id;

    console.log('Item arrastado:', itemArrastado);
    console.log('De:', containerOrigem);
    console.log('Para:', containerDestino);

    let novoStatus: string | null = null;

    switch (containerDestino) {
      case 'preAgendadosList':
        novoStatus = 'PRE_AGENDADO';
        break;
      case 'encaixesList':
        novoStatus = 'ENCAIXE';
        break;
      case 'atendendosList':
        novoStatus = 'ATENDENDO';
        break;
      case 'prontosList':
        novoStatus = 'PRONTO';
        break;
    }

    if (novoStatus && itemArrastado.status !== novoStatus) {
      itemArrastado.status = novoStatus;


      //const servicosIds = itemArrastado.servicos.map(servico => servico.id!);

      // let itemArrastadoObj: Agendamento = {
      //   animalId: itemArrastado.animalId,
      //   dataEntrada: itemArrastado.dataEntrada,
      //   tipo: itemArrastado.tipo,
      //   status: itemArrastado.status,
      //   descricao: itemArrastado.descricao,
      //   observacoes: itemArrastado.observacoes,
      //   servicosIds: serviceIdsObj
      // }

      // Atualiza status visualmente e envia atualização ao back-end
      const dto = this.mapToAgendamentoDTO(itemArrastado);
      this.agendamentoService.atualizar(itemArrastado.id!, dto).subscribe(() => {
        console.log(`Agendamento ${itemArrastado.id} atualizado para ${novoStatus}`);
        this.snackBar.open(
          "Status alterado para " + novoStatus + " com sucesso!",
          "Fechar",
          {
            duration: 3000,
            verticalPosition:"bottom",
            panelClass: ["snackbar-sucesso"]
          }
        );
      });
    }

    // Atualiza a UI
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

  }

  private mapToAgendamentoDTO(calendario: AgendamentoCalendario): Agendamento {
    return {
      animalId: calendario.animalId,
      data: calendario.data,
      horaEntrada: calendario.horaEntrada,
      horaSaida: calendario.horaSaida,
      tipo: calendario.tipo,
      status: calendario.status,
      descricao: calendario.descricao,
      observacoes: calendario.observacoes,
      servicosIds: calendario.servicos.map(s => s.id!)
    };
  }




}
