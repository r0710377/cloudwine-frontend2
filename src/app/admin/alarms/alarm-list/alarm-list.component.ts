import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LanguageApp } from 'src/app/shared/datatables/languages';
import { Weatherstation } from 'src/app/super-admin/weatherstations/weatherstation';
import { WeatherstationService } from 'src/app/super-admin/weatherstations/weatherstation.service';
import { Alarm } from '../alarm';
import { AlarmService } from '../alarm.service';

@Component({
  selector: 'app-alarm-list',
  templateUrl: './alarm-list.component.html',
  styleUrls: ['./alarm-list.component.scss']
})
export class AlarmListComponent implements OnInit, OnDestroy {

  alarms: Alarm[] = [];
  weatherstationId: number = 0;

  weatherstations: Weatherstation[] = [];
  weatherstations$: Subscription = new Subscription();

  dtOptions: DataTables.Settings = {};

  constructor(private router: Router, private alarmService: AlarmService, private route: ActivatedRoute, private weatherstationService: WeatherstationService) { }

  ngOnInit(): void {
    this.dtOptions = {
      // Translate text of datables to dutch
      language: LanguageApp.dutch_datatables,
      // Change layout of datatables content
      drawCallback: function () {
        $('.table-responsive .row:last-child').addClass("py-2");
        $('.dataTables_wrapper').addClass("mt-2");
        $('.previous .page-link').css('border-radius', '20px 0 0 20px');
        $('.next .page-link').css('border-radius', '0 20px 20px 0');
        $('.dataTables_filter input').css({
          'border-radius': '20px',
          'border': '1px solid #7E1B27',
          'background-image': 'url("/assets/icons/search.svg")',
          'background-repeat': 'no-repeat',
          'background-size': '20px 20px',
          'background-position': '93% center'
        })
          .attr('placeholder', '...');
        $('.dataTables_filter label').contents().filter(function () {
          return (this.nodeType == 3);
        }).remove();
        $('.dataTables_length select').css('border-radius', '20px');
      },
      // Make table scrollable on small screens
      "scrollX": true,
      // Disable ordering on actions-column
      "columnDefs": [
        { "orderable": false, "targets": 3 }
      ]
    };

    this.getWeatherstations();

    const weatherstationId2 = this.route.snapshot.paramMap.get('id');
    if (weatherstationId2 != null) {
      this.weatherstationId = +weatherstationId2;
    }

    // id vervangen door (eerste) weatherstation van de organisatie van de ingelogde user
    this.getAlarmsByWeatherstationId(this.weatherstationId);

    // When parameter in route is changed
    this.route.params.subscribe(params => {
      let newWeatherstationId = +params['id'];

      // Refresh weatherstationId + reload alarms
      this.weatherstationId = newWeatherstationId;
      this.getAlarmsByWeatherstationId(newWeatherstationId);
    });
  }

  ngOnDestroy(): void {
    this.weatherstations$.unsubscribe();
  }

  getAlarmsByWeatherstationId(id: number) {
    this.alarmService.getAlarmsByWeatherstationId(this.weatherstationId).subscribe(result => {
      this.alarms = result;
    });
  }

  add(weatherstationId: number) {
    this.router.navigate(['admin/alarms/' + weatherstationId + '/form'], { state: { weatherstationId: weatherstationId, mode: "add" } });
  }

  edit(weatherstationId: number, id: number) {
    this.router.navigate(['admin/alarms/' + weatherstationId + '/form'], { state: { id: id, mode: "edit" } })
  }

  editGeneralSettings(weatherstationId: number) {
    this.router.navigate(['admin/alarms/' + weatherstationId + '/general-alarm-form'], { state: { id: weatherstationId, mode: "edit" } })
  }

  getWeatherstations() {
    this.weatherstations$ = this.weatherstationService.getWeatherstations().subscribe(result => {
      this.weatherstations = result;
      console.log(this.weatherstations);
    });
  }

  changeWeatherstation(newWeatherstationId: any) {
    this.router.navigate(['/admin/alarms', newWeatherstationId]);
  }
}
