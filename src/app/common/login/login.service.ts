import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RequestMappings } from 'src/app/shared/model/RequestMappings';
import { User } from 'src/app/shared/model/user.model';
import { environment } from 'src/environments/environment';

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
    this.userDetails.next(user);
    sessionStorage.setItem('userName', user.userName);
    sessionStorage.setItem('name', user.name);
    sessionStorage.setItem('userId', JSON.stringify(user.userId));
  }

  loginServ(user: User): any {
    return this.httpClient.post(RequestMappings.LOGIN, user);
  }
  constructor(private httpClient: HttpClient) { }
}
