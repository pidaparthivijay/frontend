import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../shared/model/room.model';
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  createRoomMultiple(room: Room) {
    return this.httpClient.post('brw/createRoomMultiple', room);
  }
  createRoom(room: Room) {
    return this.httpClient.post('brw/createRoom', room);
  }
  getAllRooms() {
    return this.httpClient.get('brw/getAllRooms');
  }
  getFreeRooms() {
    return this.httpClient.post('brw/getRoomsByStatus', 'free');
  }
  getBookedRooms() {
    return this.httpClient.post('brw/getRoomsByStatus', 'booked');
  }
  getRoomsByFloor(floorNumber: number) {
    return this.httpClient.post('brw/getRoomsByFloor', floorNumber);
  }

  constructor(private httpClient: HttpClient) { }
}
