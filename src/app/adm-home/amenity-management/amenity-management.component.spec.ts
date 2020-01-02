import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenityManagementComponent } from './amenity-management.component';

describe('AmenityManagementComponent', () => {
  let component: AmenityManagementComponent;
  let fixture: ComponentFixture<AmenityManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmenityManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmenityManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
