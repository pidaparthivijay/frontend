import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from '../../model/request-dto.model';
import { RequestMappings } from '../../model/RequestMappings';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  getAllDrivers() {
    return this.httpClient.get(RequestMappings.DRIVER_VIEW_ALL);
  }

  createDriver(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.DRIVER_CREATE, requestDTO);
  }

  toggleDelete(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.DRIVER_DELETE_TOGGLE, requestDTO);
  }

  updateDriver(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.DRIVER_UPDATE, requestDTO);
  }

  constructor(private httpClient: HttpClient) { }
}
