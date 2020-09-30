import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AmenityService } from 'src/app/adm-home/amenity-management/amenity.service';
import { AmenityRequest } from 'src/app/shared/model/amenityRequest.model';
import { Constants } from 'src/app/shared/model/constants';
import { RequestDTO } from 'src/app/shared/model/request-dto.model';

@Component({
  selector: 'app-request-amenities',
  templateUrl: './request-amenities.component.html',
  styleUrls: ['./request-amenities.component.scss']
})
export class RequestAmenitiesComponent implements OnInit {
  amenitiesList: any = [];
  custName: any;
  userName: any;
  userId: any;
  actionStatus: boolean;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private toastrService: ToastrService, private amenityService: AmenityService) {
    this.route.queryParams.subscribe(params => {
      this.custName = params['custName'],
        this.userName = params['userName'],
        this.userId = params['userId']
    });
  }
  ngOnInit() {
    this.amenityService.getAllAmenities().subscribe(resp =>
      this.amenitiesList = resp['amenityList']);
  }
  requestAmenity(amenityId) {
    var noOfDays = (<HTMLInputElement>document.getElementById('noOfDays' + amenityId)).value;
    let amenityRequest = new AmenityRequest();
    amenityRequest.amenityId = amenityId;
    amenityRequest.userId = this.userId;
    amenityRequest.userName = this.userName;
    amenityRequest.noOfDays = +noOfDays;
    let requestDTO = new RequestDTO()
    requestDTO.amenityRequest = amenityRequest;
    this.amenityService.requestAmenity(requestDTO).subscribe(resp => {
      console.log(resp);
      if (resp[Constants.ACT_STS]) {
        this.actionStatus = true;
        this.toastrService.success(Constants.AMENITY_REQ_SXS);
      }
    });
  }

}
