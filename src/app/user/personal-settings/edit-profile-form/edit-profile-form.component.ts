import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/security/user';
import { UserService } from 'src/app/admin/users/user.service';
import { Organisation } from 'src/app/super-admin/organisations/organisation';
import { OrganisationService } from 'src/app/super-admin/organisations/organisation.service';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss']
})
export class EditProfileFormComponent implements OnInit {

  organisations: Organisation[] = [];

  userId: number = 0;
  user: User = { id: 0, organisation_id: 0, first_name: "", surname: "", email: "", gsm: "", password: "", is_active: false, is_admin: false, is_superadmin: false, can_message: false, can_receive_notification: false, organisation: null, token: "" };

  isSubmitted: boolean = false;
  errorMessage: string = "";

  user$: Subscription = new Subscription();
  putUser$: Subscription = new Subscription();

  constructor(private router: Router, private userService: UserService, private organisationService: OrganisationService, private _location: Location) {
    this.userId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.userId != null && this.userId > 0) {
      this.userService.getUserById(this.userId).subscribe(result => this.user = result);
    }
  }

  ngOnInit(): void {
    this.getOrganisations();
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
    this.putUser$.unsubscribe();
  }

  getOrganisations() {
    this.organisationService.getOrganisations().subscribe(result => this.organisations = result);
  }

  goBack() {
    this._location.back();
  }

  onSubmit() {
    this.isSubmitted = true;
    this.putUser$ = this.userService.putUser(this.userId, this.user).subscribe(result => {
      //all went well
      this.router.navigateByUrl("/user/personal-settings");
    },
    error => {
      this.errorMessage = error.message;
    });
  }
}
