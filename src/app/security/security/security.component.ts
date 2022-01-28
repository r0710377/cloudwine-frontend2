import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  user: User = { id: 0, organisation_id: 0, first_name: "", surname: "", email: "", gsm: "", password: "", is_active: false, is_admin: false, is_superadmin: false, can_message: false, can_receive_notification: false, organisation: null, token: ""};

  isSubmitted: boolean = false;
  errorMessage: string = '';

  isLogin: boolean = false;
  isRegister: boolean = false;
  isLogout: boolean = false;

  constructor(private authService: AuthService, private router: Router, private _location: Location) {

  }

  ngOnInit(): void {
    switch (this.router.url) {
      case '/login': {
        this.isLogin = true;
        break;
      }
      case '/logout': {
        this.isLogout = true;
        this.authService.deleteToken();
        this.router.navigate(['']);
        break;
      }
      default: {
        this.isLogin = true;
        break;
      }
    }
  }

  goBack() {
    this._location.back();
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.isLogin) {
      this.authService.authenticate(this.user.email, this.user.password).subscribe(result => {
        this.errorMessage = '';

        // save user + access token to localstorage
        localStorage.setItem('id', result.user.id.toString());
        localStorage.setItem('email', result.user.email);
        localStorage.setItem('first_name', result.user.first_name);
        localStorage.setItem('surname', result.user.surname);
        localStorage.setItem('gsm', result.user.gsm);
        localStorage.setItem('is_active', result.user.is_active ? 'true' : 'false');
        localStorage.setItem('is_admin', result.user.is_admin ? 'true' : 'false');
        localStorage.setItem('is_superadmin', result.user.is_superadmin ? 'true' : 'false');
        localStorage.setItem('can_message', result.user.can_message ? 'true' : 'false');
        localStorage.setItem('can_receive_notification', result.user.can_receive_notification ? 'true' : 'false');
        localStorage.setItem('token', result.access_token);
        result.user.is_superadmin ? localStorage.setItem('role', 'superadmin') : (result.user.is_admin ? localStorage.setItem('role', 'admin') : '');

        this.router.navigate(['']).then(() => {window.location.reload();});
      }, error => {
        this.errorMessage = 'Email/password not correct!';
        console.log(this.errorMessage);
        this.isSubmitted = false;
      });
    }
  }
}
