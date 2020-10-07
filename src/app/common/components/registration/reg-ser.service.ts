import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from '../../model/request-dto.model';
import { RequestMappings } from '../../model/RequestMappings';

@Injectable({
  providedIn: 'root'
})
export class RegSerService {
  regCust(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.CUSTOMER_REGISTER, requestDTO);
  }

  constructor(private httpClient: HttpClient) { }
}
