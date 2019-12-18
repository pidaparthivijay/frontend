import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomAllocateService {
  viewFeasibleRooms(requestId: number) {
    return this.httpClient.post('brw/viewFeasibleRooms', requestId);
  }
  getAllRoomRequests() {
    return this.httpClient.get('brw/getAllRoomRequests');
  }

  constructor(private httpClient: HttpClient) { }
}
