import { Injectable } from '@angular/core';
import { Customer } from '../shared/model/customer.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  getCustomerDetails(customer: Customer): any {
    return this.httpClient.post('/brw/getCustomerDetails',customer);    
  }

  constructor(private httpClient: HttpClient) { }
}
