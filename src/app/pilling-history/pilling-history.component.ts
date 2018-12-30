import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { MessageService } from 'app/_service/message.service';
import { ProjectService } from 'app/_service/project.service';
import { AddPillingComponent } from 'app/add-pilling/add-pilling.component';
import { ProjectHistory } from 'app/_model/project';
import { first } from 'rxjs/operators';
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

//const ELEMENT_DATA: PeriodicElement[] =[];
// = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-pilling-history',
  templateUrl: './pilling-history.component.html',
  styleUrls: ['./pilling-history.component.scss']
})
export class PillingHistoryComponent implements OnInit {

  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'symbol1', 'symbol2', 'symbol3', 'symbol4', 'symbol5', 'symbol6', 'symbol7', 'symbol8', 'symbol9', 'symbol10', 'symbol11'];
  displayedColumns: string[] = ['pileNo', 'dateOfStarting', 'dateOfEnding', 'pillingRigDetails', 'diaOfPile'];
  firstProductEntry: any;
  dataSource: any;
  //arrPillingHistory = new ProjectHistory();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog,
    public router: Router,
    private messageService: MessageService,
    private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getAllProjectHistory().pipe(first()).subscribe(productEntry => {
      console.log("First");
      this.firstProductEntry = productEntry;
      console.log(this.firstProductEntry);
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
      location.reload();
      // this.router.navigateByUrl('/dashboard');
    });
  }
}
