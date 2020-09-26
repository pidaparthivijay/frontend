import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/shared/model/constants';
import { Employee } from 'src/app/shared/model/employee.model';
import { RequestDTO } from 'src/app/shared/model/request-dto.model';
import { EmpManageService } from './emp-manage.service';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.scss']
})
export class EmployeeManagementComponent implements OnInit {
  employeeRegistrationForm: FormGroup;
  loading = false;
  submitted = false;
  actionStatus = false;
  statusMessage: string;
  employee: any;
  employeesList: any;
  constructor(private formBuilder: FormBuilder, private empManageService: EmpManageService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.employeeRegistrationForm = this.formBuilder.group({
      empName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      empGen: ['', Validators.required]
    });
    this.getAllEmployees();
  }
  get f() { return this.employeeRegistrationForm.controls; }

  getAllEmployees() {
    this.empManageService.getAllEmployees().subscribe(
      resp => {
        console.log(resp['employeesList']);
        this.employeesList = resp['employeesList'];
      }, error => {
        console.error(error);
      }
    );
  }

  createEmployee() {
    this.submitted = true;
    if (this.employeeRegistrationForm.invalid) {
      return;
    }
    this.loading = true;
    let employee = new Employee();
    employee.empName = this.employeeRegistrationForm.get('empName').value;
    employee.userName = this.employeeRegistrationForm.get('userName').value;
    employee.empGen = this.employeeRegistrationForm.get('empGen').value;
    employee.email = this.employeeRegistrationForm.get('email').value;
    let requestDTO = new RequestDTO();
    requestDTO.employee = employee;
    this.empManageService.createEmployee(requestDTO).subscribe(
      resp => {
        if (resp[Constants.ACT_STS]) {
          this.actionStatus = true;
          this.employee = resp['employee'];
          this.toastrService.success(Constants.REG_SXS, 'Your employee id is: ' + this.employee.empId);
          this.employeeRegistrationForm.reset();
        } else {
          this.actionStatus = false;
          this.statusMessage = resp[Constants.STS_MSG];
          this.toastrService.error('Because ' + this.statusMessage, Constants.REG_FLR);
        }
      },
      error => console.error(error)
    );
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.f.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

}
