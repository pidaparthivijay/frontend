import { Component, OnInit } from '@angular/core';
import { LookupService } from './lookup.service';

@Component({
  selector: 'app-lookup-management',
  templateUrl: './lookup-management.component.html',
  styleUrls: ['./lookup-management.component.scss']
})
export class LookupManagementComponent implements OnInit {
  lookupExcel: any = File;
  constructor(private lookupService: LookupService) { }

  ngOnInit() {
  }
  uploadLookupExcel() {
    //var lookupExcel = (<HTMLInputElement>document.getElementById('lookupExcel')).value;
    const formData = new FormData();
    formData.append('lookupExcel', this.lookupExcel);
    this.lookupService.uploadLookupExcel(formData).subscribe(resp => console.log(resp),
      error => console.error(error));
  }
  onSelectFile(event) {
    const file = event.target.files[0];
    this.lookupExcel = file;
    console.log(file);
  }
}
