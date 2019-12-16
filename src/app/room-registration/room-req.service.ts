import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoomRequest } from '../shared/model/room-request';

@Injectable({
  providedIn: 'root'
})
export class RoomReqService {
  requestRoom(roomRequest: RoomRequest): any {
    return this.httpClient.post('brw/requestRoom',roomRequest)
  }

  constructor(private httpClient: HttpClient) { }
}
