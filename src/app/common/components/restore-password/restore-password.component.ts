import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../../model/constants';
import { OneTimePassword } from '../../model/one-time-password.model';
import { User } from '../../model/user.model';
import { RestorePwdService } from './restore-pwd.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {
  requestOTPForm: FormGroup;
  submitOTPForm: FormGroup;
  resetPwdForm: FormGroup;


  submitReq: boolean = true;
  otpSubmit: boolean;
  rstPwd: boolean;

  submitted: boolean;
  otpSubmitted: boolean;
  passSubmitted: boolean;
  constructor(private formBuilder: FormBuilder, private toastrService: ToastrService,
    private restorePwdService: RestorePwdService) { }

  ngOnInit() {
    this.requestOTPForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userMail: ['', [Validators.required, Validators.email]],
      userMob: ['', Validators.required],
    });

    this.submitOTPForm = this.formBuilder.group({
      otpFormUserName: ['', Validators.required],
      otpValue: ['', Validators.required],
    });

    this.resetPwdForm = this.formBuilder.group({
      pwdUserName: ['', Validators.required],
      newPassword: ['', Validators.required],
      reNewPassword: ['', Validators.required],
    });
  }
  get f() { return this.requestOTPForm.controls; }
  get of() { return this.submitOTPForm.controls; }
  get pf() { return this.resetPwdForm.controls; }

  requestOTP() {
    this.submitted = true;
    if (this.requestOTPForm.invalid) {
      return;
    }
    let user = new User();
    user.userName = this.requestOTPForm.value.userName;
    user.userMob = this.requestOTPForm.value.userMob;
    user.userMail = this.requestOTPForm.value.userMail;
    this.restorePwdService.requestOTP(user).subscribe(
      resp => {
        if (resp) {
          this.toastrService.success(Constants.OTP_MAIL_SENT);
          this.submitReq = false;
          this.otpSubmit = true;
        } else {
          this.toastrService.error("Error Occured Please retry");
        }
      }
    );
  }

  otpFormSubmit() {
    this.otpSubmitted = true;
    if (this.submitOTPForm.invalid) {
      return;
    }
    let otp = new OneTimePassword();
    otp.userName = this.submitOTPForm.value.otpFormUserName;
    otp.otpValue = this.submitOTPForm.value.otpValue;
    console.log(otp);
    this.restorePwdService.submitOtp(otp).subscribe(
      resp => {
        console.log(resp);
        if (resp[Constants.ACT_STS]) {
          this.rstPwd = true;
          this.otpSubmit = false;
          this.toastrService.success(Constants.VALID_OTP, Constants.CHOOSE_PWD);
        } else {
          this.toastrService.error(Constants.INVALID_OTP)
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
        console.log(resp);
        if (resp[Constants.ACT_STS] === Constants.PWD_RESET_SUCCESS) {
          this.toastrService.success(Constants.PWD_RESET_SUCCESS, Constants.NEW_PWD_RESPONSE)
          this.otpSubmit = false;
          this.resetPwdForm.reset();
        } else {
          this.toastrService.error("Error Occured. Please retry");
        }
      }
    );
  }
}
