import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SecurityComponent } from './security/security.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from 'src/app/security/security.interceptor';


@NgModule({
  declarations: [
    ChangePasswordComponent,
    SecurityComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ChangePasswordComponent,
    SecurityComponent
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    }
  ]
})
export class SecurityModule { }
