import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicoListComponent } from './pages/servico-list/servico-list.component';
import { ServicoCreateComponent } from './pages/servico-create/servico-create.component';

const routes: Routes = [
  {
    path: '',
    component: ServicoListComponent
  },
  {
    path: 'novo',
    component: ServicoCreateComponent
  },
  {
    path: 'editar/:id',
    component: ServicoCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicoRoutingModule { }
