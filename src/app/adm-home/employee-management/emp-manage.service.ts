import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from 'src/app/shared/model/request-dto.model';
import { RequestMappings } from 'src/app/shared/model/RequestMappings';

@Injectable({
  providedIn: 'root'
})
export class EmpManageService {
  createEmployee(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.EMP_CREATE, requestDTO);
  }

  constructor(private httpClient: HttpClient) { }
}
