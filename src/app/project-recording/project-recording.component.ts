import { Component, OnInit } from '@angular/core';
import { MessageService } from "app/_service/message.service";
import { ProjectService } from "app/_service/project.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Params } from "@angular/router";
import { MessageType, ProjectRecording } from "app/_model/project";
import { MatTableDataSource } from "@angular/material/table";
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import * as XLSX from 'xlsx';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-project-recording',
  templateUrl: './project-recording.component.html',
  styleUrls: ['./project-recording.component.scss']
})
export class ProjectRecordingComponent implements OnInit {

  displayedColumns: string[] =
  [
    'startDate', 'fromTimeOfBoring',
    'toTimeOfBoring', 'depthOfBoreFrom',
    'depthOfBoreTo', 'finalDepthOfBore', 'descriptionOfSoil'
    ,
    'RLOfThePileFrom', 'RLOfThePileTo', 'remarks', 'siteEnggId'
  ];

  lstProjectRecording: any;
  dataSource: any;
  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private messageService: MessageService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    public router: Router) { }
  // RLOfThePileFrom:{type: SchemaTypes.Double, default: 0},
  // RLOfThePileTo:{type: SchemaTypes.Double, default: 0},
  // remarks:{ type: String, default: "any"},
  // siteEnggId:{ type: String, default: "Details" },



  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.projectService.getProjectRecordingDtlByPilno(params['pileNo']))
      .subscribe(projectRecording => {
        this.lstProjectRecording = projectRecording;
        this.dataSource = new MatTableDataSource<ProjectRecording>(this.lstProjectRecording);
        console.log(this.dataSource);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        //this.messageService.show("Pilling Updated successfully", MessageType.Success)
        //  this.router.navigateByUrl('/project');
      });
  }
  backToProjectHistory(): void {
    this.router.navigateByUrl('/projecthistory');
  }

  ExportToPDF() {
    var data = document.getElementById('tblPillingRecording');
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
      pdf.save('PileRecording.pdf'); // Generated PDF   
    });
  }
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'PileRecording');
    /* save to file */
    XLSX.writeFile(wb, 'PileRecording.xlsx');

  }
}
