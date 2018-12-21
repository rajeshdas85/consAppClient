import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MessageService } from "app/_service/message.service";
import { MessageType } from "app/_model/project";

@Component({
  selector: 'app-addnewproject',
  templateUrl: './addnewproject.component.html',
  styleUrls: ['./addnewproject.component.scss']
})
export class AddnewprojectComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddnewprojectComponent>,
   private messageService: MessageService,
   ) {}

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  displaySaveMeg(): void {
    this.messageService.show("Project Added  BOM Below",MessageType.Success);
  }
}
