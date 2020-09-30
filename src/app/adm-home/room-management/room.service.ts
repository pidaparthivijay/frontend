import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from 'src/app/shared/model/request-dto.model';
import { RequestMappings } from 'src/app/shared/model/RequestMappings';
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  updateRoom(requestDto: RequestDTO) {
    return this.httpClient.post(RequestMappings.ROOM_UPDATE, requestDto);
  }
  createRoomMultiple(requestDto: RequestDTO) {
    return this.httpClient.post(RequestMappings.ROOM_CREATE_MULTIPLE, requestDto);
  }

  createRoom(requestDto: RequestDTO) {
    return this.httpClient.post(RequestMappings.ROOM_CREATE, requestDto);
  }

  getAllRooms() {
    return this.httpClient.get(RequestMappings.ROOM_VIEW_ALL);
  }

  getRoomsByStatus(requestDto: RequestDTO) {
    return this.httpClient.post(RequestMappings.ROOM_VIEW_BY_STATUS, requestDto);
  }

  constructor(private httpClient: HttpClient) { }
}
