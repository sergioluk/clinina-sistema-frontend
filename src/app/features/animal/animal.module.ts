import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalRoutingModule } from './animal-routing.module';
import { AnimalListComponent } from './pages/animal-list/animal-list.component';
import { AnimalCreateComponent } from './pages/animal-create/animal-create.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AnimalListComponent,
    AnimalCreateComponent
  ],
  imports: [
    CommonModule,
    AnimalRoutingModule,
    SharedModule
  ]
})
export class AnimalModule { }
