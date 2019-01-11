import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MessageService } from "app/_service/message.service";
import { MessageType, Project, OtherInfoByProjectID, PillingInfoByProjectID1, PillingInfoByProjectID2, ProjectHistory } from "app/_model/project";
import { ProjectService } from 'app/_service/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import * as moment from 'moment/moment';
import { ConfirmValidParentMatcher, errorMessages, CustomValidators, regExps } from 'app/_model/custom-validators';

@Component({
  selector: 'app-add-pilling',
  templateUrl: './add-pilling.component.html',
  styleUrls: ['./add-pilling.component.scss']
})
export class AddPillingComponent implements OnInit {
  private project: Project = new Project();
  // lstProduct: any;
  PillingAddForm: FormGroup;
  lstSelectedProject = [];
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  private projectHistory: ProjectHistory = new ProjectHistory();
  firstProductEntry: any;
  pillingInfoByProjectID1: any;
  pillingInfoByProjectID2: any;
  otherInfoByProjectID: any;
  errors = errorMessages;
  constructor(public dialogRef: MatDialogRef<AddPillingComponent>,
    private messageService: MessageService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (localStorage.getItem("selectedProject")) {
      this.lstSelectedProject.push(JSON.parse(localStorage.getItem("selectedProject")));
      console.log(this.lstSelectedProject);
    }

    if (localStorage.getItem("pHistoryView") == "P1") {
      this.projectHistory.uniqueId = this.lstSelectedProject[0].pillingInfoByProjectID1[0].id;
    }
    if (localStorage.getItem("pHistoryView") == "P2") {
      this.projectHistory.uniqueId = this.lstSelectedProject[0].pillingInfoByProjectID2[0].id;
    }
    if (localStorage.getItem("pHistoryView") == "Other") {
      this.projectHistory.uniqueId = this.lstSelectedProject[0].otherInfoByProjectID[0].id;
    }

    this.createForm();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  createForm() {
    this.PillingAddForm = this.formBuilder.group({
      // pillingRigDetails: ['', [
      //   Validators.required,
      //   Validators.minLength(1),
      //   Validators.maxLength(128)
      // ]],
      projPillingNo: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]],
      diaOfPile: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(3),
        Validators.maxLength(6)
      ]],



      pillingCutOfflevel: ['', [
        Validators.required,
        // Validators.pattern("^[0-9]*$"),
        //  Validators.pattern("/^[0-9]+\.?[0-9]*$/"),
        //  Validators.pattern("^(\d*\.)?\d+$"),
        Validators.minLength(1),
        Validators.maxLength(128)
      ]]
    });
  }
  addPilling(): void {
    debugger;
    this.projectHistory.projId = this.lstSelectedProject[0].id;//this.PillingAddForm.value.projID;
    this.projectHistory.pileNo = this.PillingAddForm.value.projPillingNo + '-' + this.projectHistory.uniqueId;
    // this.projectHistory.pillingRigDetails = this.PillingAddForm.value.pillingRigDetails;
    this.projectHistory.diaOfPile = this.PillingAddForm.value.diaOfPile;
    this.projectHistory.pillingCutOfflevel = parseFloat(this.PillingAddForm.value.pillingCutOfflevel);
    if (!this.projectHistory.pillingCutOfflevel) {
      this.messageService.show("Please Enter a valid CutOff Value", MessageType.Warn);
      return;
    }
    this.projectService.addProjectHistory(this.projectHistory)
      .pipe(first())
      .subscribe(
      data => {
        this.messageService.show("Pilling Added successfully", MessageType.Success)
      },
      error => {
        this.messageService.show(error.error.message, MessageType.Error)
      });



  }
}
