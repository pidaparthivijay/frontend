import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from '../shared/model/request-dto.model';
import { RoomRequest } from '../shared/model/room-request';

@Injectable({
  providedIn: 'root'
})
export class RoomReqService {

  requestRoom(requestDto: RequestDTO): any {
    return this.httpClient.post('brw/requestRoom', requestDto)
  }

  constructor(private httpClient: HttpClient) { }
}
