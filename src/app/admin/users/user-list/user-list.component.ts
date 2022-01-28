import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageApp } from 'src/app/shared/datatables/languages';
import { User } from '../../../security/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  dtOptions: DataTables.Settings = {};

  constructor(private router: Router, private userService: UserService) { }

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

    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(result => this.users = result);
  }

  add() {
    this.router.navigate(['admin/users/form'], {state: {mode: "add"}});
  }

  edit(id: number) {
    this.router.navigate(['admin/users/form'], {state: {id: id, mode: "edit"}})
  }

  isArray(object : any ) {
    return Array.isArray(object)
  }
}
