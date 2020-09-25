import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.setLoggedIn(false);
    this.loginService.setUserDetails(null);
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('userName');
  }

}
