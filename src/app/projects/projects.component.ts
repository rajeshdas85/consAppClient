import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatRadioChange } from '@angular/material';
import { AddnewprojectComponent } from 'app/addnewproject/addnewproject.component';

import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Project, PillingInfoByProjectID, OtherInfoByProjectID, PileEntry, ProjectRecording, ProjectHistory } from "app/_model/project";
import { ProjectService } from "app/_service/project.service";
import * as moment from 'moment/moment';
import { ProjectDetailsComponent } from "app/project-details/project-details.component";


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  isDisplayBOM: boolean = false;
  loading: boolean;
  private project: Project = new Project();
  private pillingInfoByProjectID: PillingInfoByProjectID = new PillingInfoByProjectID();
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
  //arrayRadioBtn = ['Yes', 'No'];

  arrayRadioBtn = [
    { "name": "Yes", ID: "D1", "checked": false},
    { "name": "No",  ID: "D2", "checked": true}
]


  selectedRadioBtn: string;
  isSelectedRadioBtnYes:boolean=false;
  isAddMorePilling:boolean=false;
  constructor(public dialog: MatDialog, public router: Router,
    private projectService: ProjectService) { }
  ngOnInit() {
    this.selectedRadioBtn = this.arrayRadioBtn[1].name;
    this.projectHistory.projId = "5c18cc7043d443319c9c00d9";
    this.projectHistory.pileNo = this.projectHistory.projId + "-" + "P1P1";
    this.projectHistory.dateOfStarting = new Date();
    this.projectHistory.dateOfEnding = new Date();
    this.projectHistory.pillingRigDetails = "Rajesh Testing";
    this.projectHistory.diaOfPile = 250.60;
    this.projectHistory.casingToplevel = 45.60;
    this.projectHistory.existingToplevel = 6.60;
    this.projectHistory.pillingCutOfflevel = 65.60;
    this.projectHistory.foundinglevel = 9898.65;
    this.projectHistory.emptyBoreDepth = 9879.65;
    this.projectHistory.beforeDepthFromCTL = 665.65;
    this.projectHistory.beforeDepthFromEGL = 989.65;
    this.projectHistory.beforeDepthFromCOL = 616.65;
    this.projectHistory.concreteQtyTheorotical = 546.65;
    this.projectHistory.concreteQtyActual = 99.65;
    this.projectHistory.boringStartTime = "25:65";
    this.projectHistory.boringEndTime = "15:65";
    this.projectHistory.totalBoringTime = "66:65";
    this.projectHistory.cageLoweringStartTime = "69:65";
    this.projectHistory.cageLoweringEndTime = "65:65";
    this.projectHistory.totalTimeForCageLowering = "65:65";
    this.projectHistory.noOfTrimePiecesRequired = 99.65;
    this.projectHistory.noOfTrimePiecesUsed = 99.65;
    this.projectHistory.nameOfSiteEngg = "Rajesh Enter";
    this.projectHistory.siteEnggId = "Rajesh Enter again Data";

    // this.projectService.addProjectHistory(this.projectHistory)
    //     .pipe(first())
    //     .subscribe(
    //     data => {
    //       console.log("Ok");
    //     },
    //     error => {
    //       this.loading = false;
    //     });


    // this.projectService.getAllProjectHistory().pipe(first()).subscribe(productEntry => {
    //   console.log("First");
    //   this.firstProductEntry = productEntry;
    //   console.log(this.firstProductEntry);
    // });

    // this.projectService.updateProjectHistory(this.projectHistory).pipe(first()).subscribe(projct => {
    //     this.chkUpdate = projct;
    //     console.log(this.chkUpdate);
    //   }); 

  }
  // ngOnInit() {

  //   //http://localhost:8080/projects/pileNo/5c18cc7043d443319c9c00d9-P1P1
  //   //getProjectRecordingDtlByPilno
  //   this.pileRecording.projId = "5c18cc7043d443319c9c00d9";
  //   this.pileRecording.pileNo = this.pileRecording.projId + "-" + "P1P1";
  //   this.pileRecording.startDate = new Date();
  //   this.pileRecording.fromTimeOfBoring = "12.50";
  //   this.pileRecording.toTimeOfBoring = "13.50";
  //   this.pileRecording.depthOfBoreFrom = 13.50;
  //   this.pileRecording.depthOfBoreTo =  25.50;
  //   this.pileRecording.finalDepthOfBore = this.pileRecording.depthOfBoreTo -this.pileRecording.depthOfBoreFrom;//;
  //   this.pileRecording.descriptionOfSoil = "bgjhgjhgj";
  //   this.pileRecording.RLOfThePileFrom = 40;
  //   this.pileRecording.RLOfThePileTo = this.pileRecording.RLOfThePileFrom - this.pileRecording.finalDepthOfBore;
  //   this.pileRecording.siteEnggId = "hkjkjhklh";
  //   this.pileRecording.remarks = "ok Tested again ";
  //   this.projectService.addProjectRecording(this.pileRecording)
  //         .pipe(first())
  //         .subscribe(
  //         data => {
  //           // this.projectService.getLastAddProjectEntry().pipe(first()).subscribe(productEntry => {
  //           //   console.log("First");
  //           //   this.firstProductEntry = productEntry;
  //           //   console.log(this.firstProductEntry);
  //           // });
  //           console.log("Ok");
  //         },
  //         error => {

  //           this.loading = false;
  //         });

  // }
  // ngOnInit() {
  //   this.pileEntry.projId = "5c18cc7043d443319c9c00d9";
  //   this.pileEntry.pileNo = this.pileEntry.projId + "-" + "P1P1";
  //   this.pileEntry.description = "ok";
  //   this.pileEntry.nameOfCompany = "RKBC";
  //   this.pileEntry.pilingRigDetails = "pilingRigDetails";
  //   this.pileEntry.casingToplevel = 20.65;
  //   this.pileEntry.existingToplevel = 20.65;
  //   this.pileEntry.pillingCutOfflevel = 20.65;
  //   this.pileEntry.cageLengthRequired = 20.65;
  //   this.pileEntry.cageloweringStartTime = "12.25";
  //   this.pileEntry.cageloweringEndTime = "12.50";
  //   this.pileEntry.noOfTrimePiecesRequired = 20;
  //   this.pileEntry.noOfTrimePiecesUsed = 40;
  //   this.pileEntry.siteEnggId = "S1";
  //   this.pileEntry.concretePouring = new Date();


  //   this.projectService.getLastAddProjectEntry().pipe(first()).subscribe(productEntry => {
  //     this.firstProductEntry = productEntry;
  //     console.log(this.firstProductEntry);
  //     if (this.firstProductEntry.length <= 0) {
  //       this.projectService.addProjectEntry(this.pileEntry)
  //         .pipe(first())
  //         .subscribe(
  //         data => {
  //           this.projectService.getLastAddProjectEntry().pipe(first()).subscribe(productEntry => {
  //             console.log("First");
  //             this.firstProductEntry = productEntry;
  //             console.log(this.firstProductEntry);
  //           });
  //         },
  //         error => {

  //           this.loading = false;
  //         });

  //     }

  //   });




  // }
  // ngOnInit() {


  //   this.pillingInfoByProjectID.amount=25;
  //   this.pillingInfoByProjectID.desc="Tested222";
  //   this.pillingInfoByProjectID.financialStatus=3;
  //   this.pillingInfoByProjectID.physicalStatus=4;
  //   this.pillingInfoByProjectID.rate=0;
  //   this.pillingInfoByProjectID.qty=0;
  //   this.arrPillingInfoByProjectID.push(this.pillingInfoByProjectID);

  //   this.otherInfoByProjectID.amount=65.25;
  //   this.otherInfoByProjectID.desc="Tested1Angian";
  //   this.otherInfoByProjectID.financialStatus=4000;
  //   this.otherInfoByProjectID.physicalStatus=0;
  //   this.otherInfoByProjectID.rate=0;
  //   this.otherInfoByProjectID.qty=0;
  //  this.arrOtherInfoByProjectID.push(this.otherInfoByProjectID);

  //   this.project.projDesc="hello";
  //   this.project.projManagerId="PM12";
  //   this.project.projName="RKC123456";

  //   this.project.updateDate = moment().utcOffset(330).format();//moment().format('YYYY-MM-DD HH:MM:ss');
  //    console.log(this.project.updateDate);
  //   console.log(this.project.updateDate.split('T')[1].split('+')[0]);
  //   this.project.DateTest = new Date(moment(this.project.updateDate).format("YYYY-MM-DD HH:MM:ss"));//this.project.updateDate;
  //  console.log(this.project.DateTest);
  //  // this.project.id="5c17a441ada74d1f5cac170c";
  //   this.project.pillingInfoByProjectID=this.arrPillingInfoByProjectID;
  //   this.project.otherInfoByProjectID=this.arrOtherInfoByProjectID;

  //   this.loading = true;
  //   //Adding
  //   // this.projectService.addProject(this.project)
  //   //   .pipe(first())
  //   //   .subscribe(
  //   //   data => {
  //   //    // console.log(data);
  //   //      this.projectService.getLastAddProject().pipe(first()).subscribe(product => {
  //   //      this.lastProduct = product;
  //   //      console.log(this.lastProduct);
  //   // });
  //   //     //this.alertService.success('Added Address successful');
  //   //   //  this.router.navigate(['/Paypal']);
  //   //   },
  //   //   error => {
  //   //     //this.alertService.error(error);
  //   //     this.loading = false;
  //   //   });
  //     //Updating


  //     //  this.projectService.updateProject(this.project).pipe(first()).subscribe(projct => {
  //     //   this.chkUpdate = projct;
  //     //   console.log(this.chkUpdate);
  //     // }); 

  // }
addMorePilling() {
   // this.containers.push(this.containers.length);
   this.isAddMorePilling=true;
  }
  removePilling() {
   // this.containers.push(this.containers.length);
   this.isAddMorePilling=false;
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(AddnewprojectComponent, {
      width: '1000px',
      height: '500px'

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

   showMoreCompDtlsDialog(): void {
    const dialogRef = this.dialog.open(ProjectDetailsComponent, {
      width: '1000px',
      height: '500px'

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  changePage(): void {
    this.isDisplayBOM = true;
    //this.router.navigateByUrl('/table-list');
  }
   radioChange(event: MatRadioChange) {
   // console.log(event);
    console.log(event.value);
    if(event.value=="Yes"){
      this.isSelectedRadioBtnYes=true;
    }
    else{
      this.isSelectedRadioBtnYes=false;
    }
   
  }
}
