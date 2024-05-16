import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ListaId } from 'src/app/interfaces/produtoVenda';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    },
  ]
})
export class SelectComponent<T> implements ControlValueAccessor {
  
  @Input() label: string | undefined;
  @Input() for: string | undefined;
  @Input() isReadOnly = false;
  @Input() lista!: ListaId[];
  @Input() control: any;
  @Input() isEditar = false;
  @Output() acao = new EventEmitter();

  faPencil = faPencil;
  

  private innerValue: any;

  acaoBtn() {
    this.acao.emit();
  }

  get value() {
    return this.innerValue;
  }
  set value(v: any) {
    if (v != this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(v);
    }
  }

  onChangeCb: ( _: any) => void = () => {};
  onTouchedCb: ( _: any) => void = () => {};

  writeValue(v: any): void {
    this.value = v;
  }
  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }

}
