import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorListComponent } from './pages/tutor-list/tutor-list.component';
import { TutorCreateComponent } from './pages/tutor-create/tutor-create.component';

const routes: Routes = [
  {path: '',
    component: TutorListComponent
  },
  {path: 'novo',
    component: TutorCreateComponent
  },
  {
    path: 'editar/:id',
    component: TutorCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorRoutingModule {

}
