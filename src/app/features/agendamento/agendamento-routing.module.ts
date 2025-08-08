import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentoListComponent } from './pages/agendamento-list/agendamento-list.component';
import { AgendamentoCreateComponent } from './pages/agendamento-create/agendamento-create.component';

const routes: Routes = [
  {
    path: '',
    component: AgendamentoListComponent,
  },
  {
    path: 'novo',
    component: AgendamentoCreateComponent,
  },
  {
    path: 'editar/:id',
    component: AgendamentoCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendamentoRoutingModule { }
