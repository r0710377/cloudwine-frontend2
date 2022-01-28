import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Organisation } from 'src/app/super-admin/organisations/organisation';
import { OrganisationService } from 'src/app/super-admin/organisations/organisation.service';

@Component({
  selector: 'app-edit-organisation-form',
  templateUrl: './edit-organisation-form.component.html',
  styleUrls: ['./edit-organisation-form.component.scss']
})
export class EditOrganisationFormComponent implements OnInit {

  organisationId: number = 0;

  organisation: Organisation = { id: 0, name: "", address: "", postal_code: "", city: "", country: "", is_active: false };

  isSubmitted: boolean = false;
  errorMessage: string = "";

  organisation$: Subscription = new Subscription();
  putOrganisation$: Subscription = new Subscription();

  constructor(private router: Router, private organisationService: OrganisationService, private _location: Location) {
    this.organisationId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.organisationId != null && this.organisationId > 0) {
      this.organisationService.getOrganisationById(this.organisationId).subscribe(result => this.organisation = result);
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.organisation$.unsubscribe();
    this.putOrganisation$.unsubscribe();
  }

  goBack() {
    this._location.back();
  }

  onSubmit() {
    this.isSubmitted = true;
    this.putOrganisation$ = this.organisationService.putOrganisation(this.organisationId, this.organisation).subscribe(result => {
      //all went well
      this.router.navigateByUrl("/user/personal-settings");
    },
    error => {
      this.errorMessage = error.message;
    });
  }

}
