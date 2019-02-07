import { Component, OnInit } from '@angular/core';
import { MessageService } from "app/_service/message.service";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { UserService } from "app/_service/user.service";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { User } from "app/_model/user";
import { first } from "rxjs/internal/operators/first";
import { MessageType } from "app/_model/project";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  private _user: User = new User();
  selected:number;
 items = [
    { id: 1, label: 'Admin' },
    { id: 2, label: 'Project Manager' },
    { id: 3, label: 'Site Engg' }
    ];
 
  constructor(public dialogRef: MatDialogRef<EditUserComponent>,
    private messageService: MessageService,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.selected = data.empTypeId;//==null?3:data.empTypeId;
  //  console.log(this.data);
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

  onChange(event) {
    this.data.isAdmin = event.checked;
    console.log(event);
  }
  
  UpdateUser(): void {
    
    this._user.id = this.data.id;
    this._user.firstName = this.data.firstName;
    this._user.lastName = this.data.lastName;
    this._user.fullName = this._user.firstName + " " + this._user.lastName;
    this._user.phoneNo = this.data.phoneNo;
    this._user.password = this.data.password == null ? null : this.data.password;
    this._user.isAdmin = this.data.isAdmin;
    this._user.id = this.data.id;
    
     if (!this.selected) {
      this.messageService.showNotification("", "", "Please select a employee Type to procced", MessageType.Error);
      return;
    }
    this._user.empTypeId=this.selected;


    this.userService.updateUser(this._user)
      .pipe(first())
      .subscribe(
      data => {
        this.messageService.showNotification("", "", "User Updated successfully", MessageType.Success);
      },
      error => {
        this.messageService.showNotification("", "", error.error.message, MessageType.Error);
      });

  }
}
