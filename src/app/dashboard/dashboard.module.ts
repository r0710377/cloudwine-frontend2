import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphTypeService } from './graph-type.service';
import { GraphService } from './graph.service';
import { MapComponent } from './map/map.component';
import { ValueService } from './value.service';
import { GraphComponent } from './graph/graph.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { PopupService } from './popup.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    DashboardComponent,
    MapComponent,
    GraphComponent
  ],
  imports: [
    SharedModule,
    NgApexchartsModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [
    DashboardComponent,
    MapComponent,
    GraphComponent
  ],
  providers: [
    GraphService,
    GraphTypeService,
    ValueService,
    PopupService
  ]
})
export class DashboardModule { }
