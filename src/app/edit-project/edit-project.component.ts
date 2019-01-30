import { Component, OnInit } from '@angular/core';
import { MessageService } from "app/_service/message.service";
import { ProjectService } from "app/_service/project.service";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { first } from "rxjs/internal/operators/first";
import { Project, MessageType } from "app/_model/project";
import * as moment from 'moment/moment';
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
 private project: Project = new Project();
   constructor(public dialogRef: MatDialogRef<EditProjectComponent>,
    private messageService: MessageService,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);
  }

  ngOnInit() {
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }
 onNoClick(): void {
    this.dialogRef.close();
  }
  UpdateProject(): void {
    this.project.id= this.data.id;
    this.project.commenceDate= new Date(moment(this.data.commenceDate).format("YYYY-MM-DD HH:MM:ss"));//this.data.commenceDate;
    this.project.completionDate= new Date(moment(this.data.completionDate).format("YYYY-MM-DD HH:MM:ss"));//this.data.commenceDate;//this.data.completionDate;
    this.project.projDesc= this.data.projDesc;
    this.project.projName= this.data.projName;
    this.project.projval= this.data.projval;
    this.project.location= this.data.location;
    this.project.client= this.data.client;

    this.projectService.updateProjectwithInitialVal(this.project)
      .pipe(first())
      .subscribe(
      data => {
        this.messageService.showNotification("","","Project  Updated successfully", MessageType.Success);
      },
      error => {
        this.messageService.showNotification("","",error.error.message, MessageType.Error);
      });
  }
}
