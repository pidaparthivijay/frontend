import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from 'src/app/shared/model/request-dto.model';
import { TourPackageRequest } from 'src/app/shared/model/tour-package-request';
import { TourPackage } from 'src/app/shared/model/tour-package.model';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  bookTourPackage(requestDTO: RequestDTO) {
    return this.httpClient.post('brw/bookTourPackage', requestDTO);
  }

  toggleDelete(requestDTO: RequestDTO) {
    return this.httpClient.post('brw/toggleDeleteTourPackage', requestDTO);
  }

  updatePrice(requestDTO: RequestDTO) {
    return this.httpClient.post('brw/updatePriceTourPackage', requestDTO);
  }

  createTourPackage(requestDTO: RequestDTO) {
    return this.httpClient.post('brw/createTourPackage', requestDTO);
  }

  getAllTourPackages() {
    return this.httpClient.get('brw/viewAllTourPackages');
  }
  constructor(private httpClient: HttpClient) { }
}
