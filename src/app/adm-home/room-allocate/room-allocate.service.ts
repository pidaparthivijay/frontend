import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from 'src/app/shared/model/request-dto.model';
import { RequestMappings } from 'src/app/shared/model/RequestMappings';

@Injectable({
  providedIn: 'root'
})
export class RoomAllocateService {
  assignRoomToRequest(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.ROOM_REQUEST_ASSIGN_ROOM, requestDTO);
  }

  viewFeasibleRooms(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.ROOM_REQUEST_FEASIBLE, requestDTO);
  }

  getAllRoomRequests() {
    return this.httpClient.get(RequestMappings.ROOM_REQUEST_VIEW_ALL);
  }

  constructor(private httpClient: HttpClient) { }
}
