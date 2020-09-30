import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupService } from '../adm-home/lookup-management/lookup.service';
import { Constants } from '../shared/model/constants';
import { Customer } from '../shared/model/customer.model';
import { Employee } from '../shared/model/employee.model';
import { Lookup } from '../shared/model/lookup.model';
import { RequestDTO } from '../shared/model/request-dto.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-emp-home',
  templateUrl: './emp-home.component.html',
  styleUrls: ['./emp-home.component.scss']
})
export class EmpHomeComponent implements OnInit {

  private userId: number;
  private viewProf: boolean;
  private viewCustBill: boolean;
  private requestList: any = [];
  private employee: any;
  private genderLookup: any;
  private userName: string;
  @ViewChild('pdfViewer') pdfViewer: ElementRef;
  constructor(private route: ActivatedRoute, private lookupService: LookupService, private router: Router, private employeeService: EmployeeService) {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId']
    });
  }
  onGender(event) {
    this.employee.empGen = event.value.lookupValue;
    console.log(event.value.lookupValue);
  }
  ngOnInit() {
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
    let requestDTO = new RequestDTO();
    let customer = new Customer();
    customer.custEmail = custEmail;
    requestDTO.customer = customer;
    this.employeeService.getPendingBill(requestDTO).subscribe(
      resp => {
        console.log(resp);
        this.requestList = resp['pendingBillRequests'];
      },
      error => console.error(error)
    );

  }

  getFile() {
    var custEmail = (<HTMLInputElement>document.getElementById('custEmail')).value;
    let requestDTO = new RequestDTO();
    let customer = new Customer();
    customer.custEmail = custEmail;
    requestDTO.customer = customer;
    this.employeeService.generatePDF(requestDTO).subscribe((responseMessage) => {
      console.log(responseMessage);
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
    let requestDTO = new RequestDTO();
    let customer = new Customer();
    customer.custEmail = custEmail;
    requestDTO.customer = customer;
    this.employeeService.mailBillToUser(requestDTO).subscribe((responseMessage) => {
      console.log(responseMessage);
    },
      error => {
        console.error(error);
      });
  }
}