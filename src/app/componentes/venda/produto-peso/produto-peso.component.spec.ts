import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoPesoComponent } from './produto-peso.component';

describe('ProdutoPesoComponent', () => {
  let component: ProdutoPesoComponent;
  let fixture: ComponentFixture<ProdutoPesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoPesoComponent]
    });
    fixture = TestBed.createComponent(ProdutoPesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
