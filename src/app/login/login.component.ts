import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginPopUpComponent } from 'app/login-pop-up/login-pop-up.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.showLoginPopUpDialog();
  }

  showLoginPopUpDialog(): void {
   
    const dialogRef = this.dialog.open(LoginPopUpComponent, {
      width: '1000px', disableClose: true
      // ,
      // height: '450px'

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
