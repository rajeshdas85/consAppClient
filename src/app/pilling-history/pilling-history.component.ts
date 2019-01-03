import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { MessageService } from 'app/_service/message.service';
import { ProjectService } from 'app/_service/project.service';
import { AddPillingComponent } from 'app/add-pilling/add-pilling.component';
import { ProjectHistory } from 'app/_model/project';
import { first } from 'rxjs/operators';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-pilling-history',
  templateUrl: './pilling-history.component.html',
  styleUrls: ['./pilling-history.component.scss']
})
export class PillingHistoryComponent implements OnInit {
  displayedColumns: string[] = ['pileNo', 'dateOfStarting', 'dateOfEnding', 'pillingRigDetails', 'diaOfPile','casingToplevel'];
  firstProductEntry: any;
  dataSource: any;
  lstSelectedProject=[];
  uniqueId:any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog,
    public router: Router,
    private messageService: MessageService,
    private projectService: ProjectService) { }

  ngOnInit() {
     if (localStorage.getItem("selectedProject")) {
      this.lstSelectedProject.push(JSON.parse(localStorage.getItem("selectedProject")));
      console.log(this.lstSelectedProject);
    }
    if (localStorage.getItem("pHistoryView") == "P1") {
      this.uniqueId = this.lstSelectedProject[0].pillingInfoByProjectID1[0].id;
    }
    if (localStorage.getItem("pHistoryView") == "P2") {
       this.uniqueId = this.lstSelectedProject[0].pillingInfoByProjectID2[0].id;
    }
    if (localStorage.getItem("pHistoryView") == "Other") {
      this.uniqueId = this.lstSelectedProject[0].otherInfoByProjectID[0].id;
    }

    this.projectService.getAllProjectHistory(this.uniqueId).pipe(first()).subscribe(productEntry => {
      this.firstProductEntry = productEntry;
      this.dataSource = new MatTableDataSource<ProjectHistory>(this.firstProductEntry);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddPillingComponent, {
      width: '1000px'
      // ,
      // height: '500px'

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed texted');
      this.router.navigateByUrl('/projectdetails');
     // location.reload();
      // this.router.navigateByUrl('/projectdetails');
    });
  }
}
