import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  getPendingBill(custEmail: string) {
    return this.httpClient.post('/brw/getPendingBillRequests', custEmail);
  }

  constructor(private httpClient: HttpClient) { }
}
