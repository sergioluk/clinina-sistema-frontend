import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBanhoTosaComponent } from './card-banho-tosa.component';

describe('CardBanhoTosaComponent', () => {
  let component: CardBanhoTosaComponent;
  let fixture: ComponentFixture<CardBanhoTosaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardBanhoTosaComponent]
    });
    fixture = TestBed.createComponent(CardBanhoTosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
