import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Project, PileEntry, ProjectRecording, ProjectHistory,ProjectBOM, ProjectMapping } from "app/_model/project";
import { environment } from "environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }

  addProject(project: Project) {
  
    //return this.http.post(`${environment.apiUrl}/projects/addProject`, project);
     return this.http.post(`/projects/addProject`, project);
  }
  addProjectEntry(pileEntry: PileEntry) {
    //return this.http.post(`${environment.apiUrl}/projects/addProjectEntry`, pileEntry);
    return this.http.post(`/projects/addProjectEntry`, pileEntry);

  }
  addProjectRecordingIngInBulk(any: any) {
      //return this.http.post(`${environment.apiUrl}/projects/addProjectRecordingIngInBulk`, any);
    return this.http.post(`/projects/addProjectRecordingIngInBulk`, any);
    }

    mapProjectUser(any: any) {
      //return this.http.post(`${environment.apiUrl}/projects/mapProjectUser`, any);
     return this.http.post(`/projects/mapProjectUser`, any);
    }

  addProjectHistory(projectHistory: ProjectHistory) {
    //return this.http.post(`${environment.apiUrl}/projects/addProjectHistory`, projectHistory);
    return this.http.post(`/projects/addProjectHistory`, projectHistory);
  }
 getAllProjectsSumTotal() {
    //return this.http.get<any[]>(`${environment.apiUrl}/projects/getAllProjectsSumTotal`);
    return this.http.get<any[]>(`/projects/getAllProjectsSumTotal`);
  }

  getAllProjects(){
    //return this.http.get<any[]>(`${environment.apiUrl}/projects/getAllProjects`);
    return this.http.get<any[]>(`/projects/getAllProjects`);

  }
  getAllProjectsCount() {
    //return this.http.get<any[]>(`${environment.apiUrl}/projects/getAllProjectsCount`);
     return this.http.get<any[]>(`/projects/getAllProjectsCount`);
    
  }
  addProjectRecording(projectRecording: ProjectRecording) {
    //return this.http.post(`${environment.apiUrl}/projects/addProjectRecording`, projectRecording);
    return this.http.post(`/projects/addProjectRecording`, projectRecording);

  }
  updateProject(project: Project) {
    //return this.http.put(`${environment.apiUrl}/projects/updateProject`, project);
    return this.http.put(`/projects/updateProject`,project);
  }

  updateProjectHistory(projectHistory: ProjectHistory) {
    //return this.http.put(`${environment.apiUrl}/projects/updateProjectHistory`, projectHistory);
    return this.http.put(`/projects/updateProjectHistory`, projectHistory);
  }


  getLastAddProject() {
    //return this.http.get<Project[]>(`${environment.apiUrl}/projects`);
    return this.http.get<Project[]>(`/projects`);
  }
  
  getAllMappingProject() {
    //return this.http.get<ProjectMapping[]>(`${environment.apiUrl}/projects/getAllMappingProject`);
    return this.http.get<ProjectMapping[]>(`/projects/getAllMappingProject`);
   
  }

  getMappingProjectByempId(empID: string) {
    // return this.http.get<any[]>(`${environment.apiUrl}/projects/getMappingProjectByempId/` + empID);
    return this.http.get<any[]>(`/projects/getMappingProjectByempId/` + empID );
  }
getProjectDtlByLoginId(projectIds:string){
  // return this.http.get<any[]>(`${environment.apiUrl}/projects/getProjectDtlByLoginId/` + projectIds);
   return this.http.get<any[]>(`/projects/getProjectDtlByLoginId/` + projectIds);

}
  deleteProjectMapping(id: string) {
    //return this.http.delete(`${environment.apiUrl}/projects/deleteProjectMapping/id/` + id);
    return this.http.delete(`/projects/deleteProjectMapping/id/` + id);
    
  }
  getAllProjectHistory(uniqueId: string) {
    //return this.http.get<ProjectHistory[]>(`${environment.apiUrl}/projects/getAllProjectHistory/uniqueId/` + uniqueId);
    return this.http.get<ProjectHistory[]>(`/projects/getAllProjectHistory/uniqueId/` + uniqueId);
  }

  getLastAddProjectEntry() {
    //return this.http.get<PileEntry[]>(`${environment.apiUrl}/projects/getLastAddProjectEntry`);
    return this.http.get<PileEntry[]>(`/projects/getLastAddProductEntry`);
  }

  getProjectRecordingDtlByPilno(pileNo: string) {
   //return this.http.get<ProjectRecording[]>(`${environment.apiUrl}/projects/pileNo/` + pileNo);
    return this.http.get<ProjectRecording[]>(`/projects/pileNo/` + pileNo);
  }
     // BOM section Start
  getAllAddedProjectBOMByProjectID(projId: string) {
    //return this.http.get<ProjectBOM[]>(`${environment.apiUrl}/projects/getAllAddedProjectBOMByProjectID/`+ projId);
    return this.http.get<ProjectBOM[]>(`/projects/getAllAddedProjectBOMByProjectID/`+ projId);
  }

   addProjectBOM(projectBOM: ProjectBOM) {
    //return this.http.post(`${environment.apiUrl}/projects/addProjectBOM`, projectBOM);
    return this.http.post(`/projects/addProjectBOM`, projectBOM);
  }

   updateProjectBOM(projectBOM: ProjectBOM) {
    //return this.http.put(`${environment.apiUrl}/projects/updateProjectBOM`, projectBOM);
    return this.http.put(`/projects/updateProjectBOM`, projectBOM);
  }
//BOM section End
}
