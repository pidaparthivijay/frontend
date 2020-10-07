import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from 'src/app/common/model/request-dto.model';
import { RequestMappings } from 'src/app/common/model/RequestMappings';

@Injectable({
  providedIn: 'root'
})
export class RoomReqService {

  requestRoom(requestDto: RequestDTO): any {
    return this.httpClient.post(RequestMappings.ROOM_REQUEST_CREATE, requestDto);
  }

  constructor(private httpClient: HttpClient) { }
}
