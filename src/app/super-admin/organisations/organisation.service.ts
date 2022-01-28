import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { Organisation } from './organisation';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  baseUrl = GlobalConstants.apiURL;

  constructor(private httpClient: HttpClient) { }

  getOrganisations(): Observable<Organisation[]> {
    return this.httpClient.get<Organisation[]>(this.baseUrl + "organisations");
  }

  getOrganisationById(id: number): Observable<Organisation> {
    return this.httpClient.get<Organisation>(this.baseUrl + "organisations/" + id);
  }

  postOrganisation(organisation: Organisation): Observable<Organisation> {
    return this.httpClient.post<Organisation>(this.baseUrl + "organisations", organisation);
  }

  putOrganisation(id:number, organisation: Organisation): Observable<Organisation> {
      return this.httpClient.put<Organisation>(this.baseUrl + "organisations/" + id, organisation);
  }
}
