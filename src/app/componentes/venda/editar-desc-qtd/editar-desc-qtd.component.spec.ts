import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDescQtdComponent } from './editar-desc-qtd.component';

describe('EditarDescQtdComponent', () => {
  let component: EditarDescQtdComponent;
  let fixture: ComponentFixture<EditarDescQtdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarDescQtdComponent]
    });
    fixture = TestBed.createComponent(EditarDescQtdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
