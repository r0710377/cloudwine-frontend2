import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Value } from './value';

@Injectable({
  providedIn: 'root'
})
export class ValueService {
  constructor(private httpClient: HttpClient) { }

  getValues(): Observable<Value[]> {
    return this.httpClient.get<Value[]>("https://wijnbouwer.trainingsessions.be/api/values/2");
  }

  getValuesBySensor(weather_station_id: number, sensor_id: number): Observable<Value[]> {
    return this.httpClient.get<Value[]>("https://wijnbouwer.trainingsessions.be/api/values/" + weather_station_id
    + "?sensor=" + sensor_id);
  }

  getCoordinates(weather_station_id: number): Observable<Value[]>{
    return this.httpClient.get<Value[]>("https://wijnbouwer.trainingsessions.be/api/values/location/" + weather_station_id);
  }

  getValueOfBattery(weather_station_id: number): Observable<Value>{
    return this.httpClient.get<Value>("https://wijnbouwer.trainingsessions.be/api/values/battery/" + weather_station_id);
  }
}
