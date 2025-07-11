import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Job} from './job.model';
import {Observable} from "rxjs";
import {DetailedJob} from "./detailed-job.model";

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private readonly http: HttpClient = inject(HttpClient);

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('/jobs');
  }

  getDetailedJob(jobId: number): Observable<DetailedJob> {
    return this.http.get<DetailedJob>(`/jobs/${jobId}`);
  }
}
