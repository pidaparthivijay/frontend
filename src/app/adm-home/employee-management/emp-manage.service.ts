import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpManageService {
  createEmployee(employee: import("../../shared/model/employee.model").Employee) {
    return this.httpClient.post('brw/createEmployee', employee);
  }

  constructor(private httpClient: HttpClient) { }
}
