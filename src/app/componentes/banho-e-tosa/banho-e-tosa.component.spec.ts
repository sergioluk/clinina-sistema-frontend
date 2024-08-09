import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanhoETosaComponent } from './banho-e-tosa.component';

describe('BanhoETosaComponent', () => {
  let component: BanhoETosaComponent;
  let fixture: ComponentFixture<BanhoETosaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BanhoETosaComponent]
    });
    fixture = TestBed.createComponent(BanhoETosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
