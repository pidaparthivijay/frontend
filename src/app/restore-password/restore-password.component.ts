import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RestorePwdService } from './restore-pwd.service';
import { User } from '../shared/model/user.model';
import { OneTimePassword } from '../shared/model/one-time-password.model';
import { Constants } from '../shared/model/constants';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {
  restorePwdForm: FormGroup;
  otpForm: FormGroup;
  resetPwdForm: FormGroup;

  actionStatus: boolean;
  rstPwdSuccess: boolean;
  submitReq: boolean=true;
  otpSubmit: boolean;
  rstPwd: boolean;

  submitted: boolean;
  otpSubmitted: boolean;
  passSubmitted: boolean;
  otpValid: boolean;
  constructor(private formBuilder: FormBuilder, private toastrService: ToastrService,
    private restorePwdService: RestorePwdService) { }

  ngOnInit() {
    this.restorePwdForm = this.formBuilder.group({
      userId: ['', Validators.required],
      userName: ['', Validators.required],
      userMail: ['', [Validators.required, Validators.email]],
      userMob: ['', Validators.required],
    });

    this.otpForm = this.formBuilder.group({
      otpFormUserName: ['', Validators.required],
      otpValue: ['', Validators.required],
    });

    this.resetPwdForm = this.formBuilder.group({
      pwdUserName: ['', Validators.required],
      newPassword: ['', Validators.required],
      reNewPassword: ['', Validators.required],
    });
  }
  get f() { return this.restorePwdForm.controls; }
  get of() { return this.otpForm.controls; }
  get pf() { return this.resetPwdForm.controls; }

  restorePwd() {
    this.submitted = true;
    if (this.restorePwdForm.invalid) {
      return;
    }
    let user = new User();
    user.userName = this.restorePwdForm.value.userName;
    user.userMob = this.restorePwdForm.value.userMob;
    user.userId = this.restorePwdForm.value.userId;
    user.userMail = this.restorePwdForm.value.userMail;
    this.restorePwdService.requestOTP(user).subscribe(
      resp => {        
        if (resp) {
          this.actionStatus = true;
          this.submitReq =false;
          this.otpSubmit = true;
          setTimeout(()=>
          this.actionStatus=false
        ,4000)
        }
      }
    );
  }
  otpFormSubmit() {
    this.otpSubmitted = true;
    if (this.otpForm.invalid) {
      return;
    }
    let otp = new OneTimePassword();
    otp.userName = this.otpForm.value.otpFormUserName;
    otp.otpValue = this.otpForm.value.otpValue;
    this.restorePwdService.submitOtp(otp).subscribe(
      resp => {
        if (resp[Constants.ACT_STS]) {
          this.rstPwd = true;
          this.otpSubmit = false;
          this.otpValid=true;
          setTimeout(()=>
            this.otpValid=false
          ,4000)
        }
      }
    );
  }
  resetPwdSubmit() {
    this.passSubmitted = true;
    if (this.resetPwdForm.invalid) {
      return;
    }
    let usr = new User();
    usr.userName = this.resetPwdForm.value.pwdUserName;
    usr.password = this.resetPwdForm.value.newPassword;
    this.restorePwdService.resetPwd(usr).subscribe(
      resp => {
        if (resp[Constants.ACT_STS]) {
          this.rstPwdSuccess = true;
          this.otpSubmit = false;
          this.otpForm.reset();
        }
      }
    );
  }
}
