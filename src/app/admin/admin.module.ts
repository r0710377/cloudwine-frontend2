import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersModule } from './users/users.module';
import { AlarmsModule } from './alarms/alarms.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from 'src/app/security/security.interceptor';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    UsersModule,
    AlarmsModule
  ],
  exports: [
    UsersModule,
    AlarmsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    }
  ]
})
export class AdminModule { }
