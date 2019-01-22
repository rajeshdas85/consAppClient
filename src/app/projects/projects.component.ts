import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatRadioChange } from '@angular/material';
import { AddnewprojectComponent } from 'app/addnewproject/addnewproject.component';

import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Project, OtherInfoByProjectID, PileEntry, ProjectRecording, ProjectHistory, MessageType, EMPData } from "app/_model/project";
import { ProjectService } from "app/_service/project.service";
import * as moment from 'moment/moment';
import { ProjectDetailsComponent } from "app/project-details/project-details.component";
import { MessageService } from "app/_service/message.service";
import { ProjectManagerService } from 'app/_service/project-manager.service';
import { ProjectUserMappingComponent } from 'app/project-user-mapping/project-user-mapping.component';
import { UserService } from 'app/_service/user.service';
import { UserEntryComponent } from "app/UserEntry/UserEntry.component";


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  isDisplayBOM: boolean = false;
  loading: boolean;
  private project: Project = new Project();
  private otherInfoByProjectID: OtherInfoByProjectID = new OtherInfoByProjectID();
  private pileEntry: PileEntry = new PileEntry();
  private projectRecording: ProjectRecording = new ProjectRecording();
  private projectHistory: ProjectHistory = new ProjectHistory();
  arrProject = [];
  arrPillingInfoByProjectID = [];
  arrOtherInfoByProjectID = [];
  chkUpdate: any;
  lastProduct: any;
  firstProductEntry: any;
  lstArrProject = [];
  //arrayRadioBtn = ['Yes', 'No'];

  arrayRadioBtn = [
    { "name": "Yes", ID: "D1", "checked": false },
    { "name": "No", ID: "D2", "checked": true }
  ]


  selectedRadioBtn: string;
  isSelectedRadioBtnYes: boolean = false;
  isAddMorePilling: boolean = false;
  panelOpenState = false;
  lstProject: any;
  lstAllowedProject= [];
  lstPMName: any;
  lstProjectByName:any;
  lstUser:any;
  isAdmin:boolean=false;
  empID:any;
  public empData: Array<EMPData> = [];
  constructor(public dialog: MatDialog,
    public router: Router,
    private messageService: MessageService,
    private projectManagerService: ProjectManagerService,
    private userService: UserService,
    private projectService: ProjectService) { }
  ngOnInit() {
    if (localStorage.getItem("currentUser")) {
          this.empID = JSON.parse(localStorage.getItem("currentUser"))._id;
          this.isAdmin = JSON.parse(localStorage.getItem("currentUser")).isAdmin;
          //this.getMappingProjectByempId();
          this.getAllAddProject();
        }
    // this.projectService.getLastAddProject().pipe(first()).subscribe(product => {
    //   this.lstProject = product;
    // });
    //this. showUserMappingDialog();

    //this.getAllAddProject();

    //this.getAllPMDetails();

    this.getAllPageAllUserByName();

    this.getAllProjects();
    
  }
  
  addMorePilling() {
    // this.containers.push(this.containers.length);
    this.isAddMorePilling = true;
  }
  removePilling() {
    // this.containers.push(this.containers.length);
    this.isAddMorePilling = false;
  }
  getMappingProjectByempId():void{

  //  this.projectService.getMappingProjectByempId(this.empID).pipe(first()).subscribe(project => {
  //     this.lstProject = project;
  //   });
    // this.lstAllowedProject=[];
    //  this.projectService.getMappingProjectByempId(this.empID).pipe(first()).subscribe(project => {
    //   for (var index = 0; index < project.length; index++) {
    //     var element = project[index].projectId;
    //     this.lstAllowedProject.push(element);
    //   }
    //   if(this.lstAllowedProject.length>0){
    //   this.getAllAddProject();
    //   }
    // });
  }

  getAllAddProject():void{
      if (localStorage.getItem("AllProjectData")) {
       this.lstProject  = JSON.parse(localStorage.getItem("AllProjectData"));
    }

      // this.projectService.getProjectDtlByLoginId(this.lstAllowedProject.join()).pipe(first()).subscribe(project => {
      //       this.lstProject = project;
      //     });
  }

  // getAllAddProject(): void {
  //   this.projectService.getLastAddProject().pipe(first()).subscribe(project => {
  //     this.lstProject = project;
  //   });
  // }
getAllPMDetails():void{
  this.projectManagerService.getPMByName().pipe(first()).subscribe(PMName => {
    this.lstPMName = PMName;
    localStorage.setItem("PMData",JSON.stringify(this.lstPMName));
  });
}

getAllProjects():void{
  this.projectService.getAllProjects().pipe(first()).subscribe(PName => {
    this.lstProjectByName = PName;
    localStorage.setItem("ProjectData",JSON.stringify(this.lstProjectByName));
  });
}



getAllPageAllUserByName():void{

  this.userService.getAllUserByName().pipe(first()).subscribe(user => {
   
    this.lstUser = user;
    localStorage.setItem("UserData",JSON.stringify(this.lstUser));
  });
}
  openDialog(): void {
    const dialogRef = this.dialog.open(AddnewprojectComponent, {
      width: '1000px'
      // ,
      // height: '500px'

    });

    dialogRef.afterClosed().subscribe(result => {
      this.getMappingProjectByempId();
      //  console.log('The dialog was closed texted');
      //location.reload();
      // this.router.navigateByUrl('/dashboard');
    });
  }

  showUserDialog(): void {
    const dialogRef = this.dialog.open(UserEntryComponent, {
      width: '1000px'
      // ,
      // height: '450px'

    });

    dialogRef.afterClosed().subscribe(result => {
        this.getAllPageAllUserByName();
      console.log('The dialog was closed');
    });
  }

  showUserMappingDialog(): void {
    const dialogRef = this.dialog.open(ProjectUserMappingComponent, {
      width: '1000px'
      // ,
      // height: '450px'

    });

    dialogRef.afterClosed().subscribe(result => {
      this.getMappingProjectByempId();
      console.log('The dialog was closed');
    });
  }

  changePage(arrSelectedProject): void {
    localStorage.setItem("selectedProject", JSON.stringify(arrSelectedProject));
    // this.messageService.show("Add BOM Below",MessageType.Info);
    // this.isDisplayBOM = true;
    this.router.navigateByUrl('/admin/projectdetails');
  }

  radioChange(event: MatRadioChange) {
    // console.log(event);
    console.log(event.value);
    if (event.value == "Yes") {
      this.isSelectedRadioBtnYes = true;
    }
    else {
      this.isSelectedRadioBtnYes = false;
    }

  }
}
