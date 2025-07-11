import {Component, inject, OnDestroy} from '@angular/core';
import {JobsService} from "./jobs.service";
import {Job} from "./job.model";
import {NgOptimizedImage} from "@angular/common";
import {FavoriteDirective} from "../favorites/favorite.directive";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FavoriteDirective
  ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnDestroy {
  private readonly jobsService: JobsService = inject(JobsService);
  private readonly subs: Subscription;
  protected jobs: Job[] = [];

  constructor() {
    this.subs = this.jobsService.getJobs().subscribe(jobs => this.jobs = jobs);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
