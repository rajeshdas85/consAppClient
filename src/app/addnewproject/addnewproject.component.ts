import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MessageService } from "app/_service/message.service";
import { MessageType, Project } from "app/_model/project";
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
    debugger;
    this.project.projName =  this.ProjectAddForm.value.projName;
    this.project.projDesc = this.ProjectAddForm.value.projDesc;
  
    this.project.projManagerId = this.ProjectAddForm.value.projDesc;// "5c21446351b1f00d74255334";
    this.project.projval =  this.ProjectAddForm.value.projval;

    this.project.commenceDate = new Date(moment(this.ProjectAddForm.value.commenceDate).format("YYYY-MM-DD HH:MM:ss"));//this.project.updateDate;
    this.project.completionDate = new Date(moment(this.ProjectAddForm.value.completionDate).format("YYYY-MM-DD HH:MM:ss"));

    this.project.client = this.ProjectAddForm.value.client;
    this.project.location = this.ProjectAddForm.value.location;
    this.project.updateDate = moment().utcOffset(330).format();//moment().format('YYYY-MM-DD HH:MM:ss');
    //console.log(this.project.updateDate);
    //console.log(this.project.updateDate.split('T')[1].split('+')[0]);

    //console.log(this.project.commenceDate);

    this.projectService.addProject(this.project)
      .pipe(first())
      .subscribe(
        data => {
          // console.log(data);
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
