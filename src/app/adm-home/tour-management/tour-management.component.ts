import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/shared/model/constants';
import { RequestDTO } from 'src/app/shared/model/request-dto.model';
import { TourPackage } from 'src/app/shared/model/tour-package.model';
import { TourService } from './tour.service';

@Component({
  selector: 'app-tour-management',
  templateUrl: './tour-management.component.html',
  styleUrls: ['./tour-management.component.scss']
})
export class TourManagementComponent implements OnInit {
  tourPackageForm: FormGroup;
  submitted: boolean;
  actionStatus: boolean;
  tourPackage: any;
  statusMessage: any;
  tourPackagesList: any = [];
  newPackage: boolean = false;
  viewPackages: boolean = false;
  constructor(private tourService: TourService, private formBuilder: FormBuilder, private toastrService: ToastrService) { }

  ngOnInit() {
    this.tourPackageForm = this.formBuilder.group({
      location: ['', Validators.required],
      duration: ['', Validators.required],
      pricePerHead: ['', Validators.required]
    });
  }
  get f() { return this.tourPackageForm.controls; }

  createTourPackage() {
    this.submitted = true;
    if (this.tourPackageForm.invalid) {
      return;
    }
    let tourPackage = new TourPackage();
    tourPackage.location = this.tourPackageForm.get('location').value;
    tourPackage.pricePerHead = this.tourPackageForm.get('pricePerHead').value;
    tourPackage.duration = this.tourPackageForm.get('duration').value;
    let requestDTO = new RequestDTO();
    requestDTO.tourPackage = tourPackage;
    this.tourService.createTourPackage(requestDTO).subscribe(
      resp => {
        if (resp[Constants.ACT_STS]) {
          this.actionStatus = true;
          this.tourPackage = resp['tourPackage'];
          this.toastrService.success(Constants.TUR_PACK_SXS);
          this.tourPackageForm.reset();
        } else {
          this.actionStatus = false;
          this.statusMessage = resp[Constants.STS_MSG];
          this.toastrService.error('Because ' + this.statusMessage, Constants.REG_FLR);
        }
      },
      error => console.error(error)
    );
  }

  viewPackageList() {
    this.newPackage = false;
    this.viewPackages = true;
    this.tourService.getAllTourPackages().subscribe(
      resp => {
        this.tourPackagesList = resp['tourPackageList'];
      },
      error => console.error(error)
    );
  }

  toggleDelete(packageName) {
    let requestDTO = new RequestDTO();
    let tourPackage = new TourPackage();
    tourPackage.tourPackageName = packageName;
    requestDTO.tourPackage = tourPackage;
    this.tourService.toggleDelete(requestDTO).subscribe(
      resp => {
        this.tourPackagesList = resp['tourPackageList'];
      },
      error => console.error(error)
    );
  }

  updateTourPackage(tourPackage) {
    let requestDTO = new RequestDTO();
    requestDTO.tourPackage = tourPackage;
    this.tourService.updateTourPackage(requestDTO).subscribe(
      resp => {
        this.tourPackagesList = resp['tourPackageList'];
      },
      error => console.error(error)
    );
  }

  newTourPackage() {
    this.newPackage = true;
    this.viewPackages = false;
  }

}
