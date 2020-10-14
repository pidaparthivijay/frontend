import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/adm-home/tour-management/tour.service';
import { Driver } from '../../model/driver.model';
import { RequestDTO } from '../../model/request-dto.model';
import { TourPackageRequest } from '../../model/tour-package-request';
import { Vehicle } from '../../model/vehicle';
import { VehicleDriverMapping } from '../../model/vehicle-driver-mapping';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
  tourPackageRequestList: any[] = [];
  driversList: any;
  vehiclesList: any;
  selectedDriver: string;
  selectedVehicle: string;
  tourRequest: TourPackageRequest;
  constructor(private tourService: TourService) { }

  ngOnInit(): void {
    this.getAllTourRequests();
  }

  getAllTourRequests() {
    this.tourService.getAllBookedTours().subscribe(
      resp => {
        console.log(resp['tourPackageRequestList'])
        this.tourPackageRequestList = resp['tourPackageRequestList']
      },
      error => {
        console.error(error);
      }
    );
  }

  getFeasibleVehiclesAndDrivers(tourRequest: TourPackageRequest) {
    let requestDTO = new RequestDTO();
    requestDTO.tourPackageRequest = tourRequest;
    this.tourRequest = tourRequest;
    this.tourService.getFeasibleVehiclesAndDrivers(requestDTO).subscribe(
      resp => {
        console.log(resp);
        this.vehiclesList = resp['vehiclesList'],
          this.driversList = resp['driversList']
      },
      error => {
        console.error(error);
      }
    );
  }

  assignVehiclesAndDrivers(tourRequest: TourPackageRequest) {
    let requestDTO = new RequestDTO();
    let vehDriMapping = new VehicleDriverMapping();
    vehDriMapping.assignedDate = tourRequest.startDate;
    vehDriMapping.tourPackageRequestId = tourRequest.tourPackageRequestId;
    vehDriMapping.driverLicense = this.selectedDriver;
    vehDriMapping.vehicleRegNum = this.selectedVehicle;
    requestDTO.vehicleDriverMapping = vehDriMapping;
    console.log(vehDriMapping);
    console.log(requestDTO);
    this.tourService.assignVehiclesAndDrivers(requestDTO).subscribe(
      resp => {
        console.log(resp);
      },
      error => {
        console.error(error);
      }
    );
  }

}
