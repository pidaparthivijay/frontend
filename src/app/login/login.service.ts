import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginServ(user: User): any {
    return this.httpClient.post('/brw/login', user);
  }
  constructor(private httpClient: HttpClient) { }
}
