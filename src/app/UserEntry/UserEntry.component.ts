import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatRadioChange } from '@angular/material';
import { MessageService } from 'app/_service/message.service';
import { MessageType } from 'app/_model/project';
import { ProjectManagerService } from 'app/_service/project-manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators, regExps, ConfirmValidParentMatcher, errorMessages } from 'app/_model/custom-validators';
import { first } from 'rxjs/operators';
import { User } from "app/_model/user";
import { UserService } from "app/_service/user.service";

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

  
    constructor(
        public dialogRef: MatDialogRef<UserEntryComponent>,
        private messageService: MessageService,
        private projectManagerService: ProjectManagerService,
        private userService:UserService,
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
        this.messageService.show("Project Added  BOM Below", MessageType.Success);
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
            photo: ['', [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(128)
            ]],
            isAdmin:['', [
               // Validators.required
            ]],
            empTypeId:['', [
               Validators.required
            ]],
            idProof: ['', [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(128)
            ]],
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

    register(): void {
        this.userInfo.firstName = this.UserRegistrationForm.value.firstName;
        this.userInfo.lastName = this.UserRegistrationForm.value.lastName;
        this.userInfo.fullName = this.userInfo.firstName +" "+this.userInfo.lastName;
        // this.userInfo.contactNo=this.UserRegistrationForm.value.contactNo;
        this.userInfo.email = this.UserRegistrationForm.value.emailGroup.email;
        this.userInfo.password = this.UserRegistrationForm.value.passwordGroup.password;
        this.userInfo.idProof = this.UserRegistrationForm.value.idProof;
        this.userInfo.photo = this.UserRegistrationForm.value.photo;

        this.userInfo.isAdmin = this.UserRegistrationForm.value.isAdmin?true:false;
        this.userInfo.empTypeId  = this.UserRegistrationForm.value.empTypeId;

        //console.log(this.userInfo);

        this.userService.register(this.userInfo)
            .pipe(first())
            .subscribe(
                data => {
                    this.messageService.show("User added successfully.", MessageType.Success);
                },
                error => {
                    this.messageService.show("Error in adding User.", MessageType.Error);
                });

    }
}

