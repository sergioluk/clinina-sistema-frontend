import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSimplesComponent } from './input-simples.component';

describe('InputSimplesComponent', () => {
  let component: InputSimplesComponent;
  let fixture: ComponentFixture<InputSimplesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputSimplesComponent]
    });
    fixture = TestBed.createComponent(InputSimplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
