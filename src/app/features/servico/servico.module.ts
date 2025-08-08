import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicoRoutingModule } from './servico-routing.module';
import { ServicoListComponent } from './pages/servico-list/servico-list.component';
import { ServicoCreateComponent } from './pages/servico-create/servico-create.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ServicoListComponent,
    ServicoCreateComponent
  ],
  imports: [
    CommonModule,
    ServicoRoutingModule,
    SharedModule
  ]
})
export class ServicoModule { }
