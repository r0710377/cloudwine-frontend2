import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  isSubmitted: boolean = false;
  errorMessage: string = "";

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }

  goBack() {
    this._location.back();
  }

  onSubmit() {

  }

}
