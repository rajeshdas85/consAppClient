import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatRadioChange } from '@angular/material';
@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  // constructor(public dialogRef: MatDialogRef<ProjectDetailsComponent>) { 
     
  // }
  
  arrayRadioBtn = [
    { "name": "Yes", ID: "D1", "checked": false},
    { "name": "No",  ID: "D2", "checked": true}
]


  selectedRadioBtn: string;
  isSelectedRadioBtnYes:boolean=false;
  isAddMorePilling:boolean=false;
  constructor() { 
     
  }

  ngOnInit() {
    this.selectedRadioBtn = this.arrayRadioBtn[1].name;
  }
  addMorePilling() {
    // this.containers.push(this.containers.length);
    this.isAddMorePilling=true;
   }
   removePilling() {
    // this.containers.push(this.containers.length);
    this.isAddMorePilling=false;
   }
  radioChange(event: MatRadioChange) {
    // console.log(event);
     console.log(event.value);
     if(event.value=="Yes"){
       this.isSelectedRadioBtnYes=true;
     }
     else{
       this.isSelectedRadioBtnYes=false;
     }
    
   }
// onNoClick(): void {
//     this.dialogRef.close();
//   }
}
