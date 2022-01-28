import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageApp } from 'src/app/shared/datatables/languages';
import { Weatherstation } from 'src/app/super-admin/weatherstations/weatherstation';
import { WeatherstationService } from 'src/app/super-admin/weatherstations/weatherstation.service';

@Component({
  selector: 'app-public-weatherstations',
  templateUrl: './public-weatherstations.component.html',
  styleUrls: ['./public-weatherstations.component.scss']
})
export class PublicWeatherstationsComponent implements OnInit, OnDestroy {

  weatherstations: Weatherstation[] = [];

  weatherstations$: Subscription = new Subscription();

  dtOptions: DataTables.Settings = {};

  constructor(private weatherStationService: WeatherstationService) { }

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
        $('.dataTables_filter label').contents().filter(function(){
          return (this.nodeType == 3);
        }).remove();
        $('.dataTables_length select').css('border-radius', '20px');
      },
      // Make table scrollable on small screens
      "scrollX": true,
      // Disable ordering on dashboard-column
      "columnDefs": [
        { "orderable": false, "targets": 2 }
      ]
    };

    this.getWeatherstations();
  }

  ngOnDestroy(): void {
    this.weatherstations$.unsubscribe();
  }

  getWeatherstations() {
    this.weatherStationService.getPublicWeatherstations().subscribe(result => {
      this.weatherstations = result;
    });
  }

  isArray(object : any ) {
    return Array.isArray(object)
  }
}
