import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BotaoPequenoComponent } from '../layout/botao-pequeno/botao-pequeno.component';
import { InputSimplesComponent } from '../layout/input-simples/input-simples.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    BotaoPequenoComponent,
    InputSimplesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FullCalendarModule,
    NgbModule,
    FontAwesomeModule,
    MatSnackBarModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FullCalendarModule,
    NgbModule,
    FontAwesomeModule,
    BotaoPequenoComponent,
    InputSimplesComponent,
    MatSnackBarModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule
  ]
})
export class SharedModule { }
