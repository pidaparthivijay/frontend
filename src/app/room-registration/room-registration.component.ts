import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LookupService } from '../adm-home/lookup-management/lookup.service';
import { Constants } from '../shared/model/constants';
import { Customer } from '../shared/model/customer.model';
import { RoomRequest } from '../shared/model/room-request';
import { RoomReqService } from './room-req.service';

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
  roomTypes: any = [];
  guestCounts: any = [];
  genders: any = [];
  roomModels: any = [];
  roomCategoryList: any = [];
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private toastrService: ToastrService, private roomReqService: RoomReqService,
    private lookupService: LookupService) {
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
    this.lookupService.getLookupListByDefinition(Constants.ROOM_TYPE).subscribe(
      resp => {
        this.roomTypes = resp;
      }
    );
    this.lookupService.getLookupListByDefinition(Constants.GENDER).subscribe(
      resp => {
        this.genders = resp;
      }
    );
    this.lookupService.getLookupListByDefinition(Constants.ROOM_CATEGORY).subscribe(
      resp => {
        this.roomCategoryList = resp;
      }
    );
    this.lookupService.getLookupListByDefinition(Constants.ROOM_MODEL).subscribe(
      resp => {
        this.roomModels = resp;
      }
    );
    this.lookupService.getLookupListByDefinition(Constants.GUEST_COUNT).subscribe(
      resp => {
        this.guestCounts = resp;
      }
    );


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
    roomRequest.guestCount = +this.roomForm.value.guestCount;
    roomRequest.roomCategory = this.roomForm.value.roomCategory;
    roomRequest.roomModel = this.roomForm.value.roomModel;
    roomRequest.roomType = this.roomForm.value.roomType;
    this.roomReqService.requestRoom(roomRequest).subscribe(
      resp => {
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
