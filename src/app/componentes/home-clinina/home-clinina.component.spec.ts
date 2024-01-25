import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeClininaComponent } from './home-clinina.component';

describe('HomeClininaComponent', () => {
  let component: HomeClininaComponent;
  let fixture: ComponentFixture<HomeClininaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeClininaComponent]
    });
    fixture = TestBed.createComponent(HomeClininaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
