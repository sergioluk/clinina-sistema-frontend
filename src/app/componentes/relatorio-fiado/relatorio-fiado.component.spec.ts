import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioFiadoComponent } from './relatorio-fiado.component';

describe('RelatorioFiadoComponent', () => {
  let component: RelatorioFiadoComponent;
  let fixture: ComponentFixture<RelatorioFiadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelatorioFiadoComponent]
    });
    fixture = TestBed.createComponent(RelatorioFiadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
