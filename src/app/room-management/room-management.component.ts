import { Component, OnInit } from '@angular/core';
import { RoomService } from './room.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Room } from '../shared/model/room.model';
import { Constants } from '../shared/model/constants';

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
      this.roomService.createRoomMultiple(room).subscribe(
        resp => console.log(resp),
      );

    } else {
      this.roomService.createRoom(room).subscribe(
        resp => console.log(resp),
      );

    }


  }
  getAllRooms() {
    this.roomService.getAllRooms().subscribe(
      resp => this.roomsList = resp,
    );
    this.roomService.getAllRooms();
  }
  getFreeRooms() {
    this.roomService.getFreeRooms().subscribe(resp => this.roomsList = resp);
  }
  getBookedRooms() {
    this.roomService.getBookedRooms().subscribe(resp => this.roomsList = resp);
  }
  getRoomsByFloor(floorNumber: number) {
    this.roomService.getRoomsByFloor(floorNumber).subscribe(resp => console.log(resp));
    this.roomService.getRoomsByFloor(floorNumber);
  }
  startCreateRoom() {
    this.createRoomMultipleFlag = false;
    document.getElementById("createRoom").style.display = "block";
  }
  startCreateMultipleRooms() {
    this.createRoomMultipleFlag = true;
    document.getElementById("createRoom").style.display = "block";
  }
  createMultipleRooms() {
    this.submitted = true;
    if (this.createRoomForm.invalid) {
      return;
    }
    let room = new Room();
    room.roomType = this.createRoomForm.value.typeOfRoom;
    room.roomModel = this.createRoomForm.value.modelOfRoom;
    room.roomCategory = this.createRoomForm.value.categoryOfRoom;
    room.floorNumber = this.createRoomForm.value.floorNumber;
  }
}
