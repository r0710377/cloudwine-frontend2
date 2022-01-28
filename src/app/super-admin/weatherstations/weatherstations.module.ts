import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { WeatherstationListComponent } from './weatherstation-list/weatherstation-list.component';
import { WeatherstationFormComponent } from './weatherstation-form/weatherstation-form.component';
import { WeatherstationService } from './weatherstation.service';

@NgModule({
  declarations: [
    WeatherstationListComponent,
    WeatherstationFormComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    WeatherstationListComponent,
    WeatherstationFormComponent
  ],
  providers: [
    WeatherstationService
  ]
})
export class WeatherstationsModule { }
