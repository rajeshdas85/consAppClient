import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
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
import { PillingHistoryComponent } from './pilling-history/pilling-history.component';
import { AddPillingComponent } from './add-pilling/add-pilling.component';
import { ProjectRecordingComponent } from './project-recording/project-recording.component';
import { BomEntryComponent } from './bom-entry/bom-entry.component';
import { EditBOMComponent } from './dialogs/edit-bom/edit-bom.component';
import { ProjectUserMappingComponent } from './project-user-mapping/project-user-mapping.component';
import { LoginComponent } from './login/login.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { EditProjectComponent } from './edit-project/edit-project.component';

//import { ProjectmanagerComponent } from './projectmanager/projectmanager.component';
//import { AddProjectComponent } from './add-project/add-project.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    Ng4LoadingSpinnerModule,
    Ng4LoadingSpinnerModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    LoginComponent,
    AppComponent,
    AdminLayoutComponent,
  //  EditProjectComponent,
   // LoginPopUpComponent,
 
    //ProjectUserMappingComponent,
    //EditBOMComponent,
    //BomEntryComponent,
   // ProjectRecordingComponent,
   // AddPillingComponent,
    //PillingHistoryComponent,
  
   // ProjectmanagerComponent,
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
