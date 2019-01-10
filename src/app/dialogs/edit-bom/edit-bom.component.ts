import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessageService } from "app/_service/message.service";
import { ProjectService } from "app/_service/project.service";
import { first } from "rxjs/internal/operators/first";
import { MessageType, ProjectBOM } from "app/_model/project";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import * as moment from 'moment/moment';
@Component({
  selector: 'app-edit-bom',
  templateUrl: './edit-bom.component.html',
  styleUrls: ['./edit-bom.component.scss']
})
export class EditBOMComponent implements OnInit {
 private projectBOM: ProjectBOM = new ProjectBOM();

  constructor(public dialogRef: MatDialogRef<EditBOMComponent>,
    private messageService: MessageService,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);
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

  ngOnInit() {
  }

  changeBOMAmt() {
    this.data.amount = this.data.rate * this.data.qty;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  UpdateBOM(): void {
    this.projectBOM.id = this.data.id;
    this.projectBOM.desc = this.data.desc;
    this.projectBOM.qty = this.data.qty;
    this.projectBOM.rate = this.data.rate;
    this.projectBOM.amount = this.data.amount;
    //this.projectBOM.status = 0;
    let date = moment().utcOffset(330).format("DD-MM-YYYY hh:mm:ss");
    this.projectBOM.updateDate = date;

    this.projectService.updateProjectBOM(this.projectBOM)
      .pipe(first())
      .subscribe(
      data => {
        this.messageService.show("BOM Updated successfully", MessageType.Success);
      },
      error => {
        this.messageService.show(error.error.message, MessageType.Error);
      });
  }
}
