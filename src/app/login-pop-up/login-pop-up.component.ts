import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-login-pop-up',
  templateUrl: './login-pop-up.component.html',
  styleUrls: ['./login-pop-up.component.scss']
})
export class LoginPopUpComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  login(){
   this.dialog.closeAll();
  }
}
