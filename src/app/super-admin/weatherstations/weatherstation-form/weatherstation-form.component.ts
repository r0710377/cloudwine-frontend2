import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherstationService } from '../weatherstation.service';
import { Weatherstation } from '../weatherstation';
import { Router } from '@angular/router';
import { Organisation } from '../../organisations/organisation';
import { OrganisationService } from '../../organisations/organisation.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-weatherstation-form',
  templateUrl: './weatherstation-form.component.html',
  styleUrls: ['./weatherstation-form.component.scss']
})
export class WeatherstationFormComponent implements OnInit {
  organisations: Organisation[] = [];

  isAdd: boolean = false;
  isEdit: boolean = false;
  weatherstationId: number = 0;

  // organisation: Organisation = { id: 0, name: "", address: "", postal_code: "", city: "", country: "", is_active: false };
  weatherstation: Weatherstation = { id: 0, organisation_id: null, name: "", gsm: "", relais_name: "", latitude: "", longitude: "", is_active: false, is_public: false, is_location_alarm: false, is_no_data_alarm: false, number_of_cycles: 0, is_manual_relais: false, organisation: null, };

  isSubmitted: boolean = false;
  errorMessage: string = "";

  organisations$: Subscription = new Subscription();
  weatherstation$: Subscription = new Subscription();
  postWeatherstation$: Subscription = new Subscription();
  putWeatherstation$: Subscription = new Subscription();

  constructor(private router: Router, private weatherstationService: WeatherstationService, private organisationService: OrganisationService, private location: Location) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.weatherstationId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.weatherstationId != null && this.weatherstationId > 0) {
      this.weatherstation$ = this.weatherstationService.getWeatherstationById(this.weatherstationId).subscribe(result => this.weatherstation = result);
    }
  }

  ngOnInit(): void {
    this.getOrganisations();
  }

  getOrganisations() {
    this.organisations$ = this.organisationService.getOrganisations().subscribe(result => {
      this.organisations = result;
    });
  }

  ngOnDestroy(): void {
    this.organisations$.unsubscribe();
    this.weatherstation$.unsubscribe();
    this.postWeatherstation$.unsubscribe();
    this.putWeatherstation$.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postWeatherstation$ = this.weatherstationService.postWeatherstation(this.weatherstation).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/admin/weatherstations");
      },
      error => {
        this.errorMessage = error.message;
      });
    }
    if (this.isEdit) {
      this.putWeatherstation$ = this.weatherstationService.putWeatherstation(this.weatherstationId, this.weatherstation).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/admin/weatherstations");
      },
      error => {
        this.errorMessage = error.message;
      });
    }
  }
}
