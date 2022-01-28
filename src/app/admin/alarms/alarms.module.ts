import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlarmService } from './alarm.service';
import { AlarmFormComponent } from './alarm-form/alarm-form.component';
import { AlarmListComponent } from './alarm-list/alarm-list.component';
import { GeneralAlarmFormComponent } from './general-alarm-form/general-alarm-form.component';

@NgModule({
  declarations: [
    AlarmFormComponent,
    AlarmListComponent,
    GeneralAlarmFormComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    AlarmFormComponent,
    AlarmListComponent,
    GeneralAlarmFormComponent
  ],
  providers: [
    AlarmService
  ]
})
export class AlarmsModule { }
