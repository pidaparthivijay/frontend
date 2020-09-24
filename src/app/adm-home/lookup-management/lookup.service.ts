import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from 'src/app/shared/model/request-dto.model';
import { RequestMappings } from 'src/app/shared/model/RequestMappings';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  createLookup(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.LOOKUP_CREATE, requestDTO);
  }

  updateLookup(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.LOOKUP_UPDATE, requestDTO);
  }

  uploadLookupExcel(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.LOOKUP_EXCEL_UPLOAD, requestDTO);
  }

  toggleDelete(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.LOOKUP_DELETE_TOGGLE, requestDTO);
  }

  getLookupListByDefinition(requestDTO: RequestDTO) {
    return this.httpClient.post(RequestMappings.LOOKUP_VIEW_BY_DEF, requestDTO);
  }

  getLookupDefs() {
    return this.httpClient.get(RequestMappings.LOOKUP_VIEW_DEF);
  }

  viewAllLookups() {
    return this.httpClient.get(RequestMappings.LOOKUP_VIEW_ALL);
  }

  constructor(private httpClient: HttpClient) { }
}
