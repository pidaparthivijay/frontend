import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../shared/model/constants';
import { Customer } from '../shared/model/customer.model';
import { RegSerService } from './reg-ser.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  actionStatus = false;
  statusMessage: string;
  customer: any;
  constructor(private formBuilder: FormBuilder, private regSer: RegSerService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      custName: ['', Validators.required],
      userName: ['', Validators.required],
      custDob: ['', Validators.required],
      custMail: ['', [Validators.required, Validators.email]],
      custMob: ['', Validators.required],
      custPass: ['', [Validators.required, Validators.minLength(6)]],
      custRepass: ['', [Validators.required, Validators.minLength(6)]],
      custGen: ['', Validators.required]
    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    let customer = new Customer();
    customer.custName = this.registerForm.get('custName').value;
    customer.userName = this.registerForm.get('userName').value;
    customer.custMob = this.registerForm.get('custMob').value;
    customer.custGen = this.registerForm.get('custGen').value;
    customer.custPass = this.registerForm.get('custPass').value;
    customer.custEmail = this.registerForm.get('custMail').value;
    customer.custDob = this.registerForm.get('custDob').value;
    this.regSer.regCust(customer).subscribe(
      resp => {
        if (resp[Constants.ACT_STS]) {
          this.actionStatus = true;
          this.customer = resp;
          this.toastrService.success(Constants.REG_SXS, 'Your customer id is: ' + this.customer.custId);
          this.registerForm.reset();
        } else {
          this.actionStatus = false;
          this.statusMessage = resp[Constants.STS_MSG];
          this.toastrService.error('Because ' + this.statusMessage, Constants.REG_FLR);
        }
      },
      error => console.error(error)
    );
  }
  public findInvalidControls() {
    const invalid = [];
    const controls = this.f.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
}
