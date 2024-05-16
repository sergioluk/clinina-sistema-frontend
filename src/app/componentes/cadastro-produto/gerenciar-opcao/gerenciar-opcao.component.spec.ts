import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarOpcaoComponent } from './gerenciar-opcao.component';

describe('GerenciarOpcaoComponent', () => {
  let component: GerenciarOpcaoComponent;
  let fixture: ComponentFixture<GerenciarOpcaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerenciarOpcaoComponent]
    });
    fixture = TestBed.createComponent(GerenciarOpcaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
