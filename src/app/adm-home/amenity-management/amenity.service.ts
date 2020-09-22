import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Amenity } from 'src/app/shared/model/amenity.model';
import { AmenityRequest } from 'src/app/shared/model/amenityRequest.model';

@Injectable({
  providedIn: 'root'
})
export class AmenityService {
  toggleDelete(amenityName: string) {
    return this.httpClient.post('brw/toggleDeleteAmenity', amenityName);
  }
  updatePrice(amenity: Amenity) {
    return this.httpClient.post('brw/updatePriceAmenity', amenity);
  }
  requestAmenity(amenityRequest: AmenityRequest) {
    return this.httpClient.post('brw/requestAmenity', amenityRequest);
  }
  createAmenity(amenity: Amenity) {
    return this.httpClient.post('brw/createAmenity', amenity);
  }
  getAllAmenities() {
    return this.httpClient.get('brw/viewAllAmenities');
  }
  constructor(private httpClient: HttpClient) { }
}
