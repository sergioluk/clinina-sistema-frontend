import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarLancamentoComponent } from './adicionar-lancamento.component';

describe('AdicionarLancamentoComponent', () => {
  let component: AdicionarLancamentoComponent;
  let fixture: ComponentFixture<AdicionarLancamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdicionarLancamentoComponent]
    });
    fixture = TestBed.createComponent(AdicionarLancamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
