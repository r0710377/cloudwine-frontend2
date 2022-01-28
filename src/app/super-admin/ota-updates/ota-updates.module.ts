import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OtaUpdateService } from './ota-update.service';
import { OtaUpdateFormComponent } from './ota-update-form/ota-update-form.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OtaUpdateListComponent } from './ota-update-list/ota-update-list.component';
import { WeatherstationUserService } from 'src/app/admin/users/weatherstation-user.service';



@NgModule({
  declarations: [
    OtaUpdateFormComponent,
    OtaUpdateListComponent
  ],
  imports: [
    SharedModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [
    OtaUpdateFormComponent,
    OtaUpdateListComponent
  ],
  providers: [
    OtaUpdateService,
    WeatherstationUserService
  ]
})
export class OtaUpdatesModule { }
