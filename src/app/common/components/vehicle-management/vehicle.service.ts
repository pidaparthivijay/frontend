import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from '../../model/request-dto.model';
import { RequestMappings } from '../../model/RequestMappings';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  getAllVehicles() {
    return this.httpClient.get(RequestMappings.VEHICLE_VIEW_ALL);
  }

  createVehicle(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.VEHICLE_CREATE, requestDTO);
  }

  toggleDelete(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.VEHICLE_DELETE_TOGGLE, requestDTO);
  }

  updateVehicle(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.VEHICLE_UPDATE, requestDTO);
  }

  constructor(private httpClient: HttpClient) { }
}
