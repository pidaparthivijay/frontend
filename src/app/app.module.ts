import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { AdmHomeComponent } from './adm-home/adm-home.component';
import { AmenityManagementComponent } from './adm-home/amenity-management/amenity-management.component';
import { EmployeeManagementComponent } from './adm-home/employee-management/employee-management.component';
import { LookupManagementComponent } from './adm-home/lookup-management/lookup-management.component';
import { TourManagementComponent } from './adm-home/tour-management/tour-management.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { HomeComponent } from './common/home/home.component';
import { LoginComponent } from './common/login/login.component';
import { LogoutComponent } from './common/logout/logout.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { ContactComponent } from './contact/contact.component';
import { CustHomeComponent } from './cust-home/cust-home.component';
import { RequestAmenitiesComponent } from './cust-home/request-amenities/request-amenities.component';
import { TourBookingComponent } from './cust-home/tour-booking/tour-booking.component';
import { EmpHomeComponent } from './emp-home/emp-home.component';
import { RegSerService } from './registration/reg-ser.service';
import { RegistrationComponent } from './registration/registration.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { RoomAllocateComponent } from './room-allocate/room-allocate.component';
import { RoomManagementComponent } from './room-management/room-management.component';
import { RoomRegistrationComponent } from './room-registration/room-registration.component';
import { WelcomeCustomerComponent } from './welcome-customer/welcome-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    RegistrationComponent,
    RestorePasswordComponent,
    RoomRegistrationComponent,
    WelcomeCustomerComponent,
    CustHomeComponent,
    EmpHomeComponent,
    AdmHomeComponent,
    RoomManagementComponent,
    RoomAllocateComponent,
    EmployeeManagementComponent,
    TourManagementComponent,
    AmenityManagementComponent,
    RequestAmenitiesComponent,
    TourBookingComponent,
    LookupManagementComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DropdownModule,
    MultiSelectModule,
    AppRoutingModule,
    SliderModule,
    FormsModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RegSerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
