import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { AuthenticationService } from "app/_service/authentication.service";
import { MessageService } from "app/_service/message.service";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { first } from "rxjs/internal/operators/first";
import { MessageType } from "app/_model/project";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  dialogRef: any;
  returnUrl: string;
  loginForm: FormGroup;
  submitted = false;
  constructor(
    // private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private spinnerService: Ng4LoadingSpinnerService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
     this.submitted = true;
    this.loginForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
   
    if (this.loginForm.invalid) {
      return;
    }
     this.spinnerService.show();
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
      data => {
         setTimeout(()=>this.spinnerService.hide(),10000);
         this.router.navigateByUrl("/admin");
         //this.spinnerService.hide();
         
        //  localStorage.setItem('currentUser', JSON.stringify(user));
        // if (localStorage.getItem("currentUser")) {
        //   this.router.navigateByUrl("/adminLayout");
        // }
        // else {
        //   this.router.navigate([this.returnUrl]);
        // }
      },
      error => {
        this.messageService.show(error.error.message, MessageType.Error);
      });

  }
}
