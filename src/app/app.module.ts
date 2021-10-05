import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TooltipModule } from 'primeng/tooltip';
import { AdmHomeComponent } from './adm-home/adm-home.component';
import { AmenityManagementComponent } from './adm-home/amenity-management/amenity-management.component';
import { EmployeeManagementComponent } from './adm-home/employee-management/employee-management.component';
import { LookupManagementComponent } from './adm-home/lookup-management/lookup-management.component';
import { RoomAllocateComponent } from './adm-home/room-allocate/room-allocate.component';
import { RoomManagementComponent } from './adm-home/room-management/room-management.component';
import { TourManagementComponent } from './adm-home/tour-management/tour-management.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './common/authguard/auth-guard';
import { ContactComponent } from './common/components/contact/contact.component';
import { DriverManagementComponent } from './common/components/driver-management/driver-management.component';
import { HomeComponent } from './common/components/home/home.component';
import { LoginComponent } from './common/components/login/login.component';
import { LogoutComponent } from './common/components/logout/logout.component';
import { PageNotFoundComponent } from './common/components/page-not-found/page-not-found.component';
import { RegSerService } from './common/components/registration/reg-ser.service';
import { RegistrationComponent } from './common/components/registration/registration.component';
import { RestorePasswordComponent } from './common/components/restore-password/restore-password.component';
import { SidebarComponent } from './common/components/sidebar/sidebar.component';
import { TourComponent } from './common/components/tour/tour.component';
import { VehicleManagementComponent } from './common/components/vehicle-management/vehicle-management.component';
import { CustHomeComponent } from './cust-home/cust-home.component';
import { RequestAmenitiesComponent } from './cust-home/request-amenities/request-amenities.component';
import { RoomRegistrationComponent } from './cust-home/room-registration/room-registration.component';
import { TourBookingComponent } from './cust-home/tour-booking/tour-booking.component';
import { EmpHomeComponent } from './emp-home/emp-home.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    RegistrationComponent,
    RestorePasswordComponent,
    RoomRegistrationComponent,
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
    LogoutComponent,
    PageNotFoundComponent,
    VehicleManagementComponent,
    DriverManagementComponent,
    TourComponent
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
    TabMenuModule,
    RadioButtonModule,
    MenubarModule,
    FileUploadModule,
    BreadcrumbModule,
    TooltipModule,
    CalendarModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RegSerService, AuthGuard, LookupManagementComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
