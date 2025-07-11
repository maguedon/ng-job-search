import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Job} from './job.model';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private readonly http: HttpClient = inject(HttpClient);

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('/jobs');
  }

  getJob(jobId: number): Observable<Job> {
    return this.http.get<Job>(`/jobs/${jobId}`);
  }
}
