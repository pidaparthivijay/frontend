import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { RoomRegistrationComponent } from './room-registration/room-registration.component';
import { CustHomeComponent } from './cust-home/cust-home.component';
import { AdmHomeComponent } from './adm-home/adm-home.component';
import { EmpHomeComponent } from './emp-home/emp-home.component';
import { RoomManagementComponent } from './room-management/room-management.component';
import { RoomAllocateComponent } from './room-allocate/room-allocate.component';
import { EmployeeManagementComponent } from './adm-home/employee-management/employee-management.component';
const routes: Routes = [
  {
    path: 'admWelcome',
    component: AdmHomeComponent
  },
  {
    path: 'custWelcome',
    component: CustHomeComponent
  },
  {
    path: 'empWelcome',
    component: EmpHomeComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'roomReg',
    component: RoomRegistrationComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'restore',
    component: RestorePasswordComponent
  },
  {
    path: 'roomManagement',
    component: RoomManagementComponent
  },
  {
    path: 'roomAllocate',
    component: RoomAllocateComponent
  },
  {
    path: 'employeeManagement',
    component: EmployeeManagementComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
