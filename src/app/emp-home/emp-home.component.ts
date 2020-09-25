import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../shared/model/customer.model';
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
  constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService) {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId']
    });
  }

  ngOnInit() {
  }

  generateBill() {
    this.viewCustBill = true;
    this.viewProf = false;
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
}
