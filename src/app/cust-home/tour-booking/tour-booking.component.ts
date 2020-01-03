import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/adm-home/tour-management/tour.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tour-booking',
  templateUrl: './tour-booking.component.html',
  styleUrls: ['./tour-booking.component.scss']
})
export class TourBookingComponent implements OnInit {

  tourPackages: any = []
  custName: any;
  userName: any;
  userId: any;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private toastrService: ToastrService, private tourService: TourService) {
    this.route.queryParams.subscribe(params => {
      this.custName = params['custName'],
        this.userName = params['userName'],
        this.userId = params['userId']
    });
  }
  ngOnInit() {
    this.tourService.getAllTourPackages().subscribe(resp =>
      this.tourPackages = resp);
  }

}
