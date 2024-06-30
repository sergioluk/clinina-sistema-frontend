import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelInformacoesComponent } from './label-informacoes.component';

describe('LabelInformacoesComponent', () => {
  let component: LabelInformacoesComponent;
  let fixture: ComponentFixture<LabelInformacoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabelInformacoesComponent]
    });
    fixture = TestBed.createComponent(LabelInformacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
