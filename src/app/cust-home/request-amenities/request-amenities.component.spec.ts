import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAmenitiesComponent } from './request-amenities.component';

describe('RequestAmenitiesComponent', () => {
  let component: RequestAmenitiesComponent;
  let fixture: ComponentFixture<RequestAmenitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestAmenitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAmenitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
