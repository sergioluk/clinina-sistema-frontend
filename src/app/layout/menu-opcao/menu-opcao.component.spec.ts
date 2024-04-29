import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOpcaoComponent } from './menu-opcao.component';

describe('MenuOpcaoComponent', () => {
  let component: MenuOpcaoComponent;
  let fixture: ComponentFixture<MenuOpcaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuOpcaoComponent]
    });
    fixture = TestBed.createComponent(MenuOpcaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
