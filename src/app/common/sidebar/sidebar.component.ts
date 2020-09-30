import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/shared/model/constants';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private loginService: LoginService) { }
  custLogin: boolean = false;
  empLogin: boolean = false;
  admLogin: boolean = false;
  ngOnInit() {
    this.loginService.getUserDetails().subscribe(
      response => {
        if (response) {
          if (response['userType'] === Constants.CUSTOMER) {
            this.custLogin = true;
            this.admLogin = false;
            this.empLogin = false;
          } else if (response['userType'] === Constants.EMPLOYEE) {
            this.empLogin = true;
            this.custLogin = false;
            this.admLogin = false;
          } else if (response['userType'] === Constants.ADMIN) {
            this.admLogin = true;
            this.empLogin = false;
            this.custLogin = false;
          }
        } else {
          this.admLogin = this.custLogin = this.empLogin = false;
        }

      }
    );
  }

}
