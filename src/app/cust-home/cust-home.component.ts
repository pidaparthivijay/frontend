import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { LoginService } from '../common/components/login/login.service';
import { Constants } from '../common/model/constants';
import { Customer } from '../common/model/customer.model';
import { RequestDTO } from '../common/model/request-dto.model';
import { RoomRequest } from '../common/model/room-request';
import { TourPackageRequest } from '../common/model/tour-package-request';
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
  rewardPointsList: any[] = [];
  roomRequestList: any = [];
  userId: number;
  userName: string;
  viewProf: boolean;
  viewRewards: boolean;
  viewRoomReq: boolean;
  viewVDM = false;
  items: MenuItem[];
  viewTourRegistrations: boolean;
  tourPackageRequestList: any;
  vehicleDriverMapping: any;

  constructor(private custService: CustomerService, private toastrService: ToastrService, private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
    this.custName = sessionStorage.getItem('name')
    this.userName = sessionStorage.getItem('userName');
    this.userId = +sessionStorage.getItem('userId');
    this.items = [
      {
        title: 'Register for Room',
        routerLink: 'roomReg',
        icon: 'pi pi-fw pi-home',
        label: 'Room Registration',
        command: (event) => {
          if (event.originalEvent.type === 'click') {
            this.viewProf = false;
            this.viewTourRegistrations = false;
            this.viewRewards = false;
            this.viewRoomReq = false;

          }
        }
      },
      {
        title: 'Request Amenities',
        icon: 'pi pi-fw pi-th-large',
        routerLink: 'requestAmenities',
        label: 'Request Amenities ',
        command: (event) => {
          if (event.originalEvent.type === 'click') {
            this.viewProf = false;
            this.viewTourRegistrations = false;
            this.viewRewards = false;
            this.viewRoomReq = false;

          }
        }
      },
      {
        title: 'Book a Tour Package',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: 'tourBooking',
        label: 'Book Tour Packages',
        command: (event) => {
          if (event.originalEvent.type === 'click') {
            this.viewProf = false;
            this.viewTourRegistrations = false;
            this.viewRewards = false;
            this.viewRoomReq = false;

          }
        }
      },
      {
        label: this.custName,
        icon: 'pi pi-fw pi-user',
        title: 'View ' + this.custName + '\'s Menu',
        items: [

          {
            icon: 'pi pi-fw pi-user-edit',
            label: 'View My Profile',
            title: 'View your details',
            command: (event) => {
              if (event.originalEvent.type === 'click') {
                this.viewProfile();
                this.viewTourRegistrations = false;
                this.viewRewards = false;
                this.viewRoomReq = false;

              }
            }
          },
          {
            title: 'View the Requests raised by you',
            icon: 'pi pi-fw pi-sitemap',
            label: 'View My Requests',
            command: (event) => {
              if (event.originalEvent.type === 'click') {
                this.viewRequests();
                this.viewTourRegistrations = false;
                this.viewRewards = false;
                this.viewProf = false;
              }
            }

          },
          {
            title: 'View the Reward Points you have',
            icon: 'pi pi-fw pi-star-o',
            label: 'View My Reward Points',
            command: (event) => {
              if (event.originalEvent.type === 'click') {
                this.viewRewardPoints();
                this.viewTourRegistrations = false;
                this.viewProf = false;
                this.viewRoomReq = false;

              }
            }
          },
          {
            title: 'View the Tours you have registered -> YTD',
            icon: 'pi pi-fw pi-star-o',
            label: 'View My Tour Registrations',
            command: (event) => {
              if (event.originalEvent.type === 'click') {
                this.viewTourRequests();
                this.viewTourRegistrations = true;
                this.viewProf = false;
                this.viewRewards = false;
                this.viewRoomReq = false;
              }
            }
          },
          {
            title: 'Logout',
            label: 'Logout',
            routerLink: '/logout',
            icon: 'pi pi-fw pi-power-off'
          }
        ]
      },
    ];
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

  updateDetails(customer: Customer) {
    let requestDTO = new RequestDTO();
    requestDTO.customer = customer;
    this.custService.updateDetails(requestDTO).subscribe(
      resp => {
        console.log(resp);
        if (Constants.EXCEPTION_OCCURED != resp[Constants.ACT_STS]) {
          this.toastrService.success("Update Success");
        } else {
          this.toastrService.warning(resp[Constants.ACT_STS]);
        }
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

  updateRoomRequest(roomRequest) {
    let requestDTO = new RequestDTO();
    requestDTO.roomRequest = roomRequest;
    this.custService.updateRoomRequest(requestDTO).subscribe(
      resp => {
        this.toastrService.info(resp[Constants.ACT_STS]);
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
        this.toastrService.info(resp[Constants.ACT_STS]);
      },
      error => console.error(error)
    );
  }

  viewRewardPoints() {
    let user = new User();
    user.userId = this.userId;
    user.userName = this.userName;
    let requestDTO = new RequestDTO();
    requestDTO.user = user;
    this.custService.viewRewardPoints(requestDTO).subscribe(
      resp => {
        console.log(resp);
        this.rewardPointsList = resp['rewardPointsList'];
        this.viewRewards = true;
      },
      error => console.error(error)
    );
  }

  viewTourRequests() {
    let customer = new Customer();
    customer.custName = this.custName;
    customer.userName = this.userName;
    customer.userId = this.userId;
    let requestDTO = new RequestDTO();
    requestDTO.customer = customer;
    this.custService.getCustomerTourBookings(requestDTO).subscribe(
      resp => {
        console.log(resp);
        this.viewTourRegistrations = true;
        this.tourPackageRequestList = resp['tourPackageRequestList'];
      },
      error => console.error(error)
    );
  }

  viewDriverNVehicle(tourPackageRequest: TourPackageRequest) {
    this.viewVDM = true;
    let requestDTO = new RequestDTO();
    requestDTO.tourPackageRequest = tourPackageRequest;
    this.custService.getVDMDetails(requestDTO).subscribe(
      resp => {
        console.log(resp);
        this.viewTourRegistrations = true;
        this.vehicleDriverMapping = resp['vehicleDriverMapping'];
      },
      error => console.error(error)
    );
  }

  cancelTour(tourPackageRequest: TourPackageRequest) {
    let requestDTO = new RequestDTO();
    requestDTO.tourPackageRequest = tourPackageRequest;
    this.custService.cancelTour(requestDTO).subscribe(
      resp => {
        console.log(resp);
        this.viewTourRegistrations = true;
        this.toastrService.info(resp[Constants.ACT_STS]);
        this.viewTourRequests();
      },
      error => console.error(error)
    );
  }
}
