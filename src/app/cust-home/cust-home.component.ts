import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Customer } from '../shared/model/customer.model';
import { RequestDTO } from '../shared/model/request-dto.model';
import { RoomRequest } from '../shared/model/room-request';
import { User } from '../shared/model/user.model';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-cust-home',
  templateUrl: './cust-home.component.html',
  styleUrls: ['./cust-home.component.scss']
})
export class CustHomeComponent implements OnInit {
  custName: string;
  userName: string;
  userId: number;
  customer: Customer;
  viewProf: boolean;
  viewRoomReq: boolean;
  viewRewards: boolean;
  rewardPointList: any = [];
  roomRequestList: any = [];

  constructor(private custService: CustomerService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.custName = params['custName'],
        this.userName = params['userName'],
        this.userId = params['userId']
    });
  }
  ngOnInit() {
  }
  viewProfile() {
    let customer = new Customer();
    customer.custName = this.custName;//'AshokBobby';
    customer.userName = this.userName;//'ash_bobj'
    let requestDTO = new RequestDTO();
    requestDTO.customer = customer;
    this.custService.getCustomerDetails(requestDTO).subscribe(
      resp => {
        this.viewProf = true;
        this.customer = resp;
        this.customer.custDob = new Date(resp['custDob'])
      },
      error => console.error(error)
    );
  }
  viewRequests() {
    let customer = new Customer();
    customer.custName = this.custName;
    customer.userName = this.userName;
    customer.userId = this.userId;
    let requestDTO = new RequestDTO();
    requestDTO.customer = customer;
    this.custService.getMyRequestsList(requestDTO).subscribe(
      resp => {
        this.viewRoomReq = true;
        this.roomRequestList = resp;
      },
      error => console.error(error)
    );
  }
  registerRoom() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        custName: this.custName,
        userName: this.userName,
        userId: this.userId
      }
    };
    this.router.navigate(['/roomReg'], navigationExtras);
  }
  requestAmenities() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        custName: this.custName,
        userName: this.userName,
        userId: this.userId
      }
    };
    this.router.navigate(['/custWelcome/requestAmenities'], navigationExtras);
  }
  tourBooking() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        custName: this.custName,
        userName: this.userName,
        userId: this.userId
      }
    };
    this.router.navigate(['/custWelcome/tourBooking'], navigationExtras);
  }
  cancelRequest(roomRequestId) {
    let roomRequest = new RoomRequest();
    roomRequest.requestId = roomRequestId;
    let requestDTO = new RequestDTO();
    requestDTO.roomRequest = roomRequest;
    this.custService.cancelRequest(requestDTO).subscribe(
      resp => {
        console.log(resp);
        alert(resp);
      },
      error => console.error(error)
    );
  }

  viewRewardPoints() {
    let user = new User();
    user.userId = this.userId;
    let requestDTO = new RequestDTO();
    requestDTO.user = user;
    this.custService.viewRewardPoints(requestDTO).subscribe(
      resp => {
        this.viewRewards = true;
        this.rewardPointList = resp;
      },
      error => console.error(error)
    );
  }
}
