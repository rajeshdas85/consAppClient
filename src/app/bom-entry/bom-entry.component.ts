import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatRadioChange, DEC } from '@angular/material';
import { OtherInfoByProjectID } from "app/_model/project";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
@Component({
  selector: 'app-bom-entry',
  templateUrl: './bom-entry.component.html',
  styleUrls: ['./bom-entry.component.scss']
})
export class BomEntryComponent implements OnInit {

  _ref: any;
  lang: string;
  exp: number;
   private otherInfoByProjectID: OtherInfoByProjectID = new OtherInfoByProjectID();
   
  desc:string;
  rate:number;
  qty:number;
  amount:number;
  status:number;

  isEditOther: boolean = false;
  constructor() { }

  ngOnInit() {
  
  }
  removeObject() {
    this._ref.destroy();
  }
 changeRateOther() {
    this.amount = this.rate * this.qty;
  }
  saveData() {
     if (this.amount)
      alert(`Total Amount is: ${this.amount}`);

    // if (this.otherData.rate && this.otherData.qty && this.otherData.desc)
    //   alert(`rate: ${this.otherData.rate} & qty: ${this.otherData.qty}`);
    // else
    //   alert('Please enter value to save');
  }
}
