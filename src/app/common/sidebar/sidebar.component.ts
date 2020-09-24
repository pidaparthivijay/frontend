import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private loginService: LoginService) { }
  loggedIn: boolean = false;
  ngOnInit() {
    this.loginService.getUserDetails().subscribe(
      response => {
        if (response) {
          this.loggedIn = true;
        }
      }
    );
  }

}
