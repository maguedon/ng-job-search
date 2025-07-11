import {Component, input, InputSignal, inject, effect} from '@angular/core';
import {JobsService} from "../jobs/jobs.service";
import {Job} from "../jobs/job.model";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {SafeHtmlPipe} from "../utils/safe-html.pipe";

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [
    NgOptimizedImage,
    SafeHtmlPipe,
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
