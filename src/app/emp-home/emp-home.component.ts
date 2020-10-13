import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { LookupService } from '../adm-home/lookup-management/lookup.service';
import { Constants } from '../common/model/constants';
import { Customer } from '../common/model/customer.model';
import { Employee } from '../common/model/employee.model';
import { RequestDTO } from '../common/model/request-dto.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-emp-home',
  templateUrl: './emp-home.component.html',
  styleUrls: ['./emp-home.component.scss']
})
export class EmpHomeComponent implements OnInit {
  menuList: MenuItem[];
  private viewProf: boolean;
  private viewCustBill: boolean;
  private pendingBillList: any = [];
  private employee: any;
  private genderLookup: any;
  private userName: string;
  private empName: string;
  constructor(private activatedRoute: ActivatedRoute, private lookupService: LookupService, private toastrService: ToastrService, private employeeService: EmployeeService) {

  }
  onGender(event) {
    this.employee.empGen = event.value.lookupValue;
    console.log(event.value.lookupValue);
  }
  ngOnInit() {
    this.empName = sessionStorage.getItem('name');
    this.menuList = [
      {
        label: 'Generate Bill',
        icon: 'pi pi-fw pi-money-bill',
        title: 'Generate the bill',
        command: (event) => {
          if (event.originalEvent.type === 'click') {
            this.generateBill()
          }
        }
      },
      {
        label: 'Vehicle Management',
        icon: 'pi pi-fw pi-minus-circle',
        title: 'Add, Update, Remove Vehicles',
        routerLink: 'vehicleManagement'
      },
      {
        label: 'Handle Tour Requests',
        icon: 'pi pi-fw pi-globe',
        title: 'Assign Vehicles & Drivers',
        routerLink: 'tour'
      },
      {
        label: 'Driver Management',
        icon: 'pi pi-fw pi-compass',
        title: 'Add, Update, Remove Drivers',
        routerLink: 'driverManagement'
      },
      {
        label: this.empName,
        icon: 'pi pi-fw pi-user',
        title: 'View ' + this.empName + ' \'s details',
        command: (event) => {
          if (event.originalEvent.type === 'click') {
            this.viewProfile()
          }
        }
      },
      {
        label: 'Logout',
        title: 'Logout',
        routerLink: '/logout',
        icon: 'pi pi-fw pi-power-off'
      }
    ];
    this.userName = sessionStorage.getItem('userName');
    let requestDto = new RequestDTO();
    requestDto.lookupDefinitionName = Constants.GENDER;
    this.lookupService.getLookupListByDefinition(requestDto).subscribe(
      resp => {
        this.genderLookup = resp['lookupList'];
      },
      error => {
        console.error(error);
      }
    );
  }

  generateBill() {
    this.viewCustBill = true;
    this.viewProf = false;
  }

  viewProfile() {
    this.viewCustBill = false;
    this.pendingBillList = [];
    let employee = new Employee();
    let requestDTO = new RequestDTO();
    employee.userName = this.userName;
    requestDTO.employee = employee;
    this.employeeService.getEmployeeDetails(requestDTO).subscribe(
      resp => {
        console.log(resp);
        this.employee = resp['employee'];
        this.viewProf = true;
      },
      error => { console.error(error) },
    );
  }

  generateBillForMail() {
    var custEmail = (<HTMLInputElement>document.getElementById('custEmail')).value;
    if (custEmail === undefined || custEmail === '' || custEmail == null) {
      this.toastrService.error("Please provide customer email Id");
      return;
    }
    let requestDTO = new RequestDTO();
    let customer = new Customer();
    customer.custEmail = custEmail;
    requestDTO.customer = customer;
    this.employeeService.getPendingBill(requestDTO).subscribe(
      resp => {
        if (resp['actionStatus'] === Constants.INVALID_MAIL) {
          this.toastrService.error(Constants.INVALID_MAIL);
        }
        this.pendingBillList = resp['pendingBillRequests'];
      },
      error => console.error(error)
    );

  }

  getFile() {
    var custEmail = (<HTMLInputElement>document.getElementById('custEmail')).value;
    if (custEmail === undefined || custEmail === '' || custEmail == null) {
      this.toastrService.error("Please provide customer email Id");
      return;
    }
    let requestDTO = new RequestDTO();
    let customer = new Customer();
    customer.custEmail = custEmail;
    requestDTO.customer = customer;
    this.employeeService.generatePDF(requestDTO).subscribe((responseMessage) => {
      console.log(responseMessage);
      if (responseMessage['actionStatus'] === Constants.INVALID_MAIL || responseMessage['size'] == 20) {
        this.toastrService.error(Constants.INVALID_MAIL);
        return;
      }
      let file = new Blob([responseMessage as Blob], { type: "application/pdf" });
      var fileURL = URL.createObjectURL(file);
      const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
      a.href = fileURL;
      a.download = "Bill.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
      error => {
        console.error(error);
      });
  }

  mailBillToUser() {
    var custEmail = (<HTMLInputElement>document.getElementById('custEmail')).value;
    if (custEmail === undefined || custEmail === '' || custEmail == null) {
      this.toastrService.error("Please provide customer email Id");
      return;
    }
    let requestDTO = new RequestDTO();
    let customer = new Customer();
    customer.custEmail = custEmail;
    requestDTO.customer = customer;
    this.employeeService.mailBillToUser(requestDTO).subscribe((responseMessage) => {
      if (responseMessage['actionStatus'] === Constants.INVALID_MAIL) {
        this.toastrService.error(Constants.INVALID_MAIL);
      } else {
        this.toastrService.success(responseMessage[Constants.ACT_STS]);
      }
    },
      error => {
        console.error(error);
      });
  }
}