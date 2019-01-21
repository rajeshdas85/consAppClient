import { Component, OnInit, ElementRef } from '@angular/core';
import { MatDialogRef, MatSelect, MatRadioChange, MatTableDataSource } from '@angular/material';
import { MessageService } from "app/_service/message.service";
import { MessageType, Project, OtherInfoByProjectID, PillingInfoByProjectID1, PillingInfoByProjectID2, EMPData, ProjectData, ProjectMapping } from "app/_model/project";
import { ProjectService } from 'app/_service/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
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
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
// https://www.npmjs.com/package/ngx-mat-select-search

@Component({
  selector: 'app-project-user-mapping',
  templateUrl: './project-user-mapping.component.html',
  styleUrls: ['./project-user-mapping.component.scss']
})
export class ProjectUserMappingComponent implements OnInit, AfterViewInit, OnDestroy {


  dataSource: any;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  lstProjectRecording: any;
  arrProductNappping: any;
  displayedColumns: string[] =
    [
       'projectName',
      'empName', 'PM', 
      'SiteEngg','actions','id',
    ];

  PMdata: any;
  UserData: any;
  ProjectData: any;
  ProjectAddForm: FormGroup;
  JSONData: any;
  isSelectedRadioBtn: boolean = false;
  selectedRadioBtnEmp: string;

  protected _onDestroy = new Subject<void>();

  public empData: Array<EMPData> = [];

  public projectmapping: Array<ProjectMapping> = [];

  protected objProjectMapping: ProjectMapping;

  public arrUserData: Array<EMPData> = [];

  public arrProjectData: Array<ProjectData> = [];
  /** control for the selected emp */
  public empCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public empFilterCtrl: FormControl = new FormControl();

  /** list of emp filtered by search keyword */
  public filteredEmps: ReplaySubject<EMPData[]> = new ReplaySubject<EMPData[]>(1);

  @ViewChild('singleSelect') singleSelectemp: MatSelect;

  /** control for the selected emp for multi-selection */
  public projectMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public projectMultiFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredProjectsMulti: ReplaySubject<ProjectData[]> = new ReplaySubject<ProjectData[]>(1);

  @ViewChild('multiSelect') multiSelectEmp: MatSelect;

  arrayRadioBtn = [
    { "name": "ProjectManager", ID: "D1", "checked": false },
    { "name": "SiteEngg", ID: "D2", "checked": true }
  ]

  constructor(
    public dialogRef: MatDialogRef<ProjectUserMappingComponent>,
    private messageService: MessageService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    public router: Router,
    private projectManagerService: ProjectManagerService,
  ) {
    // if (localStorage.getItem("PMData")) {
    //   this.PMdata = JSON.parse(localStorage.getItem("PMData"));
    //   for (let index = 0; index < this.PMdata.length; index++) {
    //     const element = this.PMdata[index];
    //     this.empData.push(element);
    //   }
    // }

    if (localStorage.getItem("UserData")) {
      this.UserData = JSON.parse(localStorage.getItem("UserData"));
      for (let index = 0; index < this.UserData.length; index++) {
        const element = this.UserData[index];
        this.arrUserData.push(element);
      }
    }
    if (localStorage.getItem("ProjectData")) {
      this.ProjectData = JSON.parse(localStorage.getItem("ProjectData"));
      for (let index = 0; index < this.ProjectData.length; index++) {
        const element = this.ProjectData[index];
        this.arrProjectData.push(element);
      }
    }

    this.createForm();
  }

  ngOnInit() {
    this.getAllMappingProject();
    this.selectedRadioBtnEmp = this.arrayRadioBtn[0].name;

    // set initial selection
    this.empCtrl.setValue(this.arrUserData[0]);

    // load the initial bank list
    this.filteredEmps.next(this.arrUserData.slice());

    // listen for search field value changes
    this.empFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterEmps();
      });

    // load the initial bank list
    this.filteredProjectsMulti.next(this.arrProjectData.slice());

    // listen for search field value changes
    this.projectMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterProjectsMulti();
      });


  }

  getAllMappingProject(): void {
    this.projectService.getAllMappingProject().pipe(first()).subscribe(productNappping => {
      this.arrProductNappping = productNappping;
      this.dataSource = new MatTableDataSource<ProjectMapping>(this.arrProductNappping);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });


  }

  radioChange(event: MatRadioChange) {
    // console.log(event);
    // console.log(event.value);
    if (event.value == "ProjectManager") {
      this.isSelectedRadioBtn = true;
    }
    else {
      this.isSelectedRadioBtn = false;
    }

  }


  ngAfterViewInit() {
    this.setInitialValueEmp();
    this.setInitialMultiEmpValue();
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  protected setInitialMultiEmpValue() {
    this.filteredProjectsMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.multiSelectEmp.compareWith = (a: ProjectData, b: ProjectData) => a && b && a.id === b.id;
      });
  }
  protected filterProjectsMulti() {
    if (!this.arrProjectData) {
      return;
    }
    // get the search keyword
    let search = this.projectMultiFilterCtrl.value;
    if (!search) {
      this.filteredProjectsMulti.next(this.arrProjectData.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredProjectsMulti.next(
      this.arrProjectData.filter(proj => proj.projName.toLowerCase().indexOf(search) > -1)
    );
  }

  protected setInitialValueEmp() {
    this.filteredEmps
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelectemp.compareWith = (a: EMPData, b: EMPData) => a && b && a.id === b.id;
      });
  }
  protected filterEmps() {
    if (!this.arrUserData) {
      return;
    }
    // get the search keyword
    let search = this.empFilterCtrl.value;
    if (!search) {
      this.filteredEmps.next(this.arrUserData.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredEmps.next(
      this.arrUserData.filter(user => user.firstName.toLowerCase().indexOf(search) > -1)
    );
  }
startDelete(id){
 // alert("Are You sure to delete?"+id);
  this.projectService.deleteProjectMapping(id).pipe(first())
  .subscribe(
    data => {
      this.messageService.show("Project mapping  deleted successfully.", MessageType.Success);
      this.getAllMappingProject();
    },
    error => {
      this.messageService.show("Error in adding Project Mapping.", MessageType.Error);
    });

}
  onNoClick(): void {
    this.dialogRef.close();
  }

  createForm() {
    this.ProjectAddForm = this.formBuilder.group({
    });
  }

  addProjectMapping(): void {
    this.projectmapping = [];
    for (let index = 0; index < this.projectMultiCtrl.value.length; index++) {
      this.objProjectMapping = new ProjectMapping();
      const element = this.projectMultiCtrl.value[index];
      this.objProjectMapping.projectId = element.id;
      this.objProjectMapping.projectName = element.projName;
      this.objProjectMapping.empId = this.empCtrl.value.id;
      this.objProjectMapping.empName = this.empCtrl.value.firstName;

      if (this.isSelectedRadioBtn) {
        this.objProjectMapping.PM = "Yes";
        this.objProjectMapping.SiteEngg = "No";
      }
      else {
        this.objProjectMapping.PM = "No";
        this.objProjectMapping.SiteEngg = "Yes";
      }
      this.projectmapping.push(this.objProjectMapping);
    }

    this.JSONData = JSON.stringify(this.projectmapping);
    this.projectService.mapProjectUser(this.projectmapping)
      .pipe(first())
      .subscribe(
        data => {
          this.getAllMappingProject();
          this.messageService.show("Project mapping  added successfully.", MessageType.Success);
          
        },
        error => {
          this.messageService.show("Error in adding Project Mapping.", MessageType.Error);
        });

  }
}
