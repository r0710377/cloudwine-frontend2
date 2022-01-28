import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherstationUserService } from 'src/app/admin/users/weatherstation-user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { Weatherstation } from './weatherstation';

@Injectable({
  providedIn: 'root'
})
export class WeatherstationService {

  baseUrl: string = GlobalConstants.apiURL;

  constructor(private httpClient: HttpClient) { }

  getWeatherstations(): Observable<Weatherstation[]> {
    return this.httpClient.get<Weatherstation[]>(this.baseUrl + "weatherstations");
  }

  getPublicWeatherstations(): Observable<Weatherstation[]> {
    return this.httpClient.get<Weatherstation[]>(this.baseUrl + "weatherstations/public");
  }

  getWeatherstationById(id: number): Observable<Weatherstation> {
    return this.httpClient.get<Weatherstation>(this.baseUrl + "weatherstations/" + id);
  }

  postWeatherstation(weatherstation: Weatherstation): Observable<Weatherstation> {
    return this.httpClient.post<Weatherstation>(this.baseUrl + "weatherstations", weatherstation);
  }

  putWeatherstation(id: number, weatherstation: Weatherstation): Observable<Weatherstation> {
    return this.httpClient.put<Weatherstation>(this.baseUrl + "weatherstations/" + id, weatherstation);
  }
}
