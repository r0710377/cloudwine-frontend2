import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageApp } from 'src/app/shared/datatables/languages';
import { OtaUpdate } from '../ota-update';
import { OtaUpdateService } from '../ota-update.service';
import * as moment from 'moment';
import { WeatherstationUpdateService } from '../weatherstation-update.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ota-update-list',
  templateUrl: './ota-update-list.component.html',
  styleUrls: ['./ota-update-list.component.scss']
})
export class OtaUpdateListComponent implements OnInit, OnDestroy {

  errorMessage: string = "";

  updates: OtaUpdate[] = [];

  dtOptions: DataTables.Settings = {};

  weatherstationUpdates$: Subscription = new Subscription();
  deleteWeatherstationUpdate$: Subscription = new Subscription();

  constructor(private router: Router, private otaUpdateService: OtaUpdateService, private weatherstationUpdateService: WeatherstationUpdateService) { }

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
      "columnDefs": [
        // Disable ordering on time + actions-columns
        { "orderable": false, "targets": [1, 4] },
        // Date + time sorting
        { "type": "date-eu", "targets": 0 },
        { "orderData": [0, 1], "targets": 0 }
      ]
    };

    this.getUpdates();
  }

  ngOnDestroy(): void {
    this.weatherstationUpdates$.unsubscribe();
    this.deleteWeatherstationUpdate$.unsubscribe();
  }

  getUpdates() {
    this.otaUpdateService.getOtaUpdates().subscribe(result => this.updates = result);
    console.log(this.updates);
  }

  add() {
    this.router.navigate(['superadmin/ota-updates/form'], { state: { mode: "add" } });
  }

  edit(id: number) {
    this.router.navigate(['superadmin/ota-updates/form'], { state: { id: id, mode: "edit" } })
  }

  delete(id: number) {
    if (confirm("Weet u zeker dat je deze geplande update wilt verwijderen?")) {
      this.otaUpdateService.deleteUpdate(id).subscribe(result => {
        // Refresh updates
        this.getUpdates();
      },
        error => {
          this.errorMessage = error.message;
        });
    }
  }

  convertToDate(deploy_on: string): Date {
    return moment(deploy_on, "DD-M-YY HH:mm:ss").toDate();
  }

  isPlanned(update: OtaUpdate): boolean {
    let today = new Date();
    let deployDate = this.convertToDate(update.deploy_on);

    if (deployDate > today) {
      return true
    }
    else {
      return false
    }
  }
}
