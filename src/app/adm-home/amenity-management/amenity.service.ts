import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from 'src/app/shared/model/request-dto.model';

@Injectable({
  providedIn: 'root'
})
export class AmenityService {

  createAmenity(requestDTO: RequestDTO) {
    return this.httpClient.post('brw/createAmenity', requestDTO);
  }

  toggleDelete(requestDTO: RequestDTO) {
    return this.httpClient.post('brw/toggleDeleteAmenity', requestDTO);
  }

  updatePrice(requestDTO: RequestDTO) {
    return this.httpClient.post('brw/updatePriceAmenity', requestDTO);
  }

  requestAmenity(requestDTO: RequestDTO) {
    return this.httpClient.post('brw/requestAmenity', requestDTO);
  }

  getAllAmenities() {
    return this.httpClient.get('brw/viewAllAmenities');
  }
  constructor(private httpClient: HttpClient) { }
}
