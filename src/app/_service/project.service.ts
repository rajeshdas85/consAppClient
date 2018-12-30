import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Project, PileEntry, ProjectRecording, ProjectHistory } from "app/_model/project";
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

  addProjectHistory(projectHistory: ProjectHistory) {
    //return this.http.post(`${environment.apiUrl}/projects/addProjectHistory`, projectHistory);
    return this.http.post(`/projects/addProjectHistory`, projectHistory);
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

  getAllProjectHistory() {
    //return this.http.get<ProjectHistory[]>(`${environment.apiUrl}/projects/getAllProjectHistory`);
    return this.http.get<ProjectHistory[]>(`/projects/getAllProjectHistory`);
  }

  getLastAddProjectEntry() {
    //return this.http.get<PileEntry[]>(`${environment.apiUrl}/projects/getLastAddProjectEntry`);
    return this.http.get<PileEntry[]>(`/projects/getLastAddProductEntry`);
  }

  getProjectRecordingDtlByPilno(pileNo: string) {
   //return this.http.get<ProjectRecording[]>(`${environment.apiUrl}/projects/pileNo/` + pileNo);
    return this.http.get<ProjectRecording[]>(`/projects/pileNo/` + pileNo);
  }
}
