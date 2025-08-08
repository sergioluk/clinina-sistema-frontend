import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalCreateComponent } from './animal-create.component';

describe('AnimalCreateComponent', () => {
  let component: AnimalCreateComponent;
  let fixture: ComponentFixture<AnimalCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalCreateComponent]
    });
    fixture = TestBed.createComponent(AnimalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
