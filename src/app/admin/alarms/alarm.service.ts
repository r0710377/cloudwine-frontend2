import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { Alarm } from './alarm';

@Injectable({
  providedIn: 'root'
})

export class AlarmService {

  baseUrl = GlobalConstants.apiURL;

  constructor(private httpClient: HttpClient) { }

  getAlarmById(id: number): Observable<Alarm> {
    return this.httpClient.get<Alarm>(this.baseUrl + "alarms/" + id);
  }

  getAlarmsByWeatherstationId(id: number): Observable<Alarm[]> {
    return this.httpClient.get<Alarm[]>(this.baseUrl + "alarms/station/" + id);
  }

  postAlarm(alarm: Alarm): Observable<Alarm> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Alarm>(this.baseUrl + "alarms", alarm, {headers: headers});
  }

  putAlarm(id:number, alarm: Alarm): Observable<Alarm> {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');

      return this.httpClient.put<Alarm>(this.baseUrl + "alarms/" + id, alarm, {headers: headers});
  }
}
