import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from '../shared/model/constants';
import { RequestDTO } from '../shared/model/request-dto.model';
import { Room } from '../shared/model/room.model';
import { RoomService } from './room.service';

@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.scss']
})
export class RoomManagementComponent implements OnInit {
  createRoomForm: FormGroup;
  submitted: boolean;
  createRoomMultipleFlag: boolean;
  roomsList: any = [];
  constructor(private formBuilder: FormBuilder, private roomService: RoomService) { }
  constants = Constants;
  ngOnInit() {

    this.createRoomForm = this.formBuilder.group({
      typeOfRoom: ['', Validators.required],
      modelOfRoom: ['', Validators.required],
      categoryOfRoom: ['', Validators.required],
      floorNumber: ['', Validators.required],
      countOfRooms: ['']
    });
  }
  get f() { return this.createRoomForm.controls; }

  createRoom() {
    this.submitted = true;
    if (this.createRoomForm.invalid) {
      return;
    }
    let requestDto = new RequestDTO();
    let room = new Room();
    room.roomType = this.createRoomForm.value.typeOfRoom;
    room.roomModel = this.createRoomForm.value.modelOfRoom;
    room.roomCategory = this.createRoomForm.value.categoryOfRoom;
    room.floorNumber = this.createRoomForm.value.floorNumber;
    room.roomStatus = Constants.VACANT;
    if (this.createRoomMultipleFlag) {
      if (this.createRoomForm.value.countOfRooms == undefined || this.createRoomForm.value.countOfRooms == "" || this.createRoomForm.value.countOfRooms == null) {
        alert("Input count of Rooms");
        return;
      }
      room.countOfRooms = this.createRoomForm.value.countOfRooms;
      requestDto.room = room;
      this.roomService.createRoomMultiple(requestDto).subscribe(
        resp => {
          if (resp['actionStatus'] === Constants.RM_CRT_SXS) {
            this.getAllRooms();
          } else {
            //showerror
          }
        }
      );

    } else {
      requestDto.room = room;
      this.roomService.createRoom(requestDto).subscribe(
        resp => {
          if (resp['actionStatus'] === Constants.RM_CRT_SXS) {
            this.getAllRooms();
          } else {
            //showerror
          }
        }
      );
    }
  }

  getAllRooms() {
    this.roomService.getAllRooms().subscribe(
      resp => this.roomsList = resp,
    );
    this.roomService.getAllRooms();
  }

  getRoomsByStatus(roomStatus: string) {
    let requestDto = new RequestDTO();
    requestDto.roomStatus = roomStatus;
    this.roomService.getRoomsByStatus(requestDto).subscribe(resp => this.roomsList = resp);
  }

  getRoomsByFloor(floorNumber: number) {
    let requestDto = new RequestDTO();
    requestDto.floorNumber = floorNumber;
    this.roomService.getRoomsByFloor(requestDto).subscribe(resp => console.log(resp));
  }

  startCreateRoom() {
    this.createRoomMultipleFlag = false;
    document.getElementById("createRoom").style.display = "block";
  }

  startCreateMultipleRooms() {
    this.createRoomMultipleFlag = true;
    document.getElementById("createRoom").style.display = "block";
  }

}
