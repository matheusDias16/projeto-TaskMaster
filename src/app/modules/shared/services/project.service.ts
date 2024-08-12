import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../../../environments/environment';
import { Observable } from 'rxjs';

export type TTaskFull =  {
  _id?: string,
  title: string,
  project: string,
  assignedTo: string,
  completed: boolean,
  createdAt: string,
  __v: number,
}


export type TTask = {
  title: string
  assignedTo: string
}

export type TCriaProject = {
  title: string,
  description: string,
  tasks: TTask[],
}

export type Tproject = {
  _id: string,
  title: string,
  description: string,
  user: {
    _id: string,
    name: string,
    email: string,
    createdAt: string,
    __v: number
  },
  tasks:TTaskFull[],
  createdAt: string,
  __v: number
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken')!)}`,
  };

  constructor(private http: HttpClient) { }

  public getProgectsByUser(userId: string): Observable<{ projects: Tproject[] }> {
    return this.http.get<{ projects: Tproject[] }>(
      `${apiUrl}/projects?userId=${userId}`,
      { headers: this.header }
    );
  }

  public deleteProgectsByUser(projectId: string) {
    return this.http.delete(
      `${apiUrl}/projects/${projectId}`,
      { headers: this.header }
    );
  }

  public createProjects(payload: TCriaProject) {
    return this.http.post(
      `${apiUrl}/projects`, payload,
      { headers: this.header }
    );
  }

  public getShowProject(idDoProjeto: string): Observable<{project:Tproject}>  {
    return this.http.get<{project:Tproject}>(
      `${apiUrl}/projects/${idDoProjeto}`,
      { headers: this.header }
    );
  }

  public putProject(project:  Tproject) : Observable<{project:Tproject}> {
    return this.http.put<{project:Tproject}>(
      `${apiUrl}/projects/${project._id}`,
      project,
      { headers: this.header }
    );
  }
}
