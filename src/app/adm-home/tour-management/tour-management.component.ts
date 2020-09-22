import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/shared/model/constants';
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
    this.tourService.createTourPackage(tourPackage).subscribe(
      resp => {
        if (resp[Constants.ACT_STS]) {
          this.actionStatus = true;
          this.tourPackage = resp;
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
        this.tourPackagesList = resp;
      },
      error => console.error(error)
    );
  }

  toggleDelete(packageName) {
    this.tourService.toggleDelete(packageName).subscribe(
      resp => {
        this.tourPackagesList = resp;
      },
      error => console.error(error)
    );
  }

  updatePrice(packageName) {
    var pricePerHead = (<HTMLInputElement>document.getElementById('pricePerHead' + packageName)).value;
    if (+pricePerHead <= 2499) {
      alert("Price cannot be less than 2500");
      return;
    }
    let tourPackage = new TourPackage();
    tourPackage.pricePerHead = +pricePerHead;
    tourPackage.tourPackageName = packageName;
    this.tourService.updatePrice(tourPackage).subscribe(
      resp => {
        this.tourPackagesList = resp;
      },
      error => console.error(error)
    );
  }
  newTourPackage() {
    this.newPackage = true;
    this.viewPackages = false;
  }

}
