import { Component, Inject, Injector, Input, OnInit, forwardRef } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, FormControlName, FormGroupDirective, NG_VALUE_ACCESSOR, NgControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    },
  ]
  
})
export class InputComponent<T> implements ControlValueAccessor  {
  
  @Input() label: string | undefined;
  @Input() type: string | undefined;
  @Input() placeholder: string | undefined;
  @Input() for: string | undefined;
  @Input() isReadOnly = false;
  @Input() negrito: boolean = false;
  //layane
  @Input() control: any;

  //@Input() formControlName!: string;

  private innerValue: any;

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
    /*if ( v != this.innerValue) {
      this.innerValue = v;
      this.onChangeCb(v);
    } mesma coisa */
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
