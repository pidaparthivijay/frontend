import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../common/components/login/login.service';
import { Customer } from '../common/model/customer.model';
import { RequestDTO } from '../common/model/request-dto.model';
import { RoomRequest } from '../common/model/room-request';
import { User } from '../common/model/user.model';
import { CustomerService } from './customer.service';


@Component({
  selector: 'app-cust-home',
  templateUrl: './cust-home.component.html',
  styleUrls: ['./cust-home.component.scss']
})
export class CustHomeComponent implements OnInit {
  custName: string;
  customer: Customer;
  rewardPointList: any = [];
  roomRequestList: any = [];
  userId: number;
  userName: string;
  viewProf: boolean;
  viewRewards: boolean;
  viewRoomReq: boolean;

  constructor(private custService: CustomerService, private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
    this.custName = sessionStorage.getItem('name')
    this.userName = sessionStorage.getItem('userName');
    this.userId = +sessionStorage.getItem('userId');
  }

  viewProfile() {
    let customer = new Customer();
    customer.custName = this.custName;
    customer.userName = this.userName;
    let requestDTO = new RequestDTO();
    requestDTO.customer = customer;
    console.log(customer);
    this.custService.getCustomerDetails(requestDTO).subscribe(
      resp => {
        console.log(resp);
        this.viewProf = true;
        this.customer = resp['customer'];
        this.customer.custDob = new Date(resp['customer']['custDob'])
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
        console.log(resp);
        this.viewRoomReq = true;
        this.roomRequestList = resp['roomRequestList'];
      },
      error => console.error(error)
    );
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
        console.log(resp);
        this.viewRewards = true;
        this.rewardPointList = resp['rewardPointsList'];
      },
      error => console.error(error)
    );
  }
}
