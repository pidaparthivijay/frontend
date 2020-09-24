import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from '../shared/model/request-dto.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  getPendingBill(requestDTO: RequestDTO) {
    return this.httpClient.post('/brw/getPendingBillRequests', requestDTO);
  }

  constructor(private httpClient: HttpClient) { }
}
