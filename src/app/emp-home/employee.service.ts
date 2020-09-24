import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from '../shared/model/request-dto.model';
import { RequestMappings } from '../shared/model/RequestMappings';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  getPendingBill(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.PENDING_BILL_VIEW, requestDTO);
  }

  constructor(private httpClient: HttpClient) { }
}
