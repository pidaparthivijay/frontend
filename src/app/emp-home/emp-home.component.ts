import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
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
  private roomRequestList: any = [];
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
    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     custEmail: custEmail,
    //   }
    // };
    this.employeeService.getPendingBill(custEmail).subscribe(
      resp => {
        this.roomRequestList = resp;
      },
      error => console.error(error)
    );
  }
}
