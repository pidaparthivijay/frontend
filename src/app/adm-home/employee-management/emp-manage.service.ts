import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from 'src/app/shared/model/request-dto.model';

@Injectable({
  providedIn: 'root'
})
export class EmpManageService {
  createEmployee(requestDTO: RequestDTO) {
    return this.httpClient.post('brw/createEmployee', requestDTO);
  }

  constructor(private httpClient: HttpClient) { }
}
