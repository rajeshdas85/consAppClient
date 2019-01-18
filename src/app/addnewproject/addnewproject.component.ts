import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSelect } from '@angular/material';
import { MessageService } from "app/_service/message.service";
import { MessageType, Project, OtherInfoByProjectID, PillingInfoByProjectID1, PillingInfoByProjectID2, EMPData } from "app/_model/project";
import { ProjectService } from 'app/_service/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import * as moment from 'moment/moment';
import { ConfirmValidParentMatcher, errorMessages, CustomValidators, regExps } from 'app/_model/custom-validators';
import { ProjectManagerService } from 'app/_service/project-manager.service';
import { Router } from '@angular/router';
import { OnDestroy } from "@angular/core";
import { AfterViewInit } from "@angular/core";
import { Subject, ReplaySubject } from "rxjs";
import { ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import { take } from "rxjs/internal/operators/take";
import { Bank, BANKS } from "app/demo-data";

// https://www.npmjs.com/package/ngx-mat-select-search
@Component({
  selector: 'app-addnewproject',
  templateUrl: './addnewproject.component.html',
  styleUrls: ['./addnewproject.component.scss']
})
export class AddnewprojectComponent implements OnInit, AfterViewInit, OnDestroy {
  private project: Project = new Project();
  // lstProduct: any;
  ProjectAddForm: FormGroup;

  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  private pillingInfoByProjectID1: PillingInfoByProjectID1 = new PillingInfoByProjectID1();
  private pillingInfoByProjectID2: PillingInfoByProjectID2 = new PillingInfoByProjectID2();

  private otherInfoByProjectID: OtherInfoByProjectID = new OtherInfoByProjectID();

   empData:EMPData[];
  arrPillingInfoByProjectID1 = [];
  arrPillingInfoByProjectID2 = [];
  arrOtherInfoByProjectID = [];
  lstPMName:any;
  selectedValue: string;
  errors = errorMessages;

  /** list of banks */
  protected banks: Bank[] = BANKS;

  /** control for the selected bank */
  public bankCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  @ViewChild('singleSelect') singleSelect: MatSelect;
    /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();



  
  /** control for the selected bank for multi-selection */
  public bankMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public bankMultiFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredBanksMulti: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  @ViewChild('multiSelect') multiSelect: MatSelect;


  constructor(
    public dialogRef: MatDialogRef<AddnewprojectComponent>,
    private messageService: MessageService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    public router: Router,
    private projectManagerService: ProjectManagerService,
  ) {
    this.createForm();
  }
ngAfterViewInit() {
  
    this.setInitialValue();
    this.setInitialMultiValue();
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
    /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialMultiValue() {
    this.filteredBanksMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
      });
  }

  protected filterBanksMulti() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankMultiFilterCtrl.value;
    if (!search) {
      this.filteredBanksMulti.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanksMulti.next(
      this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }
   /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
      });
  }

  protected filterBanks() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }
  ngOnInit() {
    this.projectManagerService.getPMByName().pipe(first()).subscribe(PMName => {
      debugger;
      this.lstPMName = PMName;
      this.empData.push(this.lstPMName);
      this.selectedValue=this.lstPMName[0].id;
    });
   
    // set initial selection
    this.bankCtrl.setValue(this.banks[10]);

    // load the initial bank list
    this.filteredBanks.next(this.banks.slice());

    // listen for search field value changes
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });


        // set initial selection
   // this.bankMultiCtrl.setValue([this.banks[10], this.banks[11], this.banks[12]]);

    // load the initial bank list
    this.filteredBanksMulti.next(this.banks.slice());

    // listen for search field value changes
    this.bankMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanksMulti();
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.ProjectAddForm = this.formBuilder.group({
      projName: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]],
      projDesc: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]],
      // projManagerId: ['', [
      //   Validators.required,
      //   Validators.minLength(1),
      //   Validators.maxLength(128)
      // ]],
      projval: ['', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(3),
        Validators.maxLength(6)
      ]],
      client: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]],
      location: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]],
      commenceDate: ['', [
        Validators.required
      ]],
      completionDate: ['', [
        Validators.required
      ]]
    });
  }

  addProject(): void {
    this.project.projName = this.ProjectAddForm.value.projName;
    this.project.projDesc = this.ProjectAddForm.value.projDesc;

    this.project.projManagerId = this.selectedValue;// "5c21446351b1f00d74255334";
    this.project.projval = this.ProjectAddForm.value.projval;

    this.project.commenceDate = new Date(moment(this.ProjectAddForm.value.commenceDate).format("YYYY-MM-DD HH:MM:ss"));//this.project.updateDate;
    this.project.completionDate = new Date(moment(this.ProjectAddForm.value.completionDate).format("YYYY-MM-DD HH:MM:ss"));

    this.project.client = this.ProjectAddForm.value.client;
    this.project.location = this.ProjectAddForm.value.location;
    this.project.updateDate = moment().utcOffset(330).format();//moment().format('YYYY-MM-DD HH:MM:ss');

    console.log(this.project.updateDate);
    console.log(this.project.updateDate.split('T')[1].split('+')[0]);
    //this.project.DateTest = new Date(moment(this.project.updateDate).format("YYYY-MM-DD HH:MM:ss"));//this.project.updateDate;
    //console.log(this.project.DateTest);

    //Pilling 1
  
    this.pillingInfoByProjectID1.desc = "";
    this.pillingInfoByProjectID1.financialStatus = 0;
    this.pillingInfoByProjectID1.physicalStatus = 0;
    this.pillingInfoByProjectID1.rate = 0;
    this.pillingInfoByProjectID1.qty = 0;
    this.pillingInfoByProjectID1.amount = 0;
    this.arrPillingInfoByProjectID1.push(this.pillingInfoByProjectID1);

    //Pilling 2
   
    this.pillingInfoByProjectID2.desc = "";
    this.pillingInfoByProjectID2.financialStatus = 0;
    this.pillingInfoByProjectID2.physicalStatus = 0;
    this.pillingInfoByProjectID2.rate = 0;
    this.pillingInfoByProjectID2.qty = 0;
    this.pillingInfoByProjectID2.amount = 0;
    this.arrPillingInfoByProjectID2.push(this.pillingInfoByProjectID2);

    //Others
 
    this.otherInfoByProjectID.desc = "";
    this.otherInfoByProjectID.financialStatus = 0;
    this.otherInfoByProjectID.physicalStatus = 0;
    this.otherInfoByProjectID.rate = 0;
    this.otherInfoByProjectID.qty = 0;
    this.otherInfoByProjectID.amount = 0;
    this.arrOtherInfoByProjectID.push(this.otherInfoByProjectID);

    //Assigning P1,P2 and others
    this.project.pillingInfoByProjectID1 = this.arrPillingInfoByProjectID1;
    this.project.pillingInfoByProjectID2 = this.arrPillingInfoByProjectID2;
    this.project.otherInfoByProjectID = this.arrOtherInfoByProjectID;

    // this.project.updateDate.split('T')[1].split('+')[0]   --- "09:47:36"
    // this.project.updateDate.split('T')[1]  ---   "09:47:36+05:30"
    // moment(this.project.updateDate.split('T')[0]).format("DD-MM-YYYY")  --- "26-12-2018"
    // moment(this.project.updateDate.split('T')[0]).format("DD-MM-YYYY") +" "+ this.project.updateDate.split('T')[1].split('+')[0] --- "26-12-2018 09:47:36"
     
    this.projectService.addProject(this.project)
      .pipe(first())
      .subscribe(
        data => {
          this.messageService.show("Project added successfully.", MessageType.Success);
          //location.reload();
          this.router.navigateByUrl('/project');
          
          // this.projectService.getLastAddProject().pipe(first()).subscribe(product => {
          //   this.lstProduct = product;
          //   localStorage.setItem("lstProject",JSON.stringify(this.lstProduct));
          //   console.log(this.lstProduct);
          // });
          //this.alertService.success('Added Address successful');
          //  this.router.navigate(['/Paypal']);
        },
        error => {
          this.messageService.show("Error in adding Project.", MessageType.Error);
        });
  }
}
