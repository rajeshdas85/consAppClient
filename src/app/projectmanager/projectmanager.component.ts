import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MessageService } from 'app/_service/message.service';
import { MessageType } from 'app/_model/project';
import { ProjectManagerService } from 'app/_service/project-manager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators, regExps, ConfirmValidParentMatcher, errorMessages } from 'app/_model/custom-validators';
import { ProjectManager } from 'app/_model/project-manager';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-projectmanager',
    templateUrl: './projectmanager.component.html',
    styleUrls: ['./projectmanager.component.scss']
})
export class ProjectmanagerComponent implements OnInit {
    PMRegistrationForm: FormGroup;

    confirmValidParentMatcher = new ConfirmValidParentMatcher();

    errors = errorMessages;
    projectMan = new ProjectManager();
    constructor(
        public dialogRef: MatDialogRef<ProjectmanagerComponent>,
        private messageService: MessageService,
        private projectManagerService: ProjectManagerService,
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
        this.PMRegistrationForm = this.formBuilder.group({
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
      
        this.projectMan.firstName = this.PMRegistrationForm.value.firstName;
        this.projectMan.lastName = this.PMRegistrationForm.value.lastName;
        // this.projectMan.contactNo=this.userRegistrationForm.value.contactNo;
        this.projectMan.email = this.PMRegistrationForm.value.emailGroup.email;
        this.projectMan.password = this.PMRegistrationForm.value.passwordGroup.password;
        this.projectMan.idProof = this.PMRegistrationForm.value.idProof;
        this.projectMan.photo = this.PMRegistrationForm.value.photo;
        //console.log(this.projectMan);

        this.projectManagerService.addProjectManager(this.projectMan)
            .pipe(first())
            .subscribe(
                data => {
                    this.messageService.show("Project manager added successfully.", MessageType.Success);
                },
                error => {
                    this.messageService.show("Error in adding Project manager.", MessageType.Error);
                });

    }
}

