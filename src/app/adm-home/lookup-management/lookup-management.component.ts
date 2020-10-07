import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { Constants } from 'src/app/common/model/constants';
import { Lookup } from 'src/app/common/model/lookup.model';
import { RequestDTO } from 'src/app/common/model/request-dto.model';
import { LookupService } from './lookup.service';

@Component({
  selector: 'app-lookup-management',
  templateUrl: './lookup-management.component.html',
  styleUrls: ['./lookup-management.component.scss']
})
export class LookupManagementComponent implements OnInit {
  @ViewChild('lookupTable', null) table: Table;
  lookupDefNames: any = [];
  uploadedFiles: any[] = [];
  lookupExcel: any = File;
  lookupList: any = [];
  lookupDefinitions: any[] = [
    { label: 'Location', value: 'LOCATION' },
    { label: 'Tour Duration', value: 'TOUR_DURATION' },
    { label: 'Gender', value: 'GENDER' },
    { label: 'Guest Count', value: 'GUEST_COUNT' },
    { label: 'Room Category', value: 'ROOM_CATEGORY' },
    { label: 'Room Type', value: 'ROOM_TYPE' },
    { label: 'Room Model', value: 'ROOM_MODEL' },
  ];
  columns: ['lookupDefName', 'lookupValue', 'displayName', 'createdDate', 'updateDate'];
  clonedLookups: { [s: string]: Lookup; } = {};
  createNew: boolean;
  loookupCreationForm: FormGroup;
  messageService: any;
  upload: boolean;
  viewAll: boolean;

  constructor(private formBuilder: FormBuilder, private lookupService: LookupService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.loookupCreationForm = this.formBuilder.group({
      lookupDefName: ['', Validators.required],
      lookupValue: ['', Validators.required],
      displayName: ['', Validators.required]
    });
    this.lookupService.getLookupDefs().subscribe(resp => {
      this.lookupDefNames = resp['lookupDefsList'];
    },
      error => console.error(error));
  }
  get f() { return this.loookupCreationForm.controls; }

  toggleViews(type) {
    if (type === 'create') {
      this.createNew = true;
      this.viewAll = false;
      this.upload = false;
    } else if (type === 'view') {
      this.createNew = false;
      this.viewAll = true;
      this.upload = false;
      this.viewAllLookups();
    } else if (type === 'upload') {
      this.createNew = false;
      this.viewAll = false;
      this.upload = true;

    }
  }

  uploadLookupExcel(event) {
    const file = event.files[0];
    this.lookupExcel = file;
    const formData = new FormData();
    formData.append('lookupExcel', this.lookupExcel);
    let requestDTO = new RequestDTO();
    requestDTO.lookupExcel = formData;
    this.lookupService.uploadLookupExcel(formData).subscribe(resp => {
      this.lookupList = resp['lookupList'],
        this.toastrService.success(resp[Constants.ACT_STS]);
      if (resp[Constants.ACT_STS] === Constants.LOOKUP_EXCEL_SXS) {
        this.viewAllLookups();
      }
    },
      error => {
        this.toastrService.error(Constants.XL_UPLOAD_FAILED, error);
        console.error(error)
      });
  }

  toggleDelete(lookupId) {
    let lookup = new Lookup();
    let requestDTO = new RequestDTO();
    lookup.lookupId = lookupId;
    requestDTO.lookup = lookup;
    this.lookupService.toggleDelete(requestDTO).subscribe(resp => {
      this.lookupList = resp['lookupList'];
      this.toastrService.success(resp[Constants.ACT_STS]);
      this.viewAllLookups();
    },
      error => {
        console.error(error),
          this.toastrService.error(error);
      });
  }

  updateLookup(lookup: Lookup) {
    let requestDTO = new RequestDTO();
    requestDTO.lookup = lookup;
    this.lookupService.updateLookup(requestDTO).subscribe(resp => {
      this.lookupList = resp['lookupList'];
      if (Constants.UPDATE_SXS === resp[Constants.ACT_STS]) {
        this.toastrService.success(Constants.UPDATE_SXS);
        this.viewAllLookups();
      } else {
        this.toastrService.error(resp[Constants.ACT_STS]);
      }
    },
      error => {
        this.toastrService.error(Constants.UPDATE_FAIL, error)
      });
  }

  viewAllLookups() {
    this.viewAll = true;
    this.createNew = false;
    this.upload = false;
    this.lookupService.viewAllLookups().subscribe(resp => {
      this.lookupList = resp['lookupList'];
    },
      error => {
        this.toastrService.error(error)
      });
  }

  onRowEditInit(lookup: Lookup) {
    this.clonedLookups[lookup.lookupId] = { ...lookup };
  }

  onRowEditSave(lookup: Lookup) {
    if (lookup.createdDate !== null)
      delete this.clonedLookups[lookup.lookupId];
    else
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Year is required' });
  }

  onRowEditCancel(lookup: Lookup, index: number) {
    this.lookupList[index] = this.clonedLookups[lookup.lookupId];
    delete this.clonedLookups[lookup.lookupId];
  }

  createLookup() {
    let lookup = new Lookup();
    lookup.lookupDefName = this.loookupCreationForm.get('lookupDefName').value;
    lookup.displayName = this.loookupCreationForm.get('displayName').value;
    lookup.lookupValue = this.loookupCreationForm.get('lookupValue').value;
    let requestDTO = new RequestDTO();
    requestDTO.lookup = lookup;
    this.lookupService.createLookup(requestDTO).subscribe(resp => {
      if (Constants.SUCCESS === resp[Constants.ACT_STS]) {
        this.toastrService.success(Constants.AMNT_CRT_SXS);
        this.viewAllLookups();
        this.loookupCreationForm.reset();
      } else {
        this.toastrService.error(Constants.AMNT_CRT_FAIL);
      }
    },
      error => {
        this.toastrService.error(Constants.AMNT_CRT_FAIL, error);
      });
  }

  onDateSelect(value) {
    this.table.filter(value, 'date', 'equals')
  }

  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    return day + '-' + month + '-' + date.getYear();
  }
}
