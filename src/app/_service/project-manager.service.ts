import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ProjectManager } from 'app/_model/project-manager';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {

  constructor(private http: HttpClient) { }

  addProjectManager(projectManager: ProjectManager) {
    //return this.http.post(`${environment.apiUrl}/projectmanager/addProjectManager`, projectManager);
    return this.http.post(`/projectmanager/addProjectManager`, projectManager);
  
  
  }
  
}
