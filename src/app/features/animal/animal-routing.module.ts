import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalListComponent } from './pages/animal-list/animal-list.component';
import { AnimalCreateComponent } from './pages/animal-create/animal-create.component';

const routes: Routes = [
  {
    path: '',
    component: AnimalListComponent
  },
  {
    path: 'novo',
    component: AnimalCreateComponent
  },
  {
    path: 'editar/:id',
    component: AnimalCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalRoutingModule { }
