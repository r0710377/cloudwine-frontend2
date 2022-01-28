import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OrganisationsModule } from './organisations/organisations.module';
import { OtaUpdatesModule } from './ota-updates/ota-updates.module';
import { WeatherstationsModule } from './weatherstations/weatherstations.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from 'src/app/security/security.interceptor';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    WeatherstationsModule,
    OrganisationsModule,
    OtaUpdatesModule
  ],
  exports: [
    WeatherstationsModule,
    OrganisationsModule,
    OtaUpdatesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    }
  ]
})
export class SuperAdminModule { }
