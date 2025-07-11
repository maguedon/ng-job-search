import {Component, effect, inject, input, InputSignal} from '@angular/core';
import {JobsService} from "../jobs/jobs.service";
import {Job} from "../jobs/job.model";
import {DatePipe, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [
    NgOptimizedImage,
    DatePipe
  ],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent {
  readonly jobId: InputSignal<number> = input.required<number>();
  private readonly jobsService: JobsService = inject(JobsService);
  protected job?: Job;

  constructor() {
    effect(() => {
      this.jobsService.getJob(this.jobId()).subscribe(j => this.job = j);
    });
  }
}
