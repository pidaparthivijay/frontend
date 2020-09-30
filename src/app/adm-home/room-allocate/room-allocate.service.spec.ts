import { TestBed } from '@angular/core/testing';

import { RoomAllocateService } from './room-allocate.service';

describe('RoomAllocateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomAllocateService = TestBed.get(RoomAllocateService);
    expect(service).toBeTruthy();
  });
});
