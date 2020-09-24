import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from '../shared/model/request-dto.model';
import { RequestMappings } from '../shared/model/RequestMappings';
import { RoomRequest } from '../shared/model/room-request';

@Injectable({
  providedIn: 'root'
})
export class RoomReqService {

  requestRoom(requestDto: RequestDTO): any {
    return this.httpClient.post(RequestMappings.ROOM_REQUEST_CREATE, requestDto);
  }

  constructor(private httpClient: HttpClient) { }
}
