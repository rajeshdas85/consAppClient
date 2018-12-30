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

  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  private projectHistory: ProjectHistory = new ProjectHistory();
  firstProductEntry: any;

  errors = errorMessages;
  constructor(public dialogRef: MatDialogRef<AddPillingComponent>,
    private messageService: MessageService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  createForm() {
    this.PillingAddForm = this.formBuilder.group({
      projID: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]],
      projPillingNo: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]]
    });
  }
  addPilling(): void {
    this.projectHistory.projId = this.PillingAddForm.value.projID;
    this.projectHistory.pileNo = this.PillingAddForm.value.projPillingNo;
    this.projectService.addProjectHistory(this.projectHistory)
      .pipe(first())
      .subscribe(
        data => {
        
          console.log("Ok");
          this.messageService.show("Pilling Added successfully", MessageType.Success)
          this.projectService.getAllProjectHistory().pipe(first()).subscribe(productEntry => {
            console.log("First");
         
            this.firstProductEntry = productEntry;
            console.log(this.firstProductEntry);
          });
        },
        error => {
          // this.loading = false;
        });



  }
}
