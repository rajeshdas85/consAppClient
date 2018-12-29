import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MessageService } from "app/_service/message.service";
import { MessageType, Project,  OtherInfoByProjectID, PillingInfoByProjectID1, PillingInfoByProjectID2 } from "app/_model/project";
import { ProjectService } from 'app/_service/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import * as moment from 'moment/moment';
import { ConfirmValidParentMatcher, errorMessages, CustomValidators, regExps } from 'app/_model/custom-validators';

@Component({
  selector: 'app-addnewproject',
  templateUrl: './addnewproject.component.html',
  styleUrls: ['./addnewproject.component.scss']
})
export class AddnewprojectComponent implements OnInit {
  private project: Project = new Project();
  // lstProduct: any;
  ProjectAddForm: FormGroup;

  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  private pillingInfoByProjectID1: PillingInfoByProjectID1 = new PillingInfoByProjectID1();
  private pillingInfoByProjectID2: PillingInfoByProjectID2 = new PillingInfoByProjectID2();

  private otherInfoByProjectID: OtherInfoByProjectID = new OtherInfoByProjectID();

  arrPillingInfoByProjectID1 = [];
  arrPillingInfoByProjectID2 = [];
  arrOtherInfoByProjectID = [];

  errors = errorMessages;
  constructor(
    public dialogRef: MatDialogRef<AddnewprojectComponent>,
    private messageService: MessageService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.ProjectAddForm = this.formBuilder.group({
      projName: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]],
      projDesc: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]],
      projManagerId: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]],
      projval: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(3),
        Validators.maxLength(6)
      ]],
      client: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]],
      location: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]],
      commenceDate: ['', [
        Validators.required
      ]],
      completionDate: ['', [
        Validators.required
      ]]
    });
  }

  addProject(): void {
    this.project.projName = this.ProjectAddForm.value.projName;
    this.project.projDesc = this.ProjectAddForm.value.projDesc;

    this.project.projManagerId = this.ProjectAddForm.value.projDesc;// "5c21446351b1f00d74255334";
    this.project.projval = this.ProjectAddForm.value.projval;

    this.project.commenceDate = new Date(moment(this.ProjectAddForm.value.commenceDate).format("YYYY-MM-DD HH:MM:ss"));//this.project.updateDate;
    this.project.completionDate = new Date(moment(this.ProjectAddForm.value.completionDate).format("YYYY-MM-DD HH:MM:ss"));

    this.project.client = this.ProjectAddForm.value.client;
    this.project.location = this.ProjectAddForm.value.location;
    this.project.updateDate = moment().utcOffset(330).format();//moment().format('YYYY-MM-DD HH:MM:ss');

    console.log(this.project.updateDate);
    console.log(this.project.updateDate.split('T')[1].split('+')[0]);
    //this.project.DateTest = new Date(moment(this.project.updateDate).format("YYYY-MM-DD HH:MM:ss"));//this.project.updateDate;
    //console.log(this.project.DateTest);

    //Pilling 1
  
    this.pillingInfoByProjectID1.desc = "";
    this.pillingInfoByProjectID1.financialStatus = 0;
    this.pillingInfoByProjectID1.physicalStatus = 0;
    this.pillingInfoByProjectID1.rate = 0;
    this.pillingInfoByProjectID1.qty = 0;
    this.pillingInfoByProjectID1.amount = 0;
    this.arrPillingInfoByProjectID1.push(this.pillingInfoByProjectID1);

    //Pilling 2
   
    this.pillingInfoByProjectID2.desc = "";
    this.pillingInfoByProjectID2.financialStatus = 0;
    this.pillingInfoByProjectID2.physicalStatus = 0;
    this.pillingInfoByProjectID2.rate = 0;
    this.pillingInfoByProjectID2.qty = 0;
    this.pillingInfoByProjectID2.amount = 0;
    this.arrPillingInfoByProjectID2.push(this.pillingInfoByProjectID2);

    //Others
 
    this.otherInfoByProjectID.desc = "";
    this.otherInfoByProjectID.financialStatus = 0;
    this.otherInfoByProjectID.physicalStatus = 0;
    this.otherInfoByProjectID.rate = 0;
    this.otherInfoByProjectID.qty = 0;
    this.otherInfoByProjectID.amount = 0;
    this.arrOtherInfoByProjectID.push(this.otherInfoByProjectID);

    //Assigning P1,P2 and others
    this.project.pillingInfoByProjectID1 = this.arrPillingInfoByProjectID1;
    this.project.pillingInfoByProjectID2 = this.arrPillingInfoByProjectID2;
    this.project.otherInfoByProjectID = this.arrOtherInfoByProjectID;

    // this.project.updateDate.split('T')[1].split('+')[0]   --- "09:47:36"
    // this.project.updateDate.split('T')[1]  ---   "09:47:36+05:30"
    // moment(this.project.updateDate.split('T')[0]).format("DD-MM-YYYY")  --- "26-12-2018"
    // moment(this.project.updateDate.split('T')[0]).format("DD-MM-YYYY") +" "+ this.project.updateDate.split('T')[1].split('+')[0] --- "26-12-2018 09:47:36"
     
    this.projectService.addProject(this.project)
      .pipe(first())
      .subscribe(
        data => {
          this.messageService.show("Project added successfully.", MessageType.Success);
          // this.projectService.getLastAddProject().pipe(first()).subscribe(product => {
          //   this.lstProduct = product;
          //   localStorage.setItem("lstProject",JSON.stringify(this.lstProduct));
          //   console.log(this.lstProduct);
          // });
          //this.alertService.success('Added Address successful');
          //  this.router.navigate(['/Paypal']);
        },
        error => {
          this.messageService.show("Error in adding Project.", MessageType.Error);
        });
  }
}
