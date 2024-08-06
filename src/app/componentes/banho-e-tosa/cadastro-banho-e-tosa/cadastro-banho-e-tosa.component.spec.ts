import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroBanhoETosaComponent } from './cadastro-banho-e-tosa.component';

describe('CadastroBanhoETosaComponent', () => {
  let component: CadastroBanhoETosaComponent;
  let fixture: ComponentFixture<CadastroBanhoETosaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroBanhoETosaComponent]
    });
    fixture = TestBed.createComponent(CadastroBanhoETosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
