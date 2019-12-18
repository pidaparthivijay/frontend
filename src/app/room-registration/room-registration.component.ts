import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../shared/model/customer.model';
import { ToastrService } from 'ngx-toastr';
import { RoomRequest } from '../shared/model/room-request';
import { RoomReqService } from './room-req.service';
import { Constants } from '../shared/model/constants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-registration',
  templateUrl: './room-registration.component.html',
  styleUrls: ['./room-registration.component.scss']
})
export class RoomRegistrationComponent implements OnInit {
  roomRequest: RoomRequest;
  actionStatus: boolean;
  roomForm: FormGroup;
  loading = false;
  submitted = false;
  customer: Customer;
  custName: string;
  userName: string;
  userId: number;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private toastrService: ToastrService, private roomReqService: RoomReqService) {
    this.route.queryParams.subscribe(params => {
      this.custName = params['custName'],
        this.userName = params['userName'],
        this.userId = params['userId']
    });
  }

  ngOnInit() {
    this.roomForm = this.formBuilder.group({
      guestName: ['', [Validators.required, Validators.minLength(6)]],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestGen: ['', Validators.required],
      guestCount: ['', Validators.required],
      roomCategory: ['', Validators.required],
      roomType: ['', Validators.required],
      roomModel: ['', Validators.required]
    });
  }
  get f() { return this.roomForm.controls; }
  requestRoom() {
    this.submitted = true;
    if (this.roomForm.invalid) {
      return;
    }
    let roomRequest = new RoomRequest();
    roomRequest.userId = this.userId;
    roomRequest.custName = this.custName;
    roomRequest.guestName = this.roomForm.value.guestName;
    roomRequest.guestGen = this.roomForm.value.guestGen;
    roomRequest.checkInDate = this.roomForm.value.checkInDate;
    roomRequest.checkOutDate = this.roomForm.value.checkOutDate;
    roomRequest.guestCount = this.roomForm.value.guestCount;
    roomRequest.roomCategory = this.roomForm.value.roomCategory;
    roomRequest.roomModel = this.roomForm.value.roomModel;
    roomRequest.roomType = this.roomForm.value.roomType;
    this.roomReqService.requestRoom(roomRequest).subscribe(
      resp => {
        console.log(resp[Constants.ACT_STS]);
        if (resp[Constants.ACT_STS]) {
          this.actionStatus = true;
          this.customer = resp;
          this.toastrService.success(Constants.ROM_REG_SXS, 'Your request id is: ' + this.roomRequest.requestId);
          this.roomForm.reset();
          this.submitted = false;
        }
      }
    );

  }


}
