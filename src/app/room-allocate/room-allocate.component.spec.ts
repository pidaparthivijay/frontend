import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAllocateComponent } from './room-allocate.component';

describe('RoomAllocateComponent', () => {
  let component: RoomAllocateComponent;
  let fixture: ComponentFixture<RoomAllocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomAllocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomAllocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
