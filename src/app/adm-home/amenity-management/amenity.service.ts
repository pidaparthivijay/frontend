import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from 'src/app/shared/model/request-dto.model';
import { RequestMappings } from 'src/app/shared/model/RequestMappings';

@Injectable({
  providedIn: 'root'
})
export class AmenityService {

  createAmenity(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.AMENITY_CREATE, requestDTO);
  }

  toggleDelete(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.AMENITY_DELETE_TOGGLE, requestDTO);
  }

  updatePrice(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.AMENITY_PRICE_UPDATE, requestDTO);
  }

  requestAmenity(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.AMENITY_REQUEST, requestDTO);
  }

  getAllAmenities() {
    return this.httpClient.get(RequestMappings.AMENITY_VIEW_ALL);
  }
  constructor(private httpClient: HttpClient) { }
}
