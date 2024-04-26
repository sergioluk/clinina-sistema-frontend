import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoGrandeComponent } from './botao-grande.component';

describe('BotaoGrandeComponent', () => {
  let component: BotaoGrandeComponent;
  let fixture: ComponentFixture<BotaoGrandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotaoGrandeComponent]
    });
    fixture = TestBed.createComponent(BotaoGrandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
