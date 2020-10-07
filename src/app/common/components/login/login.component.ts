import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../../model/constants';
import { User } from '../../model/user.model';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  customer: any;
  loggedUser: User;
  constructor(private formBuilder: FormBuilder, private router: Router, private toastrService: ToastrService, private loginService: LoginService) { }
  get f() { return this.loginForm.controls; }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      custPass: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    let user = new User();
    user.userName = this.loginForm.get('username').value;
    user.password = this.loginForm.get('custPass').value;
    this.loginService.loginServ(user).subscribe(
      resp => {
        console.log(resp);
        let user = new User();
        user.userId = resp['userId'];
        user.userName = resp['userName'];
        switch (resp[Constants.STS_MSG]) {
          case Constants.CUST_SXS:
            user.name = resp['custName'];
            user.userType = Constants.CUSTOMER;
            this.loginService.setLoggedIn(true);
            break;
          case Constants.EMP_SXS:
            user.name = resp['empName'];
            user.userType = Constants.EMPLOYEE;
            this.loginService.setLoggedIn(true);
            break;
          case Constants.ADM_SXS:
            user.name = resp['admName'];
            user.userType = Constants.ADMIN;
            this.loginService.setLoggedIn(true);
            break;
          case Constants.ADM_SXS:
            user.name = resp['admName'];
            user.userType = Constants.ADMIN;
            this.loginService.setLoggedIn(true);
            break;
          default:
            this.toastrService.error(Constants.INVALID);
            this.loginForm.reset();
            this.loginService.setLoggedIn(false);
            user = null;
            break;
        }
        this.loginService.setUserDetails(user);
        switch (resp[Constants.STS_MSG]) {
          case Constants.CUST_SXS:
            this.router.navigate(['/custWelcome']);
            break;
          case Constants.EMP_SXS:
            this.router.navigate(['/empWelcome']);
            break;
          case Constants.ADM_SXS:
            this.router.navigate(['/admWelcome']);
            break;
          default:
            this.toastrService.error(Constants.INVALID);
            this.loginForm.reset();
            this.loginService.setLoggedIn(false);
            break;
        }
      },
      error => console.error(error)
    );
  }
}
