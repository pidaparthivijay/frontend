import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private toastrService: ToastrService, private tourService: TourService) {

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

  bookTour(tourPackageName) {
    var guestCount = (<HTMLInputElement>document.getElementById('guestCount' + tourPackageName)).value;
    var startDate = (<HTMLInputElement>document.getElementById('startDate' + tourPackageName)).value;
    let tourPackageRequest = new TourPackageRequest();
    tourPackageRequest.userId = this.userId;
    tourPackageRequest.userName = this.userName;
    tourPackageRequest.guestCount = +guestCount;
    tourPackageRequest.tourPackageName = tourPackageName;
    tourPackageRequest.startDate = new Date(startDate);
    let requestDTO = new RequestDTO();
    requestDTO.tourPackageRequest = tourPackageRequest;
    this.tourService.bookTourPackage(requestDTO).subscribe(resp => {
      console.log(resp);
      if (resp[Constants.ACT_STS]) {
        this.actionStatus = true;
        this.toastrService.success(Constants.TOUR_BOOK_SXS);
      }
    },
      error => {
        console.error(error);
      }
    );

  }
}
