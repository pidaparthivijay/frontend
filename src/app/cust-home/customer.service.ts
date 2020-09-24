import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from '../shared/model/request-dto.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  viewRewardPoints(requestDTO: RequestDTO) {
    return this.httpClient.post('/brw/viewRewardPoints', requestDTO);
  }

  cancelRequest(requestDTO: RequestDTO) {
    return this.httpClient.post('/brw/cancelRequest', requestDTO);
  }

  getMyRequestsList(requestDTO: RequestDTO) {
    return this.httpClient.post('/brw/getMyRequestsList', requestDTO);
  }

  getCustomerDetails(requestDTO: RequestDTO): any {
    return this.httpClient.post('/brw/getCustomerDetails', requestDTO);
  }

  constructor(private httpClient: HttpClient) { }
}
