import { Component, OnInit } from '@angular/core';
import { RoomRequest } from '../shared/model/room-request';
import { RoomAllocateService } from './room-allocate.service';

@Component({
  selector: 'app-room-allocate',
  templateUrl: './room-allocate.component.html',
  styleUrls: ['./room-allocate.component.scss']
})
export class RoomAllocateComponent implements OnInit {
  roomRequestList: any = [];
  roomList: any = [];
  actingRequestId: number;
  constructor(private roomAllocateService: RoomAllocateService) { }

  ngOnInit() {
  }

  viewAllRequests() {
    //this.customer.custDob = new Date(resp['custDob'])
    this.roomAllocateService.getAllRoomRequests().subscribe(resp => this.roomRequestList = resp);
    this.roomRequestList.forEach(element => {
      element.checkInDate = new Date(element.checkInDate),
        element.checkOutDate = new Date(element.checkOutDate)
    });
  }
  viewFeasibleRooms(requestId) {
    this.actingRequestId = requestId;
    this.roomAllocateService.viewFeasibleRooms(requestId).subscribe(resp => this.roomList = resp);
  }
  assignRoomToRequest(roomNumber, requestId) {
    let roomReq = new RoomRequest();
    roomReq.requestId = requestId;
    roomReq.roomNumber = roomNumber;
    this.roomAllocateService.assignRoomToRequest(roomReq).subscribe(resp => console.log(resp));
  }

  private newMethod() {
    return this.roomList;
  }
}
