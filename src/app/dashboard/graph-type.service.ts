import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../shared/global-constants';
import { GraphType } from './graph-type';

@Injectable({
  providedIn: 'root'
})
export class GraphTypeService {

  baseUrl = GlobalConstants.apiURL;

  constructor(private httpClient: HttpClient) { }

  getTypes(): Observable<GraphType[]> {
    return this.httpClient.get<GraphType[]>(this.baseUrl + "types");
  }

  getTypeById(id: number): Observable<GraphType> {
    return this.httpClient.get<GraphType>(this.baseUrl + "types/" + id);
  }
}
