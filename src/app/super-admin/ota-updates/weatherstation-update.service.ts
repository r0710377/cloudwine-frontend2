import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { WeatherstationUpdate } from './weatherstation-update';

@Injectable({
  providedIn: 'root'
})
export class WeatherstationUpdateService {

  baseUrl = GlobalConstants.apiURL;

  constructor(private httpClient: HttpClient) { }

  getWeatherstationUpdatesByUpdateId(id: number): Observable<WeatherstationUpdate[]> {
    return this.httpClient.get<WeatherstationUpdate[]>(this.baseUrl + "stationupdates/update/" + id);
  }

  getWeatherstationUpdatesByWeatherstationIdAndUpdateId(weatherstation_id: number, update_id: number): Observable<WeatherstationUpdate[]> {
    return this.httpClient.get<WeatherstationUpdate[]>(this.baseUrl + "stationupdates/" + weatherstation_id + "/" + update_id);
  }

  addWeatherstationUpdate(weatherstationUpdate: WeatherstationUpdate): Observable<WeatherstationUpdate> {
    return this.httpClient.post<WeatherstationUpdate>(this.baseUrl + "stationupdates", weatherstationUpdate);
  }

  deleteWeatherstationUpdate(id: number): Observable<WeatherstationUpdate> {
    return this.httpClient.delete<WeatherstationUpdate>(this.baseUrl + "stationupdates/" + id);
  }
}
