import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { OtaUpdate } from './ota-update';

@Injectable({
  providedIn: 'root'
})
export class OtaUpdateService {

  baseUrl = GlobalConstants.apiURL;

  constructor(private httpClient: HttpClient) { }

  getOtaUpdates(): Observable<OtaUpdate[]> {
    return this.httpClient.get<OtaUpdate[]>(this.baseUrl + "updates");
  }

  getUpdateById(id: number): Observable<OtaUpdate> {
    return this.httpClient.get<OtaUpdate>(this.baseUrl + "updates/" + id);
  }

  postUpdate(update: OtaUpdate): Observable<OtaUpdate> {
    return this.httpClient.post<OtaUpdate>(this.baseUrl + "updates", update);
  }

  putUpdate(id: number, update: OtaUpdate): Observable<OtaUpdate> {
    return this.httpClient.put<OtaUpdate>(this.baseUrl + "updates/" + id, update);
  }

  deleteUpdate(id: number): Observable<OtaUpdate> {
    return this.httpClient.delete<OtaUpdate>(this.baseUrl + "updates/" + id);
  }
}
