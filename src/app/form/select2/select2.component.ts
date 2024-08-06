import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-select2',
  templateUrl: './select2.component.html',
  styleUrls: ['./select2.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select2Component),
      multi: true
    },
  ]
})
export class Select2Component<T> implements ControlValueAccessor {
  
  @Input() label: string | undefined;
  @Input() for: string | undefined;
  @Input() isReadOnly = false;
  @Input() lista!: any[];
  @Input() control: any;
  @Input() isEditar = false;
  @Output() acao = new EventEmitter();
  @Input() negrito: boolean = false;
  @Input() propriedade: string = '';

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

  displayItem(item: any): string {
    return this.propriedade ? item[this.propriedade] : item.toString();
  }

}
