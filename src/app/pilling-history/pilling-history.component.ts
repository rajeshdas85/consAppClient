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
  displayedColumns: string[] = ['pileNo', 'dateOfStarting', 'dateOfEnding', 'pillingRigDetails', 'diaOfPile'];
  firstProductEntry: any;
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog,
    public router: Router,
    private messageService: MessageService,
    private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getAllProjectHistory().pipe(first()).subscribe(productEntry => {
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
