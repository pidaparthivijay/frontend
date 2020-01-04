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
import { TourManagementComponent } from './adm-home/tour-management/tour-management.component';
import { AmenityManagementComponent } from './adm-home/amenity-management/amenity-management.component';
import { TourBookingComponent } from './cust-home/tour-booking/tour-booking.component';
import { RequestAmenitiesComponent } from './cust-home/request-amenities/request-amenities.component';
import { LookupManagementComponent } from './adm-home/lookup-management/lookup-management.component';
const routes: Routes = [
  {
    path: 'admWelcome',
    component: AdmHomeComponent,
    children: [
      {
        path: 'amenity',
        component: AmenityManagementComponent
      },
      {
        path: 'roomAllocate',
        component: RoomAllocateComponent
      },
      {
        path: 'employeeManagement',
        component: EmployeeManagementComponent
      },
      {
        path: 'roomManagement',
        component: RoomManagementComponent
      },
      {
        path: 'tourPackage',
        component: TourManagementComponent
      },
      {
        path: 'lookupManagement',
        component: LookupManagementComponent
      }
    ]
  }, {
    path: 'empWelcome',
    component: EmpHomeComponent
  },
  {
    path: 'custWelcome',
    component: CustHomeComponent,
    children: [
      {
        path: 'requestAmenities',
        component: RequestAmenitiesComponent
      },
      {
        path: 'tourBooking',
        component: TourBookingComponent
      }]
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
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
