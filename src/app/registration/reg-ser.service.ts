import { Injectable } from '@angular/core';
import { Customer } from '../shared/model/customer.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegSerService {
  regCust(customer: Customer) {
    return this.httpClient.post('/brw/registerCustomer',customer);    
  }

  constructor(private httpClient: HttpClient) { }
}
