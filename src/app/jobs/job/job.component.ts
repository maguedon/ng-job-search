import {Component, effect, inject, input, InputSignal} from '@angular/core';
import {JobsService} from "../jobs.service";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {DetailedJob} from "../detailed-job.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [
    NgOptimizedImage,
    DatePipe,
    RouterLink
  ],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent {
  readonly jobId: InputSignal<number> = input.required<number>();
  private readonly jobsService: JobsService = inject(JobsService);
  protected job?: DetailedJob;

  constructor() {
    effect(() => {
      this.jobsService.getDetailedJob(this.jobId()).subscribe(j => this.job = j);
    });
  }
}
