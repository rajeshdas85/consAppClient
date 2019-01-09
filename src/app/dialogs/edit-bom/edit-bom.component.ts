import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-bom',
  templateUrl: './edit-bom.component.html',
  styleUrls: ['./edit-bom.component.scss']
})
export class EditBOMComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditBOMComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      console.log(this.data);
    }

  ngOnInit() {
  }

}
