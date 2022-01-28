import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PublicWeatherstationsComponent } from './public-weatherstations/public-weatherstations.component';

@NgModule({
  declarations: [
    PublicWeatherstationsComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    PublicWeatherstationsComponent
  ]
})
export class PublicWeatherstationsModule { }
