import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { User } from '../shared/model/user.model';
import { Router, NavigationExtras } from '@angular/router';
import { Constants } from '../shared/model/constants';
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
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) { }
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
        let navigationExtras: NavigationExtras = {
          queryParams: {
            custName: resp['custName'],
            userName: resp['userName'],
            userId: resp['userId']
          }
        };
        if (resp[Constants.STS_MSG] === Constants.CUST_SXS) {
          let navigationExtras: NavigationExtras = {
            queryParams: {
              custName: resp['custName'],
              userName: resp['userName'],
              userId: resp['userId']
            }
          };
          this.router.navigate(['/custWelcome'], navigationExtras);
        } else {
          let navigationExtras: NavigationExtras = {
            queryParams: {
              empName: resp['empName'],
              userName: resp['userName'],
              userId: resp['userId']
            }
          };
          if (resp[Constants.STS_MSG] === Constants.EMP_SXS) {
            this.router.navigate(['/empWelcome'], navigationExtras);
          }
          if (resp[Constants.STS_MSG] === Constants.ADM_SXS) {
            this.router.navigate(['/admWelcome'], navigationExtras);
          }
        }
      },
      error => console.error(error)
    );
  }
}
