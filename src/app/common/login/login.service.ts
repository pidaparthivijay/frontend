import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/shared/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn: boolean = false;
  getLoggedIn() {
    return this.loggedIn;
  }
  setLoggedIn(login) {
    this.loggedIn = login;
  }
  private userDetails = new Subject<User>();
  getUserDetails(): Observable<any> {
    return this.userDetails.asObservable();
  }
  setUserDetails(user: User) {
    this.userDetails.next(user);
  }

  loginServ(user: User): any {
    return this.httpClient.post('/brw/login', user);
  }
  constructor(private httpClient: HttpClient) { }
}
