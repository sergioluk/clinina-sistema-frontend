import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editar-status',
  templateUrl: './editar-status.component.html',
  styleUrls: ['./editar-status.component.css']
})
export class EditarStatusComponent implements OnInit {
 
  @Output() visivel = new EventEmitter();
  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      pagamento: [],
      status: [0]
    })
  }

  toggleJanela() {
    this.visivel.emit();
  }
  cancelar() {
    this.visivel.emit();
  }
  aplicar() {

  }
}
