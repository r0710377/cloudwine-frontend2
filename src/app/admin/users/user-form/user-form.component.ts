import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '../../../security/user';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Organisation } from 'src/app/super-admin/organisations/organisation';
import { OrganisationService } from 'src/app/super-admin/organisations/organisation.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  organisations: Organisation[] = [];

  isAdd: boolean = false;
  isEdit: boolean = false;
  userId: number = 0;

  user: User = { id: 0, organisation_id: 0, first_name: "", surname: "", email: "", gsm: "", password: "", is_active: false, is_admin: false, is_superadmin: false, can_message: false, can_receive_notification: false, organisation: null, token: ""};

  isSubmitted: boolean = false;
  errorMessage: string = "";

  user$: Subscription = new Subscription();
  postUser$: Subscription = new Subscription();
  putUser$: Subscription = new Subscription();

  constructor(private router: Router, private userService: UserService, private organisationService: OrganisationService, private _location: Location) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
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
    this.postUser$.unsubscribe();
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
    if (this.isAdd) {
      // MIGHT WANT TO REPLACE THIS WITH: a random generated password
      this.user.password = "test";

      this.postUser$ = this.userService.postUser(this.user).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/admin/users");
      },
      error => {
        this.errorMessage = error.message;
      });
    }
    if (this.isEdit) {
      this.putUser$ = this.userService.putUser(this.userId, this.user).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/admin/users");
      },
      error => {
        this.errorMessage = error.message;
      });
    }
  }

}
