import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lookup } from 'src/app/shared/model/lookup.model';
import { RequestDTO } from 'src/app/shared/model/request-dto.model';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  getLookupListByDefinition(requestDTO: RequestDTO) {
    return this.httpClient.post("brw/getLookupListByDefinition", requestDTO);
  }

  createLookup(requestDTO: RequestDTO) {
    return this.httpClient.post("brw/createLookup", requestDTO);
  }

  getLookupDefs() {
    return this.httpClient.get("brw/getLookupDefs");
  }

  toggleDelete(requestDTO: RequestDTO) {
    return this.httpClient.post("brw/toggleDelete", requestDTO);
  }

  updateLookup(requestDTO: RequestDTO) {
    return this.httpClient.post("brw/updateLookup", requestDTO);
  }

  uploadLookupExcel(requestDTO: RequestDTO) {
    return this.httpClient.post("brw/uploadLookupExcel", requestDTO);
  }

  viewAllLookups() {
    return this.httpClient.get("brw/viewLookupList");
  }

  constructor(private httpClient: HttpClient) { }
}
