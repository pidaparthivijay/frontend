import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RequestMappings } from '../../model/RequestMappings';
import { User } from '../../model/user.model';

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

  getUserDetails(): Observable<User> {
    return this.userDetails.asObservable();
  }

  setUserDetails(user: User) {
    console.log(user);
    this.userDetails.next(user);
    if (user != null) {
      sessionStorage.setItem('userName', user.userName);
      sessionStorage.setItem('name', user.name);
      sessionStorage.setItem('userId', JSON.stringify(user.userId));
    }

  }

  loginServ(user: User): any {
    return this.httpClient.post(RequestMappings.LOGIN, user);
  }
  constructor(private httpClient: HttpClient) { }
}
