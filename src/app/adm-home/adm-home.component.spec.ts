import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmHomeComponent } from './adm-home.component';

describe('AdmHomeComponent', () => {
  let component: AdmHomeComponent;
  let fixture: ComponentFixture<AdmHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
