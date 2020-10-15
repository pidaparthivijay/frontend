import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from '../common/model/request-dto.model';
import { RequestMappings } from '../common/model/RequestMappings';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  updateDetails(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.UPDATE_PROFILE_CUST, requestDTO);
  }
  getVDMDetails(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.VIEW_VD_MAPPING, requestDTO);
  }

  cancelTour(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.CANCEL_TOUR_BKNG, requestDTO);
  }

  getCustomerTourBookings(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.CUSTOMER_GET_TOUR_BKNGS, requestDTO);
  }

  viewRewardPoints(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.CUSTOMER_VIEW_RWD_POINTS, requestDTO);
  }

  cancelRequest(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.CUSTOMER_CANCEL_ROOM, requestDTO);
  }

  getMyRequestsList(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.CUSTOMER_GET_ALL_REQUESTS, requestDTO);
  }

  getCustomerDetails(requestDTO: RequestDTO): any {
    return this.httpClient.post(RequestMappings.CUSTOMER_DETAILS, requestDTO);
  }

  constructor(private httpClient: HttpClient) { }
}
