import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminHeadersService {
  public buildDefault(headers = new HttpHeaders()): HttpHeaders {
    return headers.set('showGlobalLoader', 'true');
  }
}
