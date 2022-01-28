import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrganisationService } from '../organisation.service';
import { Organisation } from '../organisation';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-organisation-form',
  templateUrl: './organisation-form.component.html',
  styleUrls: ['./organisation-form.component.scss']
})
export class OrganisationFormComponent implements OnInit {

  isAdd: boolean = false;
  isEdit: boolean = false;
  organisationId: number = 0;

  organisation: Organisation = { id: 0, name: "", address: "", postal_code: "", city: "", country: "", is_active: false };

  isSubmitted: boolean = false;
  errorMessage: string = "";

  organisation$: Subscription = new Subscription();
  postOrganisation$: Subscription = new Subscription();
  putOrganisation$: Subscription = new Subscription();

  constructor(private router: Router, private organisationService: OrganisationService, private _location: Location) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.organisationId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.organisationId != null && this.organisationId > 0) {
      this.organisation$ = this.organisationService.getOrganisationById(this.organisationId).subscribe(result => this.organisation = result);
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.organisation$.unsubscribe();
    this.postOrganisation$.unsubscribe();
    this.putOrganisation$.unsubscribe();
  }

  goBack() {
    this._location.back();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postOrganisation$ = this.organisationService.postOrganisation(this.organisation).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/superadmin/organisations");
      },
      error => {
        this.errorMessage = error.message;
      });
    }
    if (this.isEdit) {
      this.putOrganisation$ = this.organisationService.putOrganisation(this.organisationId, this.organisation).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/superadmin/organisations");
      },
      error => {
        this.errorMessage = error.message;
      });
    }
  }

}
