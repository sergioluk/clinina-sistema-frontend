import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaixaDetalheComponent } from './caixa-detalhe.component';

describe('CaixaDetalheComponent', () => {
  let component: CaixaDetalheComponent;
  let fixture: ComponentFixture<CaixaDetalheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaixaDetalheComponent]
    });
    fixture = TestBed.createComponent(CaixaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
