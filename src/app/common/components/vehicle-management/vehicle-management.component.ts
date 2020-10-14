import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LookupService } from 'src/app/adm-home/lookup-management/lookup.service';
import { Constants } from '../../model/constants';
import { RequestDTO } from '../../model/request-dto.model';
import { Vehicle } from '../../model/vehicle';
import { VehicleService } from './vehicle.service';

@Component({
  selector: 'app-vehicle-management',
  templateUrl: './vehicle-management.component.html',
  styleUrls: ['./vehicle-management.component.scss']
})
export class VehicleManagementComponent implements OnInit {


  vehiclesList: any[] = [];
  vehicleRegistrationForm: FormGroup;
  locations: any[] = [];
  vehicleTypes: any[] = [];
  vehicleType: string;
  location: string;

  constructor(private vehicleService: VehicleService, private toastrService: ToastrService, private formBuilder: FormBuilder, private lookupService: LookupService) { }

  ngOnInit(): void {
    this.vehicleRegistrationForm = this.formBuilder.group({
      vehicleName: ['', Validators.required],
      regNum: ['', Validators.required],
      vehicleType: ['', Validators.required],
      location: ['', Validators.required]
    });

    this.getAllVehicles();
    this.getLocations();
    this.getVehicleTypes();
  }

  createVehicle() {
    let vehicle = new Vehicle();
    vehicle.vehicleName = this.vehicleRegistrationForm.get('vehicleName').value;
    vehicle.regNum = this.vehicleRegistrationForm.get('regNum').value;
    vehicle.location = this.location;
    vehicle.vehicleType = this.vehicleType;
    let requestDTO = new RequestDTO();
    requestDTO.vehicle = vehicle;
    this.vehicleService.createVehicle(requestDTO).subscribe(resp => {
      if (Constants.SUCCESS === resp[Constants.ACT_STS]) {
        this.toastrService.success(Constants.VEHICLE_CRT_SXS);
        this.getAllVehicles();
        this.vehicleRegistrationForm.reset();
      } else {
        this.toastrService.error(Constants.VEHICLE_CRT_FAIL);
      }
    },
      error => {
        this.toastrService.error(Constants.VEHICLE_CRT_FAIL, error);
      });
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
  getVehicleTypes() {
    let requestDTO = new RequestDTO();
    requestDTO.lookupDefinitionName = 'VEHICLE_TYPE';
    this.lookupService.getLookupListByDefinition(requestDTO).subscribe(
      resp => { this.vehicleTypes = resp['lookupList'] },
      error => {
        console.error(error);

      }
    );
  }
  getAllVehicles() {
    this.vehicleService.getAllVehicles().subscribe(
      resp => {
        this.vehiclesList = resp['vehiclesList'];
      },
      error => {
      }
    );
  }
  toggleDelete(vehicle: Vehicle) {
    let requestDTO = new RequestDTO();
    requestDTO.vehicle = vehicle;
    this.vehicleService.toggleDelete(requestDTO).subscribe(resp => {
      this.vehiclesList = resp['vehiclesList'];
      this.toastrService.success(resp[Constants.ACT_STS]);
      this.getAllVehicles();
    },
      error => {
        console.error(error),
          this.toastrService.error(error);
      });
  }

  onLocation(event) {
    this.vehicleRegistrationForm.patchValue({
      location: event.value.lookupValue,
    });
    this.location = event.value.lookupValue;
    return event.value.lookupValue;
  }

  onVehicleType(event) {
    this.vehicleRegistrationForm.patchValue({
      vehicleType: event.value.lookupValue,
    });
    this.vehicleType = event.value.lookupValue;
    return event.value.lookupValue;
  }

  updateVehicle(vehicle: Vehicle) {
    let requestDTO = new RequestDTO();
    requestDTO.vehicle = vehicle;
    this.vehicleService.updateVehicle(requestDTO).subscribe(resp => {
      this.vehiclesList = resp['vehiclesList'];
      if (Constants.UPDATE_SXS === resp[Constants.ACT_STS]) {
        this.toastrService.success(Constants.UPDATE_SXS);
        this.getAllVehicles();
      } else {
        this.toastrService.error(resp[Constants.ACT_STS]);
      }
    },
      error => {
        this.toastrService.error(Constants.UPDATE_FAIL, error)
      });
  }
}
