import {Component, inject, OnDestroy} from '@angular/core';
import {JobsService} from "./jobs.service";
import {Job} from "./job.model";
import {Subscription} from "rxjs";
import {NgOptimizedImage} from "@angular/common";


@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnDestroy {
  protected readonly jobsService = inject(JobsService);
  protected jobs: Array<Job> = [];
  subs: Subscription;

  constructor() {
    this.subs = this.jobsService.getJobs().subscribe(jobs => this.jobs = jobs);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
