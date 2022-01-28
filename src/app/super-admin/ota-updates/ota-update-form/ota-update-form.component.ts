import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Weatherstation } from '../../weatherstations/weatherstation';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { Subscription } from 'rxjs';
import { WeatherstationService } from '../../weatherstations/weatherstation.service';
import { OtaUpdate } from '../ota-update';
import { OtaUpdateService } from '../ota-update.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { WeatherstationUpdate } from '../weatherstation-update';
import { WeatherstationUpdateService } from '../weatherstation-update.service';

@Component({
  selector: 'app-ota-update-form',
  templateUrl: './ota-update-form.component.html',
  styleUrls: ['./ota-update-form.component.scss']
})
export class OtaUpdateFormComponent implements OnInit, OnDestroy {

  dropdownList: Weatherstation[] = [];
  dropdownSettings: IDropdownSettings = {};

  isAdd: boolean = false;
  isEdit: boolean = false;

  updateId: number = 0;
  update: OtaUpdate = { id: 0, name: "", bin_file_path: "", deploy_on: "" };
  deployDate: string = "";
  deployTime: string = "";

  weatherstations: Weatherstation[] = [];
  weatherstationUpdates: WeatherstationUpdate[] = [];
  oldWeatherstationIds: number[] = [];
  newWeatherstationIds: number[] = [];
  weatherstationsOfUpdate: Weatherstation[] = [];

  isSubmitted: boolean = false;
  errorMessage: string = "";

  minDate: string = "";

  weatherstations$: Subscription = new Subscription();
  weatherstationUpdates$: Subscription = new Subscription();
  addWeatherstationUpdate$: Subscription = new Subscription();
  deleteWeatherstationUpdate$: Subscription = new Subscription();
  weatherstationUpdatesByWeatherstationIdAndUpdateId$: Subscription = new Subscription();
  update$: Subscription = new Subscription();
  postUpdate$: Subscription = new Subscription();
  putUpdate$: Subscription = new Subscription();

  constructor(private router: Router, private _location: Location, private weatherstationService: WeatherstationService, private otaUpdateService: OtaUpdateService, private weatherstationUpdateService: WeatherstationUpdateService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.updateId = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.isAdd) {
      this.getWeatherstations();
    }

