import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lookup } from 'src/app/shared/model/lookup.model';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  getLookupListByDefinition(definitionName: string) {
    return this.httpClient.post("brw/getLookupListByDefinition", definitionName);
  }
  createLookup(lookup: Lookup) {
    return this.httpClient.post("brw/createLookup", lookup);
  }
  getLookupDefs() {
    return this.httpClient.get("brw/getLookupDefs");
  }
  toggleDelete(lookupId: any) {
    return this.httpClient.post("brw/toggleDelete", lookupId);
  }
  updateLookup(lookupId: any) {
    return this.httpClient.post("brw/updateLookup", lookupId);
  }
  uploadLookupExcel(formData: FormData) {
    return this.httpClient.post("brw/uploadLookupExcel", formData);
  }

  viewAllLookups() {
    return this.httpClient.get("brw/viewLookupList");
  }

  constructor(private httpClient: HttpClient) { }
}
