import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  createRoom(room: import("../shared/model/room.model").Room) {
    return this.httpClient.post('brw/createRoom',room);
  }
  getAllRooms() {
    return this.httpClient.get('brw/getAllRooms');
  }
  getFreeRooms() {
    return this.httpClient.post('brw/getRoomsByStatus','free');
  }
  getBookedRooms() {
    return this.httpClient.post('brw/getRoomsByStatus','booked');
  }
  getRoomsByFloor(floorNumber: number) {
    return this.httpClient.post('brw/getRoomsByFloor',floorNumber);
  }

  constructor(private httpClient: HttpClient) { }
}
