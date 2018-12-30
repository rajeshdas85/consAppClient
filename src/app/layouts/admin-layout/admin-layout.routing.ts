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
import { ProjectmanagerComponent } from 'app/projectmanager/projectmanager.component';
import { PillingHistoryComponent } from 'app/pilling-history/pilling-history.component';
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
    { path: 'dashboard',                      component: DashboardComponent },
    { path: 'user-profile',                   component: UserProfileComponent },
    { path: 'table-list',                     component: TableListComponent },
    { path: 'typography',                     component: TypographyComponent },
    { path: 'icons',                          component: IconsComponent },
    { path: 'maps',                           component: MapsComponent },
    { path: 'notifications',                  component: NotificationsComponent },
    { path: 'upgrade',                        component: UpgradeComponent },
    { path: 'Companydetails',                 component: CompanydetailsComponent },
    { path: 'project',                       component: ProjectsComponent },
    { path: 'projectdetails',                 component: ProjectDetailsComponent },
    { path: 'projectmanager',                 component: ProjectmanagerComponent },
    { path: 'projecthistory',                 component: PillingHistoryComponent },
    
  //  { path: 'addProjct',                       component: AddProjectComponent },
    
];
