import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatRadioChange, DEC, MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { OtherInfoByProjectID, ProjectBOM, MessageType } from "app/_model/project";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { MessageService } from "app/_service/message.service";
import { ProjectService } from "app/_service/project.service";
import { first } from "rxjs/internal/operators/first";
import * as moment from 'moment/moment';
import { ViewChild } from "@angular/core";
import * as XLSX from 'xlsx';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ElementRef } from "@angular/core";
import { EditBOMComponent } from 'app/dialogs/edit-bom/edit-bom.component';
@Component({
  selector: 'app-bom-entry',
  templateUrl: './bom-entry.component.html',
  styleUrls: ['./bom-entry.component.scss']
})
export class BomEntryComponent implements OnInit {

  _ref: any;
  lang: string;
  exp: number;
  private otherInfoByProjectID: OtherInfoByProjectID = new OtherInfoByProjectID();

  desc: string;
  rate: number;
  qty: number;
  amount: number;
  status: number;
  title:string;
  private projectBOM: ProjectBOM = new ProjectBOM();
  isEditOther: boolean = false;
  lstSelectedProject = [];
  displayedColumns: string[] =
  [
    'id','srNo', 'title','desc', 'rate',
    'qty','updatedQty' ,'amount',
    'status', 'createDate', 'updateDate','actions'
  ];

  lstProjectRecording: any;
  dataSource: any;
  lstProjectBOM: any;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private messageService: MessageService,
    private projectService: ProjectService,
    public dialog: MatDialog,
  ) { }
  ngOnInit() {

    if (localStorage.getItem("selectedProject")) {
      this.lstSelectedProject.push(JSON.parse(localStorage.getItem("selectedProject")));
      this.projectBOM.projId = this.lstSelectedProject[0].id;
    }
    this.getAllProjectBOMData();
  }
  removeObject() {
    this._ref.destroy();
  }
  changeRateOther() {
    this.amount = this.rate * this.qty;
  }
  clearAllVal() {
    this.desc = " ";
    this.qty = 0;
    this.rate = 0;
    this.amount = 0;
  }
  getAllProjectBOMData() {
    this.projectService.getAllAddedProjectBOMByProjectID(this.projectBOM.projId).pipe(first()).subscribe(productBOM => {
      this.lstProjectBOM = productBOM;
      this.dataSource = new MatTableDataSource<ProjectBOM>(this.lstProjectBOM);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  ExportToPDF()  
  {  
    var data = document.getElementById('tblprojectBOM');  
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
      pdf.save('BOM.pdf'); // Generated PDF   
    });  
  }
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'PillingSheet');
    /* save to file */
    XLSX.writeFile(wb, 'BOM.xlsx');

  }
  
  startEdit(id,amount,desc,rate,qty,title) {
   //console.log(element);
    const dialogRef = this.dialog.open(EditBOMComponent, {
      data: {id: id, amount: amount, desc: desc, rate: rate, qty: qty,title:title}, width: '600px', //height: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
      //  const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
      //  this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
      //  this.refreshTable();
      this. getAllProjectBOMData();
      }
    });
  }
  saveData() {
    if (this.amount && this.rate) {
      this.projectBOM.desc = this.desc;
      this.projectBOM.title=this.title;
      this.projectBOM.qty = this.qty;
      this.projectBOM.rate = this.rate;
      this.projectBOM.amount = this.amount;
      //this.projectBOM.status = 0;
      this.projectBOM.srNo = this.lstProjectBOM.length + 1;
      let date = moment().utcOffset(330).format("DD-MM-YYYY hh:mm:ss");
      this.projectBOM.createDate = date;
      this.projectBOM.updateDate = date;
      this.projectService.addProjectBOM(this.projectBOM)
        .pipe(first())
        .subscribe(
        data => {
          this.messageService.showNotification("","","BOM Added successfully", MessageType.Success);
          this.getAllProjectBOMData();
          this.clearAllVal();
        },
        error => {
          this.messageService.showNotification("","",error.error.message, MessageType.Error);
        });
    }
    else {
      this.messageService.showNotification("","",'Please enter value to save', MessageType.Error);
    }

  }
}
