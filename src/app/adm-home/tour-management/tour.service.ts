import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from 'src/app/common/model/request-dto.model';
import { RequestMappings } from 'src/app/common/model/RequestMappings';


@Injectable({
  providedIn: 'root'
})
export class TourService {

  getFeasibleVehiclesAndDrivers(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.FEASIBLE_VEHICLES_DRIVERS, requestDTO);
  }

  assignVehiclesAndDrivers(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.TOUR_BKNG_ASSIGN, requestDTO);
  }

  getAllBookedTours() {
    return this.httpClient.get(RequestMappings.TOUR_BKNG_VIEW_ALL);
  }

  createTourPackage(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.TOUR_PKG_CREATE, requestDTO);
  }

  updateTourPackage(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.TOUR_PKG_UPDATE, requestDTO);
  }

  toggleDelete(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.TOUR_PKG_DELETE_TOGGLE, requestDTO);
  }

  getAllTourPackages() {
    return this.httpClient.get(RequestMappings.TOUR_PKG_VIEW_ALL);
  }

  bookTourPackage(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.TOUR_PKG_BOOK, requestDTO);
  }
  constructor(private httpClient: HttpClient) { }
}
