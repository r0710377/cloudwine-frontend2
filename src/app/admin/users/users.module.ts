import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from './user.service';
import { WeatherstationUserService } from './weatherstation-user.service';


@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    UserListComponent,
    UserFormComponent
  ],
  providers: [
    UserService,
    WeatherstationUserService

  ]
})
export class UsersModule { }
