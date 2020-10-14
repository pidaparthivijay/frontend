import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LookupService } from 'src/app/adm-home/lookup-management/lookup.service';
import { Constants } from '../../model/constants';
import { Driver } from '../../model/driver.model';
import { RequestDTO } from '../../model/request-dto.model';
import { DriverService } from './driver.service';

@Component({
  selector: 'app-driver-management',
  templateUrl: './driver-management.component.html',
  styleUrls: ['./driver-management.component.scss']
})
export class DriverManagementComponent implements OnInit {

  driversList: any[] = [];
  location: string;
  locations: any[] = [];
  driverRegistrationForm: FormGroup;
  constructor(private driverService: DriverService, private lookupService: LookupService, private toastrService: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.driverRegistrationForm = this.formBuilder.group({
      driverName: ['', Validators.required],
      driverLicense: ['', Validators.required],
      location: ['', Validators.required]
    });
    this.getAllDrivers();
    this.getLocations();

  }
  getLocations() {
    let requestDTO = new RequestDTO();
    requestDTO.lookupDefinitionName = 'LOCATION';
    this.lookupService.getLookupListByDefinition(requestDTO).subscribe(
      resp => { this.locations = resp['lookupList'] },
      error => {
        console.error(error);

      }
    );
  }
  createDriver() {
    let driver = new Driver();
    driver.driverName = this.driverRegistrationForm.get('driverName').value;
    driver.driverLicense = this.driverRegistrationForm.get('driverLicense').value;
    driver.location = this.location;
    let requestDTO = new RequestDTO();
    requestDTO.driver = driver;
    this.driverService.createDriver(requestDTO).subscribe(resp => {
      if (Constants.SUCCESS === resp[Constants.ACT_STS]) {
        this.toastrService.success(Constants.DRIVER_CRT_SXS);
        this.getAllDrivers();
        this.driverRegistrationForm.reset();
      } else {
        this.toastrService.error(Constants.DRIVER_CRT_FAIL);
      }
    },
      error => {
        this.toastrService.error(Constants.DRIVER_CRT_FAIL, error);
      });
  }
  getAllDrivers() {
    this.driverService.getAllDrivers().subscribe(
      resp => {
        this.driversList = resp['driversList'];
      },
      error => {
        console.error(error);
      }

    );
  }

  toggleDelete(driver) {
    let requestDTO = new RequestDTO();
    requestDTO.driver = driver;
    this.driverService.toggleDelete(requestDTO).subscribe(resp => {
      this.driversList = resp['driverList'];
      this.toastrService.success(resp[Constants.ACT_STS]);
      this.getAllDrivers();
    },
      error => {
        console.error(error),
          this.toastrService.error(error);
      });
  }

  updateDriver(driver: Driver) {
    let requestDTO = new RequestDTO();
    requestDTO.driver = driver;
    this.driverService.updateDriver(requestDTO).subscribe(resp => {
      this.driversList = resp['driverList'];
      if (Constants.UPDATE_SXS === resp[Constants.ACT_STS]) {
        this.toastrService.success(Constants.UPDATE_SXS);
        this.getAllDrivers();
      } else {
        this.toastrService.error(resp[Constants.ACT_STS]);
      }
    },
      error => {
        this.toastrService.error(Constants.UPDATE_FAIL, error)
      });
  }

  onLocation(event) {
    this.driverRegistrationForm.patchValue({
      location: event.value.lookupValue,
    });
    this.location = event.value.lookupValue;
    return event.value.lookupValue;
  }
}
