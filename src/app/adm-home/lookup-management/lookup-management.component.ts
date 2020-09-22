import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lookup } from 'src/app/shared/model/lookup.model';
import { LookupService } from './lookup.service';

@Component({
  selector: 'app-lookup-management',
  templateUrl: './lookup-management.component.html',
  styleUrls: ['./lookup-management.component.scss']
})
export class LookupManagementComponent implements OnInit {
  lookupExcel: any = File;
  lookupList: any = [];
  lookupDefNames: any = [];
  lookupDefinitions: any[] = [
    [{ 'label': 'Location', 'value': 'LOCATION' }],
    [{ 'label': 'Tour Duration', 'value': 'TOUR_DURATION' }],
    [{ 'label': 'Gender', 'value': 'GENDER' }],
    [{ 'label': 'Guest Count', 'value': 'GUEST_COUNT' }],
    [{ 'label': 'Room Category', 'value': 'ROOM_CATEGORY' }],
    [{ 'label': 'Room Type', 'value': 'ROOM_TYPE' }],
    [{ 'label': 'Room Model', 'value': 'ROOM_MODEL' }],
  ];
  viewAll: boolean;
  upload: boolean;
  createNew: boolean;
  loookupCreationForm: FormGroup;
  clonedLookups: { [s: string]: Lookup; } = {};
  messageService: any;
  constructor(private formBuilder: FormBuilder, private lookupService: LookupService) { }

  ngOnInit() {
    this.loookupCreationForm = this.formBuilder.group({
      lookupDefName: ['', Validators.required],
      lookupValue: ['', Validators.required],
      displayName: ['', Validators.required]
    });
    this.lookupService.getLookupDefs().subscribe(resp => {
      this.lookupDefNames = resp;
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

  uploadLookupExcel() {
    const formData = new FormData();
    formData.append('lookupExcel', this.lookupExcel);
    this.lookupService.uploadLookupExcel(formData).subscribe(resp => console.log(resp),
      error => console.error(error));
  }
  toggleDelete(lookupId) {
    this.lookupService.toggleDelete(lookupId).subscribe(resp => console.log(resp),
      error => console.error(error));
  }
  updateLookup(lookupId) {
    this.lookupService.updateLookup(lookupId).subscribe(resp => console.log(resp),
      error => console.error(error));
  }
  viewAllLookups() {
    this.viewAll = true;
    this.createNew = false;
    this.upload = false;
    this.lookupService.viewAllLookups().subscribe(resp => {
      this.lookupList = resp
    },
      error => console.error(error));
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
    this.lookupService.createLookup(lookup).subscribe(resp => {
      console.log(resp);
    },
      error => console.error(error));
  }
  onSelectFile(event) {
    const file = event.target.files[0];
    this.lookupExcel = file;
    console.log(file);
  }
}