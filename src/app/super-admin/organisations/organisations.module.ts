import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganisationListComponent } from './organisation-list/organisation-list.component';
import { OrganisationFormComponent } from './organisation-form/organisation-form.component';
import { OrganisationService } from './organisation.service';


@NgModule({
  declarations: [
    OrganisationListComponent,
    OrganisationFormComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    OrganisationListComponent,
    OrganisationFormComponent
  ],
  providers: [
    OrganisationService
  ]
})
export class OrganisationsModule { }
