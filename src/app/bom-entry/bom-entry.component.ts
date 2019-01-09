import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatRadioChange, DEC, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
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
  private projectBOM: ProjectBOM = new ProjectBOM();
  isEditOther: boolean = false;
  lstSelectedProject = [];
  displayedColumns: string[] =
  [
    'srNo', 'desc', 'rate',
    'qty', 'amount',
    'status', 'createDate', 'updateDate','actions'
  ];

  lstProjectRecording: any;
  dataSource: any;
  lstProjectBOM: any;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private messageService: MessageService,
    private projectService: ProjectService
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
  saveData() {
    if (this.amount && this.rate) {
      debugger;
      this.projectBOM.desc = this.desc;
      this.projectBOM.qty = this.qty;
      this.projectBOM.rate = this.rate;
      this.projectBOM.amount = this.amount;
      this.projectBOM.status = 0;
      this.projectBOM.srNo = this.lstProjectBOM.length + 1;
      let date = moment().utcOffset(330).format("DD-MM-YYYY hh:mm:ss");
      this.projectBOM.createDate = date;
      this.projectBOM.updateDate = date;
      this.projectService.addProjectBOM(this.projectBOM)
        .pipe(first())
        .subscribe(
        data => {
          this.messageService.show("BOM Added successfully", MessageType.Success);
          this.getAllProjectBOMData();
          this.clearAllVal();
        },
        error => {
          this.messageService.show(error.error.message, MessageType.Error);
        });
    }
    else {
      this.messageService.show('Please enter value to save', MessageType.Error);
    }

  }
}
