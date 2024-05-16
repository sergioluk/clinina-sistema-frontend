import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniBotaoComponent } from './mini-botao.component';

describe('MiniBotaoComponent', () => {
  let component: MiniBotaoComponent;
  let fixture: ComponentFixture<MiniBotaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiniBotaoComponent]
    });
    fixture = TestBed.createComponent(MiniBotaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
