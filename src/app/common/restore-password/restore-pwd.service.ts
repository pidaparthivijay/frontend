import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OneTimePassword } from 'src/app/shared/model/one-time-password.model';
import { RequestMappings } from 'src/app/shared/model/RequestMappings';
import { User } from 'src/app/shared/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class RestorePwdService {
  requestOTP(user: User): any {
    return this.httpClient.post(RequestMappings.OTP_REQUEST, user);
  }

  resetPwd(user: User): any {
    return this.httpClient.post(RequestMappings.RESET_PWD, user);
  }

  submitOtp(oneTimePassword: OneTimePassword): any {
    return this.httpClient.post(RequestMappings.OTP_SUBMIT, oneTimePassword);
  }

  constructor(private httpClient: HttpClient) { }
}
