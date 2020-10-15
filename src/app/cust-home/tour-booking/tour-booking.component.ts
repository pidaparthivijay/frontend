import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TourService } from 'src/app/adm-home/tour-management/tour.service';
import { Constants } from 'src/app/common/model/constants';
import { RequestDTO } from 'src/app/common/model/request-dto.model';
import { TourPackageRequest } from 'src/app/common/model/tour-package-request';

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
  startDate: Date;
  constructor(private toastrService: ToastrService, private tourService: TourService) {

  }
  ngOnInit() {
    this.userName = sessionStorage.getItem('userName');
    this.userId = sessionStorage.getItem('userId');
    this.tourService.getAllTourPackages().subscribe(resp => {
      console.log(resp);
      this.tourPackagesList = resp['tourPackageList'];
    },
      error => console.error(error)
    );
  }

  onDateSelect(event) {
    this.startDate = new Date(event);
  }

  bookTour(tourPackageName) {
    var guestCount = (<HTMLInputElement>document.getElementById('guestCount' + tourPackageName)).value;
    let tourPackageRequest = new TourPackageRequest();
    tourPackageRequest.userId = this.userId;
    tourPackageRequest.userName = this.userName;
    tourPackageRequest.guestCount = +guestCount;
    tourPackageRequest.tourPackageName = tourPackageName;
    tourPackageRequest.startDate = new Date(this.startDate);
    let requestDTO = new RequestDTO();
    requestDTO.tourPackageRequest = tourPackageRequest;
    this.tourService.bookTourPackage(requestDTO).subscribe(resp => {
      console.log(resp);
      if (resp[Constants.ACT_STS]) {
        this.actionStatus = true;
        this.toastrService.success(Constants.TOUR_BOOK_SXS);
      } else {
        this.toastrService.error;
        (Constants.TOUR_PKG_BOOK_FAIL, resp[Constants.ACT_STS]);
      }
    },
      error => {
        console.error(error);
      }
    );

  }
}
