import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  uploadLookupExcel(formData: FormData) {
    return this.httpClient.post("brw/uploadLookupExcel", formData);
  }

  constructor(private httpClient: HttpClient) { }
}
