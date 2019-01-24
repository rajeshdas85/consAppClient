import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatRadioChange, DEC, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { PillingInfoByProjectID1, PillingInfoByProjectID2, OtherInfoByProjectID, Project, MessageType } from 'app/_model/project';
import { ProjectService } from 'app/_service/project.service';
import { MessageService } from 'app/_service/message.service';
import { first } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmValidParentMatcher, errorMessages, CustomValidators, regExps } from 'app/_model/custom-validators';
import { Router } from '@angular/router';
import { Guid } from "guid-typescript";
import { ViewChild } from "@angular/core";
import { ViewContainerRef } from "@angular/core";
import { ComponentFactoryResolver } from "@angular/core";
import { BomEntryComponent } from "app/bom-entry/bom-entry.component";
import { ElementRef } from "@angular/core";
import { User } from "app/_model/user";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  @ViewChild('parent', { read: ViewContainerRef }) container: ViewContainerRef;

  private project: Project = new Project();
  private pillingInfoByProjectID1: PillingInfoByProjectID1 = new PillingInfoByProjectID1();
  private pillingInfoByProjectID2: PillingInfoByProjectID2 = new PillingInfoByProjectID2();


  lstSelectedProject = [];
  lstStaff = [];
  arrPillingInfoByProjectID1 = [];
  arrPillingInfoByProjectID2 = [];
  //arrOtherInfoByProjectID = [];

  arrayRadioBtn = [
    { "name": "Yes", ID: "D1", "checked": false },
    { "name": "No", ID: "D2", "checked": true }
  ]

  P1Data = {
    id: '',
    desc: '',
    qty: 0,
    rate: 0,
    amount: 0
  };
  P2Data = {
    id: '',
    desc: '',
    qty: 0,
    rate: 0,
    amount: 0
  };

  chkUpdate: any;
  selectedRadioBtn: string;
  isSelectedRadioBtnYes: boolean = false;
  isAddMorePilling: boolean = false;
  PillingAddForm: FormGroup;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  P1Id: any;
  P2Id: any;
  otherId: any;
  isEditP1: boolean = false;
  isEditP2: boolean = false;
  isEditOther: boolean = false;
  dataSource: any;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] =
  [
    'srNo','fullName', 'email', 
    'empTypeId','isAdmin', 'idProof'
   
  ];


  constructor(
    private messageService: MessageService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    public router: Router,
    private _cfr: ComponentFactoryResolver

  ) {
    //this.createForm();
  }

  ngOnInit() {
    this.addComponent();
    this.selectedRadioBtn = this.arrayRadioBtn[0].name;
    if (localStorage.getItem("selectedProject")) {
      this.lstSelectedProject.push(JSON.parse(localStorage.getItem("selectedProject")));
      console.log(this.lstSelectedProject);
      this.project.id = this.lstSelectedProject[0].id;

      this.P1Data.desc = this.lstSelectedProject[0].pillingInfoByProjectID1[0].desc;
      this.P1Data.rate = this.lstSelectedProject[0].pillingInfoByProjectID1[0].rate;
      this.P1Data.qty = this.lstSelectedProject[0].pillingInfoByProjectID1[0].qty;
      this.P1Data.amount = this.lstSelectedProject[0].pillingInfoByProjectID1[0].amount;
      this.P1Data.id = this.lstSelectedProject[0].pillingInfoByProjectID1[0].id;
      if (this.P1Data.amount > 0) {
        this.selectedRadioBtn = this.arrayRadioBtn[0].name;
        this.isSelectedRadioBtnYes = true;
        this.arrayRadioBtn = [
          { "name": "Yes", ID: "D1", "checked": true }
        ]
      }
      if (this.P1Data.id != null) {
        this.isEditP1 = true;
      }

      this.P2Data.desc = this.lstSelectedProject[0].pillingInfoByProjectID2[0].desc;
      this.P2Data.rate = this.lstSelectedProject[0].pillingInfoByProjectID2[0].rate;
      this.P2Data.qty = this.lstSelectedProject[0].pillingInfoByProjectID2[0].qty;
      this.P2Data.amount = this.lstSelectedProject[0].pillingInfoByProjectID2[0].amount;
      this.P2Data.id = this.lstSelectedProject[0].pillingInfoByProjectID2[0].id;

      if (this.P2Data.id != null) {
        this.isEditP2 = true;
      }

    }

  }
  addComponent() {
    var comp = this._cfr.resolveComponentFactory(BomEntryComponent);
    var bomEntryComponent = this.container.createComponent(comp);
    bomEntryComponent.instance._ref = bomEntryComponent;
  }
  addMorePilling() {
    // this.containers.push(this.containers.length);
    this.isAddMorePilling = true;
  }
  removePilling() {
    // this.containers.push(this.containers.length);
    this.isAddMorePilling = false;
  }

  goToHistory(categoryId) {
    localStorage.setItem("pHistoryView", categoryId);
    this.router.navigateByUrl('/admin/projecthistory');
  }
  radioChange(event: MatRadioChange) {
    // console.log(event);
    // console.log(event.value);
    if (event.value == "Yes") {
      this.isSelectedRadioBtnYes = true;
    }
    else {
      this.isSelectedRadioBtnYes = false;
    }

  }

  changeRate() {
    this.P1Data.amount = this.P1Data.rate * this.P1Data.qty;
  }
  changeRateP2() {
    this.P2Data.amount = this.P2Data.rate * this.P2Data.qty;
  }
  // changeRateOther() {
  //   this.otherData.amount = this.otherData.rate * this.otherData.qty;
  // }
  updatePillingDataWithUniqueID() {
    //Pilling 1

    //  this.P1Id = Guid.create();
    this.pillingInfoByProjectID1.id = this.P1Data.id;
    this.pillingInfoByProjectID1.desc = this.P1Data.desc;
    this.pillingInfoByProjectID1.financialStatus = 0;
    this.pillingInfoByProjectID1.physicalStatus = 0;
    this.pillingInfoByProjectID1.rate = this.P1Data.rate;
    this.pillingInfoByProjectID1.qty = this.P1Data.qty;
    this.pillingInfoByProjectID1.amount = this.pillingInfoByProjectID1.rate * this.pillingInfoByProjectID1.qty;

    this.arrPillingInfoByProjectID1.push(this.pillingInfoByProjectID1);

    //Pilling 2
    // this.P2Id = Guid.create();
    this.pillingInfoByProjectID2.id = this.P2Data.id;

    this.pillingInfoByProjectID2.desc = this.P2Data.desc;
    this.pillingInfoByProjectID2.financialStatus = 0;
    this.pillingInfoByProjectID2.physicalStatus = 0;
    this.pillingInfoByProjectID2.rate = this.P2Data.rate;
    this.pillingInfoByProjectID2.qty = this.P2Data.qty;
    this.pillingInfoByProjectID2.amount = this.pillingInfoByProjectID2.rate * this.pillingInfoByProjectID2.qty;
    this.arrPillingInfoByProjectID2.push(this.pillingInfoByProjectID2);



    //Assigning P1,P2 and others
    this.project.pillingInfoByProjectID1 = this.arrPillingInfoByProjectID1;
    this.project.pillingInfoByProjectID2 = this.arrPillingInfoByProjectID2;
    // this.project.otherInfoByProjectID = this.arrOtherInfoByProjectID;

    this.projectService.updateProject(this.project).pipe(first()).subscribe(projct => {
      this.chkUpdate = projct;
      this.messageService.showNotification("","","Pilling Updated successfully", MessageType.Success)
      this.router.navigateByUrl('/admin/project');
    });
  }

  changeTab(_tab) {
    if (_tab.index == 1) {
      this.projectService.getMappingStaffDtlsByProject(this.lstSelectedProject[0].id).pipe(first()).subscribe(lstStaff => {
        this.lstStaff = lstStaff;
        this.dataSource = new MatTableDataSource<User>(this.lstStaff);
       // console.log(this.dataSource);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });

    }
  }
  updatePillingData() {
    //Pilling 1
    //checking radio button is  Yes  then creating GUID
    if (this.selectedRadioBtn != "No") {
      this.P1Id = Guid.create();
      this.pillingInfoByProjectID1.id = this.P1Id.value;
    }
    else {
      this.pillingInfoByProjectID1.id = null;
    }

    this.pillingInfoByProjectID1.desc = this.P1Data.desc;
    this.pillingInfoByProjectID1.financialStatus = 0;
    this.pillingInfoByProjectID1.physicalStatus = 0;
    this.pillingInfoByProjectID1.rate = this.P1Data.rate;
    this.pillingInfoByProjectID1.qty = this.P1Data.qty;
    this.pillingInfoByProjectID1.amount = this.pillingInfoByProjectID1.rate * this.pillingInfoByProjectID1.qty;

    this.arrPillingInfoByProjectID1.push(this.pillingInfoByProjectID1);

    //Pilling 2
    //checking row is added or not then creating GUID
    if (this.isAddMorePilling) {
      this.P2Id = Guid.create();
      this.pillingInfoByProjectID2.id = this.P2Id.value;

    }
    else {
      this.pillingInfoByProjectID2.id = null;
    }
    this.pillingInfoByProjectID2.desc = this.P2Data.desc;
    this.pillingInfoByProjectID2.financialStatus = 0;
    this.pillingInfoByProjectID2.physicalStatus = 0;
    this.pillingInfoByProjectID2.rate = this.P2Data.rate;
    this.pillingInfoByProjectID2.qty = this.P2Data.qty;
    this.pillingInfoByProjectID2.amount = this.pillingInfoByProjectID2.rate * this.pillingInfoByProjectID2.qty;
    this.arrPillingInfoByProjectID2.push(this.pillingInfoByProjectID2);



    //Assigning P1,P2 and others
    this.project.pillingInfoByProjectID1 = this.arrPillingInfoByProjectID1;
    this.project.pillingInfoByProjectID2 = this.arrPillingInfoByProjectID2;
    //this.project.otherInfoByProjectID = this.arrOtherInfoByProjectID;

    this.projectService.updateProject(this.project).pipe(first()).subscribe(projct => {
      this.chkUpdate = projct;
      this.messageService.showNotification("","","Pilling Updated successfully", MessageType.Success)
      // console.log(this.chkUpdate);
      this.router.navigateByUrl('/admin/dashboard');
    });
  }
  // onNoClick(): void {
  //     this.dialogRef.close();
  //   }
}
