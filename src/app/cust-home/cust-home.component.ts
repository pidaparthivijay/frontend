import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { Customer } from '../shared/model/customer.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

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
    customer.userName = this.userName;//'ash_bobj';
    this.custService.getCustomerDetails(customer).subscribe(
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

    this.custService.getMyRequestsList(customer).subscribe(
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
}
