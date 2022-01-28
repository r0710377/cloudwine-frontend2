import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { GraphType } from 'src/app/dashboard/graph-type';
import { GraphTypeService } from 'src/app/dashboard/graph-type.service';
import { Router } from '@angular/router';
import { AlarmService } from '../alarm.service';
import { Alarm } from '../alarm';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alarm-form',
  templateUrl: './alarm-form.component.html',
  styleUrls: ['./alarm-form.component.scss']
})
export class AlarmFormComponent implements OnInit {

  types: GraphType[] = [];
  graphTypes: GraphType[] = [];

  alarm: Alarm = { id: 0, weather_station_id: 0, graph_type_id: 0, switch_value: 0, operator: "", is_relais: false, is_notification: false,
    graph_type: { id: 0, name: "", description: "", is_filter: false },
    weather_station: { id: 0, organisation_id: null, name: "", gsm: "", relais_name: "", latitude: "", longitude: "", is_active: false, is_public: false, is_location_alarm: false, is_no_data_alarm: false, number_of_cycles: 0, is_manual_relais: false, organisation: null }
  }

  connected_to_relais: string = "";

  isAdd: boolean = false;
  isEdit: boolean = false;
  alarmId: number = 0;
  weatherstationId: number = 0;

  alarm$: Subscription = new Subscription();
  postAlarm$: Subscription = new Subscription();
  putAlarm$: Subscription = new Subscription();

  isSubmitted: boolean = false;
  errorMessage: string = "";

  constructor(private _location: Location, private alarmService: AlarmService ,private graphTypeService: GraphTypeService, private router: Router) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.alarmId = +this.router.getCurrentNavigation()?.extras.state?.id;
    this.weatherstationId = +this.router.getCurrentNavigation()?.extras.state?.weatherstationId;

    if (this.alarmId != null && this.alarmId > 0) {
      this.alarmService.getAlarmById(this.alarmId).subscribe(result => {
        this.alarm = result;
        console.log(this.alarm);

        if (this.alarm != null) {
          this.connected_to_relais = this.alarm.weather_station.relais_name!;
        }
      });
    }

    this.graphTypeService.getTypes().subscribe(result => {
      this.types = result;
      this.filterArray();
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.alarm$.unsubscribe();
    this.postAlarm$.unsubscribe();
    this.putAlarm$.unsubscribe();
  }

  filterArray() {
    this.types.forEach(type => {
      if(type.is_filter) {
        this.graphTypes.push(type);
      }
    });
  }

  goBack() {
    this._location.back();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.alarm.weather_station_id = this.weatherstationId;

      this.postAlarm$ = this.alarmService.postAlarm(this.alarm).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/admin/alarms/" + this.alarm.weather_station_id);
      },
      error => {
        this.errorMessage = error.message;
      });
    }
    if (this.isEdit) {
      this.putAlarm$ = this.alarmService.putAlarm(this.alarmId, this.alarm).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/admin/alarms/" + this.alarm.weather_station_id);
      },
      error => {
        this.errorMessage = error.message;
      });
    }
  }

}
