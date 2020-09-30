import { TestBed } from '@angular/core/testing';

import { RoomReqService } from './room-req.service';

describe('RoomReqService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomReqService = TestBed.get(RoomReqService);
    expect(service).toBeTruthy();
  });
});
