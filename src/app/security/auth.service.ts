import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs';
import {UserResponse} from './userResponse';
import { GlobalConstants } from '../shared/global-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = GlobalConstants.apiURL;

  constructor(private httpClient: HttpClient) {
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  getUser(): User | null {
    if (this.isLoggedIn()){
      return {
        id : parseInt(localStorage.getItem('id') ?? '0'),
        organisation_id: 0,
        first_name: localStorage.getItem('first_name') ?? '',
        surname: localStorage.getItem('surname') ?? '',
        email: localStorage.getItem('email') ?? '',
        gsm: localStorage.getItem('gsm') ?? '',
        password: '',
        is_active: localStorage.getItem('is_active') == 'true' ? true : false,
        is_admin: localStorage.getItem('is_admin') == 'true' ? true : false,
        is_superadmin: localStorage.getItem('is_superadmin') == 'true' ? true : false,
        can_message: localStorage.getItem('can_message') == 'true' ? true : false,
        can_receive_notification: localStorage.getItem('can_receive_notification') == 'true' ? true : false,
        organisation: null,
        token: this.getToken()  };
    } else {
      return null;
    }
  }

  deleteToken(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  authenticate(email: string, password: string): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>( this.baseUrl + 'login', {email, password});
  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>( this.baseUrl + 'register', user);
  }

  getRole() {
    return localStorage.getItem('role');
  }
}
