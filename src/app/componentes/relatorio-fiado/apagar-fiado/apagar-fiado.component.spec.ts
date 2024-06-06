import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApagarFiadoComponent } from './apagar-fiado.component';

describe('ApagarFiadoComponent', () => {
  let component: ApagarFiadoComponent;
  let fixture: ComponentFixture<ApagarFiadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApagarFiadoComponent]
    });
    fixture = TestBed.createComponent(ApagarFiadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
