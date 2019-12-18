import { Component, OnInit } from '@angular/core';
import { RoomAllocateService } from './room-allocate.service';
import { RoomRequest } from '../shared/model/room-request';

@Component({
  selector: 'app-room-allocate',
  templateUrl: './room-allocate.component.html',
  styleUrls: ['./room-allocate.component.scss']
})
export class RoomAllocateComponent implements OnInit {
  roomRequestList: any = [];
  roomList: any = [];
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
    this.roomAllocateService.viewFeasibleRooms(requestId).subscribe(resp => this.roomList = resp);
  }
}
