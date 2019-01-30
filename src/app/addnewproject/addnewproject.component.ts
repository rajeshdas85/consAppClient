import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { MessageService } from "app/_service/message.service";
import { MessageType, Project, OtherInfoByProjectID, PillingInfoByProjectID1, PillingInfoByProjectID2, ProjectMapping } from "app/_model/project";
import { ProjectService } from 'app/_service/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import * as moment from 'moment/moment';
import { ConfirmValidParentMatcher, errorMessages, CustomValidators, regExps } from 'app/_model/custom-validators';
import { ProjectManagerService } from 'app/_service/project-manager.service';
import { Router } from '@angular/router';
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
import { User } from "app/_model/user";
import { EditProjectComponent } from "app/edit-project/edit-project.component";


// https://www.npmjs.com/package/ngx-mat-select-search
@Component({
  selector: 'app-addnewproject',
  templateUrl: './addnewproject.component.html',
  styleUrls: ['./addnewproject.component.scss']
})
export class AddnewprojectComponent implements OnInit {
  private project: Project = new Project();
  // lstProduct: any;
  ProjectAddForm: FormGroup;

  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  private pillingInfoByProjectID1: PillingInfoByProjectID1 = new PillingInfoByProjectID1();
  private pillingInfoByProjectID2: PillingInfoByProjectID2 = new PillingInfoByProjectID2();
  objProjectMapping: ProjectMapping;
  public projectmapping: Array<ProjectMapping> = [];
  //private otherInfoByProjectID: OtherInfoByProjectID = new OtherInfoByProjectID();


  arrPillingInfoByProjectID1 = [];
  arrPillingInfoByProjectID2 = [];
  arrOtherInfoByProjectID = [];
  lstPMName: any;
  selectedValue: string;
  errors = errorMessages;
  //lstSelectedProject = [];
  lstProject = [];

  dataSource: any;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] =
  [
    'srNo', 'id', 'projName', 'projDesc',
    'projval', 'commenceDate', 'completionDate',
    'client', 'location', 'actions'

  ];

  constructor(
    public dialogRef: MatDialogRef<AddnewprojectComponent>,
    private messageService: MessageService,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    public router: Router,
    private projectManagerService: ProjectManagerService,
  ) {
    this.createForm();
  }



  ngOnInit() {
    // this.projectManagerService.getPMByName().pipe(first()).subscribe(PMName => {
    //   this.lstPMName = PMName;

    //   this.selectedValue = this.lstPMName[0].id;
    // });
    // if (localStorage.getItem("selectedProject")) {
    //   this.lstSelectedProject.push(JSON.parse(localStorage.getItem("selectedProject")));
    //   console.log(this.lstSelectedProject);
    // }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  startEdit(id, projName, projDesc, projval, commenceDate, completionDate, client, location) {
    //console.log(element);
    const dialogRef = this.dialog.open(EditProjectComponent, {
      data: { id: id, projName: projName, projDesc: projDesc, projval: projval, commenceDate: commenceDate, completionDate: completionDate, client: client, location: location }, width: '600px', //height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        //  const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        //  this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        //  this.refreshTable();
        this.getAllProjects();
      }
    });
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

    // this.otherInfoByProjectID.desc = "";
    // this.otherInfoByProjectID.financialStatus = 0;
    // this.otherInfoByProjectID.physicalStatus = 0;
    // this.otherInfoByProjectID.rate = 0;
    // this.otherInfoByProjectID.qty = 0;
    // this.otherInfoByProjectID.amount = 0;
    // this.arrOtherInfoByProjectID.push(this.otherInfoByProjectID);

    //Assigning P1,P2 and others
    this.project.pillingInfoByProjectID1 = this.arrPillingInfoByProjectID1;
    this.project.pillingInfoByProjectID2 = this.arrPillingInfoByProjectID2;
    //this.project.otherInfoByProjectID = this.arrOtherInfoByProjectID;

    // this.project.updateDate.split('T')[1].split('+')[0]   --- "09:47:36"
    // this.project.updateDate.split('T')[1]  ---   "09:47:36+05:30"
    // moment(this.project.updateDate.split('T')[0]).format("DD-MM-YYYY")  --- "26-12-2018"
    // moment(this.project.updateDate.split('T')[0]).format("DD-MM-YYYY") +" "+ this.project.updateDate.split('T')[1].split('+')[0] --- "26-12-2018 09:47:36"

    this.projectService.addProject(this.project)
      .pipe(first())
      .subscribe(
      data => {

        if (localStorage.getItem("currentUser")) {

          let userData = JSON.parse(localStorage.getItem("currentUser"));
          // userData._id
          //Getting the Last Added Project with ID
          this.projectService.getLastAddProject().pipe().subscribe(project => {
            let projeId = project[0].id;

            this.objProjectMapping = new ProjectMapping();

            this.objProjectMapping.projectId = projeId;

            this.objProjectMapping.empId = userData._id;
            this.projectmapping.push(this.objProjectMapping);
            //mapping that project Id with Current User ID in project mapping table mapping table 
            this.projectService.mapProjectUser(this.projectmapping)
              .pipe(first())
              .subscribe(
              data => {
                this.messageService.showNotification("", "", "Project added successfully.", MessageType.Success);
              },
              error => {
                this.messageService.showNotification("", "", "Error in adding Project adding.", MessageType.Error);
              });
          });

        }


        //  this.messageService.showNotification("", "", "Project added successfully.", MessageType.Success);
        //location.reload();
        this.router.navigateByUrl('/admin/project');

        // this.projectService.getLastAddProject().pipe(first()).subscribe(product => {
        //   this.lstProduct = product;
        //   localStorage.setItem("lstProject",JSON.stringify(this.lstProduct));
        //   console.log(this.lstProduct);
        // });
        //this.alertService.success('Added Address successful');
        //  this.router.navigate(['/Paypal']);
      },
      error => {
        this.messageService.showNotification("", "", "Error in adding Project.", MessageType.Error);
      });
  }
  getAllProjects(): void {
    this.projectService.getAllProjects().pipe(first()).subscribe(lstProject => {
      this.lstProject = lstProject;
      this.dataSource = new MatTableDataSource<Project>(this.lstProject);
      // console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  changeTab(_tab) {
    if (_tab.index == 1) {
      this.getAllProjects();

    }
  }
}
