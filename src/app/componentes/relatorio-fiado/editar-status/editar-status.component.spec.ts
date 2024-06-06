import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarStatusComponent } from './editar-status.component';

describe('EditarStatusComponent', () => {
  let component: EditarStatusComponent;
  let fixture: ComponentFixture<EditarStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarStatusComponent]
    });
    fixture = TestBed.createComponent(EditarStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
