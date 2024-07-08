import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinhaDoTempoComponent } from './linha-do-tempo.component';

describe('LinhaDoTempoComponent', () => {
  let component: LinhaDoTempoComponent;
  let fixture: ComponentFixture<LinhaDoTempoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinhaDoTempoComponent]
    });
    fixture = TestBed.createComponent(LinhaDoTempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
