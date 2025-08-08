import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TutorRoutingModule } from './tutor-routing.module';
import { TutorListComponent } from './pages/tutor-list/tutor-list.component';
import { TutorCreateComponent } from './pages/tutor-create/tutor-create.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TutorListComponent,
    TutorCreateComponent
  ],
  imports: [
    CommonModule,
    TutorRoutingModule,
    SharedModule
  ]
})
export class TutorModule { }
