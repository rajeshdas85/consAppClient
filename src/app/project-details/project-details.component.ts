import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatRadioChange, DEC } from '@angular/material';
import { PillingInfoByProjectID1, PillingInfoByProjectID2, OtherInfoByProjectID, Project, MessageType } from 'app/_model/project';
import { ProjectService } from 'app/_service/project.service';
import { MessageService } from 'app/_service/message.service';
import { first } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmValidParentMatcher, errorMessages, CustomValidators, regExps } from 'app/_model/custom-validators';
import { Router } from '@angular/router';
import { Guid } from "guid-typescript";
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  private project: Project = new Project();
  private pillingInfoByProjectID1: PillingInfoByProjectID1 = new PillingInfoByProjectID1();
  private pillingInfoByProjectID2: PillingInfoByProjectID2 = new PillingInfoByProjectID2();

  private otherInfoByProjectID: OtherInfoByProjectID = new OtherInfoByProjectID();
  lstSelectedProject = [];
  arrPillingInfoByProjectID1 = [];
  arrPillingInfoByProjectID2 = [];
  arrOtherInfoByProjectID = [];
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
  otherData = {
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
  constructor(
    private messageService: MessageService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    public router: Router

  ) {
    //this.createForm();
  }

  ngOnInit() {
    this.selectedRadioBtn = this.arrayRadioBtn[1].name;
    if (localStorage.getItem("selectedProject")) {
      this.lstSelectedProject.push(JSON.parse(localStorage.getItem("selectedProject")));
      //  console.log(this.lstSelectedProject);
      this.project.id = this.lstSelectedProject[0].id;

      this.P1Data.desc = this.lstSelectedProject[0].pillingInfoByProjectID1[0].desc;
      this.P1Data.rate = this.lstSelectedProject[0].pillingInfoByProjectID1[0].rate;
      this.P1Data.qty = this.lstSelectedProject[0].pillingInfoByProjectID1[0].qty;
      this.P1Data.amount = this.lstSelectedProject[0].pillingInfoByProjectID1[0].amount;
      this.P1Data.id = this.lstSelectedProject[0].pillingInfoByProjectID1[0].id;
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

      this.otherData.desc = this.lstSelectedProject[0].otherInfoByProjectID[0].desc;
      this.otherData.rate = this.lstSelectedProject[0].otherInfoByProjectID[0].rate;
      this.otherData.qty = this.lstSelectedProject[0].otherInfoByProjectID[0].qty;
      this.otherData.amount = this.lstSelectedProject[0].otherInfoByProjectID[0].amount;
      this.otherData.id = this.lstSelectedProject[0].otherInfoByProjectID[0].id;

      if (this.otherData.id != null) {
        this.isEditOther = true;
      }
    }

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
    localStorage.setItem("pHistoryView",categoryId);
    this.router.navigateByUrl('/projecthistory');
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
  createForm() {
    this.PillingAddForm = this.formBuilder.group({
      desc: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]],
      qty: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(3),
        Validators.maxLength(6)
      ]],
      rate: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(3),
        Validators.maxLength(6)
      ]]
    });
  }
  changeRate() {
    this.P1Data.amount = this.P1Data.rate * this.P1Data.qty;
  }
  changeRateP2() {
    this.P2Data.amount = this.P2Data.rate * this.P2Data.qty;
  }
  changeRateOther() {
    this.otherData.amount = this.otherData.rate * this.otherData.qty;
  }
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

    //Others
    //this.otherId = Guid.create();
    this.otherInfoByProjectID.id = this.otherData.id;

    this.otherInfoByProjectID.desc = this.otherData.desc;
    this.otherInfoByProjectID.financialStatus = 0;
    this.otherInfoByProjectID.physicalStatus = 0;
    this.otherInfoByProjectID.rate = this.otherData.rate;
    this.otherInfoByProjectID.qty = this.otherData.qty;
    this.otherInfoByProjectID.amount = this.otherInfoByProjectID.rate * this.otherInfoByProjectID.qty;
    this.arrOtherInfoByProjectID.push(this.otherInfoByProjectID);

    //Assigning P1,P2 and others
    this.project.pillingInfoByProjectID1 = this.arrPillingInfoByProjectID1;
    this.project.pillingInfoByProjectID2 = this.arrPillingInfoByProjectID2;
    this.project.otherInfoByProjectID = this.arrOtherInfoByProjectID;

    this.projectService.updateProject(this.project).pipe(first()).subscribe(projct => {
      this.chkUpdate = projct;
      this.messageService.show("Pilling Updated successfully", MessageType.Success)
      this.router.navigateByUrl('/project');
    });
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

    //Others
    //checking other amount is greater then 0 then creating GUID
    if (this.otherData.amount > 0) {
      this.otherId = Guid.create();
      this.otherInfoByProjectID.id = this.otherId.value;

      this.otherInfoByProjectID.desc = this.otherData.desc;
      this.otherInfoByProjectID.financialStatus = 0;
      this.otherInfoByProjectID.physicalStatus = 0;
      this.otherInfoByProjectID.rate = this.otherData.rate;
      this.otherInfoByProjectID.qty = this.otherData.qty;
      this.otherInfoByProjectID.amount = this.otherInfoByProjectID.rate * this.otherInfoByProjectID.qty;
      this.arrOtherInfoByProjectID.push(this.otherInfoByProjectID);
    }


    //Assigning P1,P2 and others
    this.project.pillingInfoByProjectID1 = this.arrPillingInfoByProjectID1;
    this.project.pillingInfoByProjectID2 = this.arrPillingInfoByProjectID2;
    this.project.otherInfoByProjectID = this.arrOtherInfoByProjectID;

    this.projectService.updateProject(this.project).pipe(first()).subscribe(projct => {
      this.chkUpdate = projct;
      this.messageService.show("Pilling Updated successfully", MessageType.Success)
      // console.log(this.chkUpdate);
      this.router.navigateByUrl('/project');
    });
  }
  // onNoClick(): void {
  //     this.dialogRef.close();
  //   }
}
