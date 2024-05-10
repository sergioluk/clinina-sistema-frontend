import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoPagamentoComponent } from './metodo-pagamento.component';

describe('MetodoPagamentoComponent', () => {
  let component: MetodoPagamentoComponent;
  let fixture: ComponentFixture<MetodoPagamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetodoPagamentoComponent]
    });
    fixture = TestBed.createComponent(MetodoPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
