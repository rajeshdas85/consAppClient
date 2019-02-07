import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CompanydetailsComponent } from 'app/companydetails/companydetails.component';
 import { ProjectsComponent } from 'app/projects/projects.component';
import { AddnewprojectComponent } from 'app/addnewproject/addnewproject.component';
import { ProjectDetailsComponent } from "app/project-details/project-details.component";
import { UserEntryComponent } from 'app/UserEntry/UserEntry.component';
import { PillingHistoryComponent } from 'app/pilling-history/pilling-history.component';
import { AddPillingComponent } from 'app/add-pilling/add-pilling.component';
import { ProjectRecordingComponent } from "app/project-recording/project-recording.component";
import { BomEntryComponent } from "app/bom-entry/bom-entry.component";
import { EditBOMComponent } from 'app/dialogs/edit-bom/edit-bom.component';
import { ProjectUserMappingComponent } from 'app/project-user-mapping/project-user-mapping.component';
import { EditProjectComponent } from "app/edit-project/edit-project.component";
import { EditUserComponent } from "app/dialogs/edit-user/edit-user.component";
//import { LoginComponent } from 'app/login/login.component';


@NgModule({
  imports: [
    CommonModule,
    MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  FormsModule,
  ReactiveFormsModule,
  NgxMatSelectSearchModule,
  RouterModule.forChild(AdminLayoutRoutes),
  ], 
  entryComponents: [ AddnewprojectComponent,UserEntryComponent,AddPillingComponent,BomEntryComponent,EditBOMComponent,ProjectUserMappingComponent,EditProjectComponent,EditUserComponent],
  declarations: [
  //  LoginComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    CompanydetailsComponent,
    ProjectsComponent,
    AddnewprojectComponent,
    ProjectDetailsComponent,
    UserEntryComponent,
    PillingHistoryComponent,
    AddPillingComponent,
    ProjectRecordingComponent,
    BomEntryComponent,
    EditBOMComponent,
    ProjectUserMappingComponent,
    EditProjectComponent,
    EditUserComponent,
  ],
  
})

export class AdminLayoutModule {}
