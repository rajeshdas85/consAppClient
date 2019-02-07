import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatRadioChange, MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { MessageService } from 'app/_service/message.service';
import { MessageType } from 'app/_model/project';
import { ProjectManagerService } from 'app/_service/project-manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators, regExps, ConfirmValidParentMatcher, errorMessages } from 'app/_model/custom-validators';
import { first } from 'rxjs/operators';
import { User } from "app/_model/user";
import { UserService } from "app/_service/user.service";
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
import { EditUserComponent } from "app/dialogs/edit-user/edit-user.component";

@Component({
    selector: 'app-UserEntry',
    templateUrl: './UserEntry.component.html',
    styleUrls: ['./UserEntry.component.scss']
})
export class UserEntryComponent implements OnInit {
    UserRegistrationForm: FormGroup;

    confirmValidParentMatcher = new ConfirmValidParentMatcher();

    errors = errorMessages;
    userInfo = new User();
    dataSource: any;
    @ViewChild('TABLE') table: ElementRef;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    lstUser = [];

    displayedColumns: string[] =
    [
        'srNo', 'id', 'empTypeId','firstName', 'lastName', 
        'email', 'phoneNo', 'isAdmin','actions'

    ];

    constructor(
        public dialogRef: MatDialogRef<UserEntryComponent>,
        private messageService: MessageService,
        private projectManagerService: ProjectManagerService,
        private userService: UserService,
         private dialog: MatDialog,
        private formBuilder: FormBuilder
    ) {
        this.createForm();
    }

    ngOnInit() {

    }
    onNoClick(): void {
        this.dialogRef.close();
    }
    displaySaveMeg(): void {
        this.messageService.showNotification("", "", "Project Added  BOM Below", MessageType.Success);
    }

    createForm() {
        this.UserRegistrationForm = this.formBuilder.group({
            firstName: ['', [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(128)
            ]],
            lastName: ['', [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(128)
            ]],
            phoneNo: ['', [
                Validators.required,
                Validators.pattern("^[0-9]*$"),
                Validators.minLength(10),
                Validators.maxLength(10)
                // Validators.maxLength(128)
            ]],
            isAdmin: ['', [
                // Validators.required
            ]],
            empTypeId: ['', [
                Validators.required
            ]],
            // idProof: ['', [
            //     Validators.required,
            //     Validators.minLength(1),
            //     Validators.maxLength(128)
            // ]],
            emailGroup: this.formBuilder.group({
                email: ['', [
                    Validators.required,
                    Validators.email
                ]],
                confirmEmail: ['', Validators.required]
            }, { validator: CustomValidators.childrenEqual }),
            passwordGroup: this.formBuilder.group({
                password: ['', [
                    Validators.required,
                    Validators.pattern(regExps.password)
                ]],
                confirmPassword: ['', Validators.required]
            }, { validator: CustomValidators.childrenEqual })
        });
    }

    startEdit(id,empTypeId,firstName,lastName,phoneNo,isAdmin) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: { id: id, empTypeId:empTypeId,firstName: firstName, lastName: lastName, phoneNo: phoneNo, isAdmin: isAdmin }, width: '600px', //height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        //  const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        //  this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        //  this.refreshTable();
        this.getAllUsers();
      }
    });
  }
    register(): void {
        this.userInfo.firstName = this.UserRegistrationForm.value.firstName;
        this.userInfo.lastName = this.UserRegistrationForm.value.lastName;
        this.userInfo.fullName = this.userInfo.firstName + " " + this.userInfo.lastName;
        // this.userInfo.contactNo=this.UserRegistrationForm.value.contactNo;
        this.userInfo.email = this.UserRegistrationForm.value.emailGroup.email;
        this.userInfo.password = this.UserRegistrationForm.value.passwordGroup.password;
        this.userInfo.phoneNo = this.UserRegistrationForm.value.phoneNo;
        // this.userInfo.photo = this.UserRegistrationForm.value.photo;

        this.userInfo.isAdmin = this.UserRegistrationForm.value.isAdmin ? true : false;
        this.userInfo.empTypeId = this.UserRegistrationForm.value.empTypeId;

        //console.log(this.userInfo);

        this.userService.register(this.userInfo)
            .pipe(first())
            .subscribe(
            data => {
                this.messageService.showNotification("", "", "User added successfully.", MessageType.Success);
            },
            error => {
                this.messageService.showNotification("", "", "Error in adding User.", MessageType.Error);
            });

    }
    getAllUsers(): void {
        this.userService.getAll().pipe(first()).subscribe(lstUser => {
            this.lstUser = lstUser;
            this.dataSource = new MatTableDataSource<User>(this.lstUser);
            // console.log(this.dataSource);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        });
    }
    changeTab(_tab) {
        if (_tab.index == 1) {
            this.getAllUsers();
        }
    }
}

