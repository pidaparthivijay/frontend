import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from '../shared/model/request-dto.model';
import { RoomRequest } from '../shared/model/room-request';

@Injectable({
  providedIn: 'root'
})
export class RoomAllocateService {
  assignRoomToRequest(requestDTO: RequestDTO) {
    return this.httpClient.post('brw/assignRoomToRequest', requestDTO);
  }

  viewFeasibleRooms(requestDTO: RequestDTO) {
    return this.httpClient.post('brw/viewFeasibleRooms', requestDTO);
  }

  getAllRoomRequests() {
    return this.httpClient.get('brw/getAllRoomRequests');
  }

  constructor(private httpClient: HttpClient) { }
}
