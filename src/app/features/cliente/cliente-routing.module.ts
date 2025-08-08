import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteListComponent } from './pages/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './pages/cliente-create/cliente-create.component';

const routes: Routes = [
  {
    path: '',
    component: ClienteListComponent
  },
  {
    path: 'novo',
    component: ClienteCreateComponent
  },
  {
    path: 'editar/:id',
    component: ClienteCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
