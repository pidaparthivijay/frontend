import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from '../shared/model/request-dto.model';
@Injectable({
  providedIn: 'root'
})
export class RegSerService {
  regCust(requestDTO: RequestDTO) {
    return this.httpClient.post('/brw/registerCustomer', requestDTO);
  }

  constructor(private httpClient: HttpClient) { }
}
