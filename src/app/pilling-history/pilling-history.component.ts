import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { MessageService } from 'app/_service/message.service';
import { ProjectService } from 'app/_service/project.service';
import { AddPillingComponent } from 'app/add-pilling/add-pilling.component';
import { ProjectHistory } from 'app/_model/project';
import { first } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-pilling-history',
  templateUrl: './pilling-history.component.html',
  styleUrls: ['./pilling-history.component.scss']
})
export class PillingHistoryComponent implements OnInit {
  displayedColumns: string[] =
  [ 'srNo','pileNo', 'dateOfStarting', 'dateOfEnding','NameofContractor',
    'pillingRigDetails', 'diaOfPile','casingToplevel','existingToplevel',
    'pillingCutOfflevel','foundinglevel','emptyBoreDepth','depthOfBore',
    'BoredepthfromCTL','BoredepthfromEGL','BoredepthfromCOL',
    'Cagelengthrequired','ConcreteQuantityTherotical',
    'ConcreteQuantityCUM','boringStartTime', 'boringEndTime',
    'totalBoringTime', 
    'cageLoweringStartTime', 'cageLoweringEndTime',
    'totalTimeForCageLowering', 
    'NoofTrimePiecesrequired', 'noOfTrimePiecesUsed',
    'concretePourStartTime', 'concretePourEndTime',
    'totalConcretePourTime', 'totalNoOfShiftsWorked',
    'noOfManpowerPRC', 'noOfManpowerContractor',
   'TotalMnhoursPRC','TotalMnhoursCont'];
  firstProductEntry: any;
  dataSource: any;
  lstSelectedProject = [];
  uniqueId: any;
  @ViewChild('TABLE') table: ElementRef;
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

    this.getAllProjectHistory();

  }
  getAllProjectHistory(): void {
    this.projectService.getAllProjectHistory(this.uniqueId).pipe(first()).subscribe(productEntry => {
      this.firstProductEntry = productEntry;
      this.dataSource = new MatTableDataSource<ProjectHistory>(this.firstProductEntry);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });


  }

  ExportToPDF() {
    var data = document.getElementById('tblPillingHistory');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('PillingSheet.pdf'); // Generated PDF   
    });
  }
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'PillingSheet');
    /* save to file */
    XLSX.writeFile(wb, 'PillingSheet.xlsx');

  }
  backToProjectDetails(): void {
    this.router.navigateByUrl('/admin/projectdetails');
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddPillingComponent, {
      width: '1000px'
      // ,
      // height: '500px'

    });


    dialogRef.afterClosed().subscribe(result => {
       this.getAllProjectHistory();
      console.log('The dialog was closed texted');
      //this.router.navigateByUrl('/projectdetails');
      // location.reload();
      // this.router.navigateByUrl('/projectdetails');
    });
  }
}
