import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { CompanydetailsComponent } from 'app/companydetails/companydetails.component';
import { ProjectsComponent } from 'app/projects/projects.component';
import { ProjectDetailsComponent } from 'app/project-details/project-details.component';
import { PillingHistoryComponent } from 'app/pilling-history/pilling-history.component';
import { ProjectRecordingComponent } from "app/project-recording/project-recording.component";
//import { LoginComponent } from 'app/login/login.component';
import { AuthGuard } from 'app/_guards/auth.guard';
import { UserEntryComponent } from "app/UserEntry/UserEntry.component";

//import { AddProjectComponent } from 'app/add-project/add-project.component';

export const AdminLayoutRoutes: Routes = [
  // {
  //   path: '',
  //   children: [ {
  //     path: 'dashboard',
  //     component: DashboardComponent
  // }]}, {
  // path: '',
  // children: [ {
  //   path: 'userprofile',
  //   component: UserProfileComponent
  // }]
  // }, {
  //   path: '',
  //   children: [ {
  //     path: 'icons',
  //     component: IconsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'notifications',
  //         component: NotificationsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'maps',
  //         component: MapsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'typography',
  //         component: TypographyComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'upgrade',
  //         component: UpgradeComponent
  //     }]
  // }


  // { path: 'login', component: LoginComponent },
   {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent,canActivate:[AuthGuard] },
  { path: 'table-list', component: TableListComponent ,canActivate:[AuthGuard]},
  { path: 'typography', component: TypographyComponent ,canActivate:[AuthGuard]},
  { path: 'icons', component: IconsComponent ,canActivate:[AuthGuard]},
  { path: 'maps', component: MapsComponent,canActivate:[AuthGuard] },
  { path: 'notifications', component: NotificationsComponent ,canActivate:[AuthGuard]},
  { path: 'upgrade', component: UpgradeComponent,canActivate:[AuthGuard] },
  { path: 'Companydetails', component: CompanydetailsComponent,canActivate:[AuthGuard] },
  { path: 'project', component: ProjectsComponent ,canActivate:[AuthGuard]},
  { path: 'projectdetails', component: ProjectDetailsComponent,canActivate:[AuthGuard] },
  { path: 'userentry', component: UserEntryComponent,canActivate:[AuthGuard] },
  { path: 'projecthistory', component: PillingHistoryComponent,canActivate:[AuthGuard] },
  { path: 'projectrecording/:pileNo', component: ProjectRecordingComponent,canActivate:[AuthGuard] },



  //  { path: 'addProjct',                       component: AddProjectComponent },

];
