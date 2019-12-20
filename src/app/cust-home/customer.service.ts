import { Injectable } from '@angular/core';
import { Customer } from '../shared/model/customer.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  viewRewardPoints(userId: any) {
    return this.httpClient.post('/brw/viewRewardPoints', userId);
  }
  cancelRequest(roomRequestId: any) {
    return this.httpClient.post('/brw/cancelRequest', roomRequestId);
  }

  getMyRequestsList(customer: Customer) {
    return this.httpClient.post('/brw/getMyRequestsList', customer);
  }
  getCustomerDetails(customer: Customer): any {
    return this.httpClient.post('/brw/getCustomerDetails', customer);
  }

  constructor(private httpClient: HttpClient) { }
}
