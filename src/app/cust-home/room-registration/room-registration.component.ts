import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LookupService } from 'src/app/adm-home/lookup-management/lookup.service';
import { Constants } from 'src/app/common/model/constants';
import { Customer } from 'src/app/common/model/customer.model';
import { RequestDTO } from 'src/app/common/model/request-dto.model';
import { RoomRequest } from 'src/app/common/model/room-request';
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
  roomCategory;
  roomModel;
  guestGen;
  guestCount;
  roomType;
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
    let requestDTO = new RequestDTO();

    requestDTO.lookupDefinitionName = Constants.ROOM_TYPE;
    this.lookupService.getLookupListByDefinition(requestDTO).subscribe(
      resp => {
        this.roomTypes = resp['lookupList'];
      }
    );

    requestDTO.lookupDefinitionName = Constants.GENDER;
    this.lookupService.getLookupListByDefinition(requestDTO).subscribe(
      resp => {
        this.genders = resp['lookupList'];
      }
    );

    requestDTO.lookupDefinitionName = Constants.ROOM_CATEGORY;
    this.lookupService.getLookupListByDefinition(requestDTO).subscribe(
      resp => {
        this.roomCategoryList = resp['lookupList'];
      }
    );

    requestDTO.lookupDefinitionName = Constants.ROOM_MODEL;
    this.lookupService.getLookupListByDefinition(requestDTO).subscribe(
      resp => {
        this.roomModels = resp['lookupList'];
      }
    );

    requestDTO.lookupDefinitionName = Constants.GUEST_COUNT;
    this.lookupService.getLookupListByDefinition(requestDTO).subscribe(
      resp => {
        this.guestCounts = resp['lookupList'];
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
    //roomRequest.userId = this.userId;
    roomRequest.userName = this.userName;
    roomRequest.custName = this.custName;
    roomRequest.guestName = this.roomForm.value.guestName;
    roomRequest.guestGen = this.guestGen.lookupValue;
    roomRequest.checkInDate = this.roomForm.value.checkInDate;
    roomRequest.checkOutDate = this.roomForm.value.checkOutDate;
    roomRequest.guestCount = +this.guestCount.lookupValue;
    roomRequest.roomCategory = this.roomCategory.lookupValue;
    roomRequest.roomModel = this.roomModel.lookupValue;
    roomRequest.roomType = this.roomType.lookupValue;
    let requestDto = new RequestDTO();
    requestDto.roomRequest = roomRequest;
    this.roomReqService.requestRoom(requestDto).subscribe(
      resp => {
        console.log(resp);
        if (resp[Constants.ACT_STS]) {
          this.actionStatus = true;
          this.customer = resp['customer'];
          this.toastrService.success(Constants.ROM_REG_SXS, 'Your request id is: ' + this.roomRequest.requestId);
          this.roomForm.reset();
          this.submitted = false;
        }
      },
      error => {
        console.error(error);
      }
    );
  }

}
