import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TourService } from 'src/app/adm-home/tour-management/tour.service';
import { Constants } from 'src/app/shared/model/constants';
import { RequestDTO } from 'src/app/shared/model/request-dto.model';
import { TourPackageRequest } from 'src/app/shared/model/tour-package-request';

@Component({
  selector: 'app-tour-booking',
  templateUrl: './tour-booking.component.html',
  styleUrls: ['./tour-booking.component.scss']
})
export class TourBookingComponent implements OnInit {

  tourPackagesList: any = []
  custName: any;
  userName: any;
  userId: any;
  actionStatus: boolean;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private toastrService: ToastrService, private tourService: TourService) {
    this.route.queryParams.subscribe(params => {
      this.custName = params['custName'],
        this.userName = params['userName'],
        this.userId = params['userId']
    });
  }
  ngOnInit() {
    this.tourService.getAllTourPackages().subscribe(resp =>
      this.tourPackagesList = resp['tourPackageList']);
  }
  bookTour(tourPackageName) {
    var guestCount = (<HTMLInputElement>document.getElementById('guestCount' + tourPackageName)).value;
    var startDate = (<HTMLInputElement>document.getElementById('startDate' + tourPackageName)).value;
    let tourPackageRequest = new TourPackageRequest();
    tourPackageRequest.userId = this.userId;
    tourPackageRequest.guestCount = +guestCount;
    tourPackageRequest.tourPackageName = tourPackageName;
    tourPackageRequest.startDate = new Date(startDate);
    let requestDTO = new RequestDTO();
    requestDTO.tourPackageRequest = tourPackageRequest;
    this.tourService.bookTourPackage(requestDTO).subscribe(resp => {
      if (resp[Constants.ACT_STS]) {
        this.actionStatus = true;
        this.toastrService.success(Constants.TOUR_BOOK_SXS);
      }
    });

  }
}