    if (this.isEdit && this.updateId != null && this.updateId > 0) {
      this.update$ = this.otaUpdateService.getUpdateById(this.updateId).subscribe(result => {
        this.update = result;
        this.deployDate = moment(result.deploy_on, "DD-M-YY HH:mm:ss").format("YYYY-MM-DD");
        this.deployTime = moment(result.deploy_on, "DD-M-YY HH:mm:ss").format("HH:mm");

        this.getWeatherstations();
      });
    }
  }

  ngOnInit() {
    this.setupMinDate();
  }

  ngOnDestroy(): void {
    this.weatherstations$.unsubscribe();
    this.weatherstationUpdates$.unsubscribe();
    this.addWeatherstationUpdate$.unsubscribe();
    this.deleteWeatherstationUpdate$.unsubscribe();
    this.weatherstationUpdatesByWeatherstationIdAndUpdateId$.unsubscribe();
    this.update$.unsubscribe();
    this.postUpdate$.unsubscribe();
    this.putUpdate$.unsubscribe();
  }

  setupDropdown() {
    this.dropdownList = this.weatherstations;
    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
      enableCheckAll: true,
      selectAllText: "Selecteer alle weerstations",
      unSelectAllText: "Deselecteer alle weerstations",
      noDataAvailablePlaceholderText: "Er zijn geen weerstations beschikbaar.",
      allowSearchFilter: true
    };

    if (this.isEdit) {
      // Get weatherstations of this update (must be exectued after setup of dropdown)
      this.getWeatherstationsOfUpdate(this.update.id);
    }
  }

  setupMinDate() {
    let today = new Date();
    this.minDate = moment(today).format("YYYY-MM-DD");
  }

  isInThePast(): boolean {
    let deployDateFormatted = moment(this.deployDate).format("YYYY-MM-DD");

    let today = new Date();
    let currentTime = today.getTime();
    let deployTimeFormatted = moment(this.deployDate + " " + this.deployTime, "YYYY-MM-DD HH:mm").toDate().getTime();

    // If deployDate = today (or earlier) AND deployTime < currentTime
    if (deployDateFormatted <= this.minDate && deployTimeFormatted < currentTime) {
      return true;
    }
    else {
      return false;
    }
  }

  getWeatherstations() {
    this.weatherstations$ = this.weatherstationService.getWeatherstations().subscribe(result => {
      this.weatherstations = result;
      this.setupDropdown();
    });
  }

  getWeatherstationsOfUpdate(id: number) {
    this.weatherstationUpdates$ = this.weatherstationUpdateService.getWeatherstationUpdatesByUpdateId(id).subscribe(result => {
      this.weatherstationUpdates = result;

      this.weatherstationUpdates.forEach(weatherstationUpdate => {
        if (weatherstationUpdate.weather_station != null) {
          this.weatherstationsOfUpdate.push(weatherstationUpdate.weather_station);
          this.oldWeatherstationIds.push(weatherstationUpdate.weather_station_id);
        }
      });
      this.weatherstationsOfUpdate = [...this.weatherstationsOfUpdate];

      console.log("stations of this update", this.weatherstationsOfUpdate);
    });
  }

  goBack() {
    this._location.back();
  }

  onSubmit() {
    this.isSubmitted = true;

    // Build update.deploy_on using deployDate & deployTime
    let deployOnString = this.deployDate + " " + this.deployTime;
    this.update.deploy_on = moment(deployOnString).format("DD-M-YY HH:mm:ss");
    console.log(this.update);

    if (this.isAdd) {
      // TEMPORARY: hardcoded bin_file_path
      this.update.bin_file_path = "c:/work-in-progress/filenaam";

      this.postUpdate$ = this.otaUpdateService.postUpdate(this.update).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/superadmin/ota-updates");
      },
        error => {
          this.errorMessage = error.message;
        });
    }
    if (this.isEdit) {
      // Update the update itself
      this.putUpdate$ = this.otaUpdateService.putUpdate(this.updateId, this.update).subscribe(result => {
        // Update weatherstationUpdates linked to this update
        this.updateWeatherstationUpdates();
      },
        error => {
          this.errorMessage = error.message;
        });
    }
  }

  updateWeatherstationUpdates() {
    // Fill newWeatherstationIds
    this.weatherstationsOfUpdate.forEach(weatherstation => {
      this.newWeatherstationIds.push(weatherstation.id);
    });
    console.log("old", this.oldWeatherstationIds);
    console.log("new", this.newWeatherstationIds);

    this.createWeatherstationUpdates();
  }

  createWeatherstationUpdates() {
    // Determine which weatherstationUpdates to add
    let weatherstationUpdatesToAdd: number[] = [];
    // Find ids that appear in newWeatherstationIds, but NOT IN oldWeatherstationIds
    weatherstationUpdatesToAdd = this.newWeatherstationIds.filter(id1 => !this.oldWeatherstationIds.some(id2 => id1 === id2));

    console.log("add", weatherstationUpdatesToAdd);

    // Create weatherstationUpdate for each weatherstationUpdatesToAdd
    if (weatherstationUpdatesToAdd.length > 0) {
      let self = this;

      weatherstationUpdatesToAdd.forEach(function (id, index, weatherstationUpdatesToAdd) {
        let newWeatherstationUpdate = {
          id: 0,
          ota_update_id: self.update.id,
          weather_station_id: id,
          ota_update: null,
          weather_station: null
        }

        self.addWeatherstationUpdate$ = self.weatherstationUpdateService.addWeatherstationUpdate(newWeatherstationUpdate).subscribe(result => {
          // After last item to add
          if (index == weatherstationUpdatesToAdd.length - 1) {
            // Delete weatherstationUpdate for each weatherstationUpdatesToDelete
            self.deleteWeatherstationUpdates()
          }
        });
      });
    }
    else {
      // Delete weatherstationUpdate for each weatherstationUpdatesToDelete
      this.deleteWeatherstationUpdates()
    }
  }

  deleteWeatherstationUpdates() {
    // Determine which weatherstationUpdates to delete
    let weatherstationUpdatesToDelete: number[] = [];
    // Find ids that appear in oldWeatherstationIds, but NOT IN newWeatherstationIds
    weatherstationUpdatesToDelete = this.oldWeatherstationIds.filter(id1 => !this.newWeatherstationIds.some(id2 => id1 === id2));

    console.log("delete", weatherstationUpdatesToDelete);

    // Delete weatherstationUpdate for each weatherstationUpdatesToDelete
    if (weatherstationUpdatesToDelete.length > 0) {
      weatherstationUpdatesToDelete.forEach(weatherstation_id => {
        this.weatherstationUpdatesByWeatherstationIdAndUpdateId$ = this.weatherstationUpdateService.getWeatherstationUpdatesByWeatherstationIdAndUpdateId(weatherstation_id, this.update.id).subscribe(result => {
          console.log(result);
          let weatherstationUpdateIdToDelete = result[0].id;

          this.addWeatherstationUpdate$ = this.weatherstationUpdateService.deleteWeatherstationUpdate(weatherstationUpdateIdToDelete).subscribe(result => {
            // Navigate back to Updates-page
            this.router.navigateByUrl("/superadmin/ota-updates");
          });
        });
      });
    }
    else {
      // Navigate back to Updates-page
      this.router.navigateByUrl("/superadmin/ota-updates");
    }
  }

}
