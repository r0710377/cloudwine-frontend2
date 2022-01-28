import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageApp } from 'src/app/shared/datatables/languages';
import { Organisation } from '../organisation';
import { OrganisationService } from '../organisation.service';

@Component({
  selector: 'app-organisation-list',
  templateUrl: './organisation-list.component.html',
  styleUrls: ['./organisation-list.component.scss']
})
export class OrganisationListComponent implements OnInit {
  organisations: Organisation[] = [];

  dtOptions: DataTables.Settings = {};

  constructor(private router: Router, private organisationService: OrganisationService) { }

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
      // Disable ordering on actions-column
      "columnDefs": [
        { "orderable": false, "targets": 5 }
      ]
    };

    this.organisationService.getOrganisations().subscribe(result => this.organisations = result);
  }

  add() {
    this.router.navigate(['superadmin/organisations/form'], {state: {mode: "add"}});
  }

  edit(id: number) {
    this.router.navigate(['superadmin/organisations/form'], {state: {id: id, mode: "edit"}})
  }
}
