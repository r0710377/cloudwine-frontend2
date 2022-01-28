import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { WeatherstationService } from 'src/app/super-admin/weatherstations/weatherstation.service';
import { Weatherstation } from 'src/app/super-admin/weatherstations/weatherstation';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-general-alarm-form',
  templateUrl: './general-alarm-form.component.html',
  styleUrls: ['./general-alarm-form.component.scss']
})
export class GeneralAlarmFormComponent implements OnInit {

  weatherstation: Weatherstation = { id: 0, organisation_id: null, name: "", gsm: "", relais_name: "", latitude: "", longitude: "", is_active: false, is_public: false, is_location_alarm: false, is_no_data_alarm: false, number_of_cycles: 0, is_manual_relais: false, organisation: null }
  weatherstationId: number = 0;

  isSubmitted: boolean = false;
  errorMessage: string = "";

  weatherstation$: Subscription = new Subscription();
  putWeatherstation$: Subscription = new Subscription();

  constructor(private _location: Location, private router: Router, private weatherstationService: WeatherstationService ) {
    this.weatherstationId = +this.router.getCurrentNavigation()?.extras.state?.id;
    console.log(this.weatherstationId);

    if (this.weatherstationId != null && this.weatherstationId > 0) {
      this.weatherstationService.getWeatherstationById(this.weatherstationId).subscribe(result => this.weatherstation = result);
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.weatherstation$.unsubscribe();
    this.putWeatherstation$.unsubscribe();
  }

  goBack() {
    this._location.back();
  }

  onSubmit() {
    this.putWeatherstation$ = this.weatherstationService.putWeatherstation(this.weatherstationId, this.weatherstation).subscribe(result => {
      //all went well
      this.router.navigateByUrl("/admin/alarms/" + this.weatherstationId);
    },
    error => {
      this.errorMessage = error.message;
    });
  }
}
