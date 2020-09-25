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
  newAmenity: boolean;
  statusMessage: any;
  submitted: boolean;
  viewAmenities: boolean;

  constructor(private formBuilder: FormBuilder, private amenityService: AmenityService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.amenityRegistrationForm = this.formBuilder.group({
      amenityName: ['', Validators.required],
      price: ['', Validators.required]
    });
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

  updatePrice(amenityName) {
    var price = (<HTMLInputElement>document.getElementById('price' + amenityName)).value;
    if (+price <= 99) {
      alert("Price cannot be less than 100");
      return;
    }
    let amenity = new Amenity();
    amenity.price = +price;
    amenity.amenityName = amenityName;
    let requestDTO = new RequestDTO();
    requestDTO.amenity = amenity;
    this.amenityService.updatePrice(requestDTO).subscribe(
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
