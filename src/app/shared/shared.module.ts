import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WeatherstationFilterComponent } from './weatherstation-filter/weatherstation-filter.component';
import { OrganisationFilterComponent } from './organisation-filter/organisation-filter.component';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    WeatherstationFilterComponent,
    OrganisationFilterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    AppRoutingModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    WeatherstationFilterComponent,
    OrganisationFilterComponent,
    DataTablesModule,
    AppRoutingModule
  ]
})
export class SharedModule { }
