import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmHomeComponent } from './adm-home/adm-home.component';
import { AmenityManagementComponent } from './adm-home/amenity-management/amenity-management.component';
import { EmployeeManagementComponent } from './adm-home/employee-management/employee-management.component';
import { LookupManagementComponent } from './adm-home/lookup-management/lookup-management.component';
import { RoomAllocateComponent } from './adm-home/room-allocate/room-allocate.component';
import { RoomManagementComponent } from './adm-home/room-management/room-management.component';
import { TourManagementComponent } from './adm-home/tour-management/tour-management.component';
import { AuthGuard } from './common/authguard/auth-guard';
import { ContactComponent } from './common/components/contact/contact.component';
import { HomeComponent } from './common/components/home/home.component';
import { LoginComponent } from './common/components/login/login.component';
import { LogoutComponent } from './common/components/logout/logout.component';
import { PageNotFoundComponent } from './common/components/page-not-found/page-not-found.component';
import { RegistrationComponent } from './common/components/registration/registration.component';
import { RestorePasswordComponent } from './common/components/restore-password/restore-password.component';
import { CustHomeComponent } from './cust-home/cust-home.component';
import { RequestAmenitiesComponent } from './cust-home/request-amenities/request-amenities.component';
import { RoomRegistrationComponent } from './cust-home/room-registration/room-registration.component';
import { TourBookingComponent } from './cust-home/tour-booking/tour-booking.component';
import { EmpHomeComponent } from './emp-home/emp-home.component';

const routes: Routes = [
  {
    path: 'admWelcome',
    component: AdmHomeComponent,
    canActivate: [AuthGuard],
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
    component: EmpHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'custWelcome',
    component: CustHomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'roomReg',
        component: RoomRegistrationComponent
      },
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
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
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
    path: '**',
    component: PageNotFoundComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
