import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Amenity } from 'src/app/shared/model/amenity.model';
import { Constants } from 'src/app/shared/model/constants';
import { RequestDTO } from 'src/app/shared/model/request-dto.model';
import { AmenityService } from './amenity.service';

@Component({
  selector: 'app-amenity-management',
  templateUrl: './amenity-management.component.html',
  styleUrls: ['./amenity-management.component.scss']
})
export class AmenityManagementComponent implements OnInit {
  actionStatus: boolean;
  amenitiesList: Object;
  amenity: any;
  amenityRegistrationForm: FormGroup;
  loading: boolean;
  newAmenity: boolean = false;
  statusMessage: any;
  submitted: boolean;
  viewAmenities: boolean;
  columns = ['Amenity Id', 'Amenity Name', 'Amenity Price'];

  constructor(private formBuilder: FormBuilder, private amenityService: AmenityService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.amenityRegistrationForm = this.formBuilder.group({
      amenityName: ['', Validators.required],
      price: ['', Validators.required]
    });
    this.viewAmenitiesList();
  }

  get f() { return this.amenityRegistrationForm.controls; }

  createAmenity() {
    this.submitted = true;
    if (this.amenityRegistrationForm.invalid) {
      return;
    }
    this.loading = true;
    let amenity = new Amenity();
    amenity.amenityName = this.amenityRegistrationForm.get('amenityName').value;
    amenity.price = this.amenityRegistrationForm.get('price').value;
    let requestDTO = new RequestDTO();
    requestDTO.amenity = amenity;
    this.amenityService.createAmenity(requestDTO).subscribe(
      resp => {
        if (resp[Constants.ACT_STS]) {
          this.actionStatus = true;
          this.amenity = resp['amenity'];
          this.toastrService.success(Constants.REG_SXS, 'Your amenity id is: ' + this.amenity.amenityId);
          this.amenityRegistrationForm.reset();
        } else {
          this.actionStatus = false;
          this.statusMessage = resp[Constants.STS_MSG];
          this.toastrService.error('Because ' + this.statusMessage, Constants.REG_FLR);
        }
      },
      error => console.error(error)
    );

  }

  viewAmenitiesList() {
    this.newAmenity = false;
    this.viewAmenities = true;
    this.amenityService.getAllAmenities().subscribe(
      resp => {
        console.log(resp);
        this.amenitiesList = resp['amenityList'];
      },
      error => console.error(error)
    );
  }

  toggleDelete(amenityName) {
    let requestDTO = new RequestDTO();
    let amenity = new Amenity();
    amenity.amenityName = amenityName;
    requestDTO.amenity = amenity;
    this.amenityService.toggleDelete(requestDTO).subscribe(
      resp => {
        this.amenitiesList = resp['amenityList'];
      },
      error => console.error(error)
    );
  }

  updateAmenity(amenityData) {
    let amenity = new Amenity();
    amenity = amenityData;
    let requestDTO = new RequestDTO();
    requestDTO.amenity = amenity;
    this.amenityService.updateAmenity(requestDTO).subscribe(
      resp => {
        this.amenitiesList = resp['amenityList'];
      },
      error => console.error(error)
    );
  }

  createNewAmenity() {
    this.newAmenity = true;
    this.viewAmenities = false;
  }
}
