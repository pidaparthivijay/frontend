import { Component, OnInit } from '@angular/core';
import { RequestDTO } from 'src/app/shared/model/request-dto.model';
import { RoomRequest } from 'src/app/shared/model/room-request';
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
    this.viewAllRequests();
  }

  viewAllRequests() {
    this.roomAllocateService.getAllRoomRequests().subscribe(resp => {
      console.log(resp),
        this.roomRequestList = resp['roomRequestList']
    }, error => {
      console.error(error);
    });
    this.roomRequestList.forEach(element => {
      element.checkInDate = new Date(element.checkInDate),
        element.checkOutDate = new Date(element.checkOutDate)
    });
  }

  viewFeasibleRooms(requestId) {
    let requestDTO = new RequestDTO();
    let roomRequest = new RoomRequest();
    roomRequest.requestId = requestId
    requestDTO.roomRequest = roomRequest;
    this.actingRequestId = requestId;
    this.roomAllocateService.viewFeasibleRooms(requestDTO).subscribe(resp => { console.log(resp), this.roomList = resp['roomsList'] }, error => console.error(error));
  }

  assignRoomToRequest(roomNumber, requestId) {
    let roomReq = new RoomRequest();
    roomReq.requestId = requestId;
    roomReq.roomNumber = roomNumber;
    let requestDTO = new RequestDTO();
    requestDTO.roomRequest = roomReq;
    this.roomAllocateService.assignRoomToRequest(requestDTO).subscribe(resp => console.log(resp));
  }

}
