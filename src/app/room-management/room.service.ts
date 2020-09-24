import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../shared/model/constants';
import { RequestDTO } from '../shared/model/request-dto.model';
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  createRoomMultiple(requestDto: RequestDTO) {
    return this.httpClient.post('brw/createRoomMultiple', requestDto);
  }
  createRoom(requestDto: RequestDTO) {
    return this.httpClient.post('brw/createRoom', requestDto);
  }
  getAllRooms() {
    return this.httpClient.get('brw/getAllRooms');
  }
  getFreeRooms() {
    return this.httpClient.post('brw/getRoomsByStatus', Constants.VACANT);
  }
  getBookedRooms() {
    return this.httpClient.post('brw/getRoomsByStatus', Constants.OCCUPIED);
  }
  getRoomsByFloor(floorNumber: number) {
    return this.httpClient.post('brw/getRoomsByFloor', floorNumber);
  }

  constructor(private httpClient: HttpClient) { }
}
