import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OneTimePassword } from '../shared/model/one-time-password.model';
import { User } from '../shared/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class RestorePwdService {
  requestOTP(user: User): any {
    return this.httpClient.post('brw/requestOTP', user);
  }

  resetPwd(user: User): any {
    return this.httpClient.post('brw/resetPwd', user);
  }

  submitOtp(oneTimePassword: OneTimePassword): any {
    return this.httpClient.post('brw/submitOtp', oneTimePassword);
  }

  constructor(private httpClient: HttpClient) { }
}
