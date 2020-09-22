import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomRequest } from '../shared/model/room-request';

@Injectable({
  providedIn: 'root'
})
export class RoomAllocateService {
  assignRoomToRequest(roomReq: RoomRequest) {
    return this.httpClient.post('brw/assignRoomToRequest', roomReq);
  }
  viewFeasibleRooms(requestId: number) {
    return this.httpClient.post('brw/viewFeasibleRooms', requestId);
  }
  getAllRoomRequests() {
    return this.httpClient.get('brw/getAllRoomRequests');
  }

  constructor(private httpClient: HttpClient) { }
}
