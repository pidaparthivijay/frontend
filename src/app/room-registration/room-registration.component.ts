import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../shared/model/customer.model';
import { ToastrService } from 'ngx-toastr';
import { RoomRequest } from '../shared/model/room-request';
import { RoomReqService } from './room-req.service';
import { Constants } from '../shared/model/constants';

@Component({
  selector: 'app-room-registration',
  templateUrl: './room-registration.component.html',
  styleUrls: ['./room-registration.component.scss']
})
export class RoomRegistrationComponent implements OnInit {
  roomRequest:RoomRequest;
  actionStatus:boolean;
  roomForm: FormGroup;
  loading = false;
  submitted = false;
  customer: Customer;  
  constructor(private formBuilder: FormBuilder,private toastrService: ToastrService,private roomReqService: RoomReqService) { }

  ngOnInit() {
    this.roomForm = this.formBuilder.group({
      guestName: ['', [Validators.required, Validators.minLength(6)]],
      checkInDate: ['',Validators.required],
      checkOutDate: ['', Validators.required],
      guestGen: ['', Validators.required],
      guestCount: ['', Validators.required],
      typeOfRooms: ['', Validators.required],
      roomCount: ['', Validators.required]      
    });

  }
  get f() { return this.roomForm.controls; }
  requestRoom(){
  this.submitted = true;
  if (this.roomForm.invalid) {
    return;
  }
  let roomRequest= new RoomRequest();
  roomRequest.userId=this.roomForm.value.userId;
  roomRequest.custName=this.roomForm.value.custName;
  roomRequest.guestName=this.roomForm.value.guestName;
  roomRequest.guestGen=this.roomForm.value.guestGen;
  roomRequest.checkInDate=this.roomForm.value.checkInDate;
  roomRequest.checkOutDate=this.roomForm.value.checkOutDate;
  roomRequest.guestCount=this.roomForm.value.guestCount;
  roomRequest.roomCount=this.roomForm.value.roomCount;
  roomRequest.typeOfRooms=this.roomForm.value.typeOfRooms;
  this.roomReqService.requestRoom(roomRequest).subscribe(
    resp=>{
      if(resp[Constants.ACT_STS]){
        this.actionStatus=true;
        this.customer=resp;
        this.toastrService.success(Constants.ROM_REG_SXS,'Your request id is: '+this.roomRequest.requestId);
        this.roomForm.reset();
        this.submitted=false;     
      }
    }
  );

}

  
}
