import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendamentoRoutingModule } from './agendamento-routing.module';
import { AgendamentoListComponent } from './pages/agendamento-list/agendamento-list.component';
import { AgendamentoCreateComponent } from './pages/agendamento-create/agendamento-create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from "@ng-select/ng-select";
import {CdkDropList, DragDropModule} from '@angular/cdk/drag-drop';
import { CardBanhoTosaComponent } from './components/card-banho-tosa/card-banho-tosa.component';
import { ConsultaComponent } from './components/consulta/consulta.component';



@NgModule({
  declarations: [
    AgendamentoListComponent,
    AgendamentoCreateComponent,
    CardBanhoTosaComponent,
    ConsultaComponent
  ],
  imports: [
    CommonModule,
    AgendamentoRoutingModule,
    SharedModule,
    NgSelectModule,
    DragDropModule,
    CdkDropList
]
})
export class AgendamentoModule { }
