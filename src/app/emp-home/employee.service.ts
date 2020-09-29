import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from '../shared/model/request-dto.model';
import { RequestMappings } from '../shared/model/RequestMappings';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  getEmployeeDetails(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.EMPLOYEE_VIEW_DETAILS, requestDTO);
  }

  updateEmployee(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.EMPLOYEE_UPDATE, requestDTO);
  }

  generatePDF(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.PENDING_BILL_PDF, requestDTO,
      { responseType: 'blob' });
  }
  getPendingBill(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.PENDING_BILL_VIEW, requestDTO);
  }

  constructor(private httpClient: HttpClient) { }
}
