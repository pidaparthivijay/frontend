import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TourPackage } from 'src/app/shared/model/tour-package.model';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  toggleDelete(packageName: any) {
    return this.httpClient.post('brw/toggleDeleteTourPackage', packageName);
  }
  updatePrice(tourPackage: TourPackage) {
    return this.httpClient.post('brw/updatePriceTourPackage', tourPackage);
  }
  createTourPackage(tourPackage: TourPackage) {
    return this.httpClient.post('brw/createTourPackage', tourPackage);
  }
  getAllTourPackages() {
    return this.httpClient.get('brw/viewAllTourPackages');
  }
  constructor(private httpClient: HttpClient) { }
}
