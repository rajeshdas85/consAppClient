import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProjectDetailsComponent>) { 
     
  }

  ngOnInit() {
  }
onNoClick(): void {
    this.dialogRef.close();
  }
}
