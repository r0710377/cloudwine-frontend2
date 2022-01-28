import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './admin/users/user-form/user-form.component';
import { UserListComponent } from './admin/users/user-list/user-list.component';
import { AlarmFormComponent } from './admin/alarms/alarm-form/alarm-form.component';
import { AlarmListComponent } from './admin/alarms/alarm-list/alarm-list.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { PublicWeatherstationsComponent } from './public-weatherstations/public-weatherstations/public-weatherstations.component';
import { ChangePasswordComponent } from './security/change-password/change-password.component';
import { OrganisationFormComponent } from './super-admin/organisations/organisation-form/organisation-form.component';
import { OrganisationListComponent } from './super-admin/organisations/organisation-list/organisation-list.component';
import { OtaUpdateFormComponent } from './super-admin/ota-updates/ota-update-form/ota-update-form.component';
import { WeatherstationFormComponent } from './super-admin/weatherstations/weatherstation-form/weatherstation-form.component';
import { WeatherstationListComponent } from './super-admin/weatherstations/weatherstation-list/weatherstation-list.component';
import { EditOrganisationFormComponent } from './user/personal-settings/edit-organisation-form/edit-organisation-form.component';
import { EditProfileFormComponent } from './user/personal-settings/edit-profile-form/edit-profile-form.component';
import { PersonalSettingsComponent } from './user/personal-settings/personal-settings/personal-settings.component';
import { GeneralAlarmFormComponent } from './admin/alarms/general-alarm-form/general-alarm-form.component';
import { OtaUpdateListComponent } from './super-admin/ota-updates/ota-update-list/ota-update-list.component';
import { SecurityComponent } from './security/security/security.component';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'public-weatherstations', component: PublicWeatherstationsComponent },
  { path: 'login', component: SecurityComponent },
  //{ path: 'register', component: SecurityComponent },
  { path: 'logout', component: SecurityComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
  { path: 'dashboard/:id', component: DashboardComponent },

  { path: 'user/personal-settings', component: PersonalSettingsComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
  { path: 'user/personal-settings/profile-form', component: EditProfileFormComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
  { path: 'user/personal-settings/organisation-form', component: EditOrganisationFormComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},
  { path: 'user/change-password', component: ChangePasswordComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard]},

  { path: 'admin/users', component: UserListComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], data: {role: ['admin', 'superadmin']} },
  { path: 'admin/users/form', component: UserFormComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], data: {role: ['admin', 'superadmin']} },
  { path: 'admin/alarms/:id', component: AlarmListComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], data: {role: ['admin', 'superadmin']}},
  { path: 'admin/alarms/:id/form', component: AlarmFormComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], data: {role: ['admin', 'superadmin']}},
  { path: 'admin/alarms/:id/general-alarm-form', component: GeneralAlarmFormComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], data: {role: ['admin', 'superadmin']}},
  { path: 'admin/weatherstations', component: WeatherstationListComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], data: {role: ['admin', 'superadmin']} },
  { path: 'admin/weatherstations/form', component: WeatherstationFormComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], data: {role: ['admin', 'superadmin']}},

  { path: 'superadmin/organisations', component: OrganisationListComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], data: {role: ['superadmin']} },
  { path: 'superadmin/organisations/form', component: OrganisationFormComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], data: {role: ['superadmin']} },
  { path: 'superadmin/ota-updates', component: OtaUpdateListComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], data: {role: ['superadmin']} },
  { path: 'superadmin/ota-updates/form', component: OtaUpdateFormComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], data: {role: ['superadmin']} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
