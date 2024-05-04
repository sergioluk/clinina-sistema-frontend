import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaVendaComponent } from './tabela-venda.component';

describe('TabelaVendaComponent', () => {
  let component: TabelaVendaComponent;
  let fixture: ComponentFixture<TabelaVendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabelaVendaComponent]
    });
    fixture = TestBed.createComponent(TabelaVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
