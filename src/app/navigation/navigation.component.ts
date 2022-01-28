import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../security/auth.service';
import { User } from '../security/user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  user: User = { id: 0, organisation_id: 0, first_name: "", surname: "", email: "", gsm: "", password: "", is_active: false, is_admin: false, is_superadmin: false, can_message: false, can_receive_notification: false, organisation: null, token: ""};

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    let user = this.authService.getUser()
    console.log(user);
    if(user != null) {
      this.user = user;
      console.log(this.user);
    }
  }
}
