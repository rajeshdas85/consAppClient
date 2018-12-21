import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CompanydetailsComponent } from './companydetails/companydetails.component';
import { ProjectsComponent } from './projects/projects.component';
import { AddnewprojectComponent } from './addnewproject/addnewproject.component';
import { HttpClientModule } from "@angular/common/http";
import { ProjectDetailsComponent } from './project-details/project-details.component';
import {MatSnackBarModule} from "@angular/material";
//import { AddProjectComponent } from './add-project/add-project.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
   // ProjectDetailsComponent,
   // AddnewprojectComponent,
   // AddProjectComponent,
    //ProjectsComponent,
    //CompanydetailsComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
