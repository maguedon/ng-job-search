import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JobsComponent} from './jobs.component';
import {JobsService} from "./jobs.service";
import {of} from 'rxjs';

describe('JobsComponent', () => {
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;
  let jobsService: jasmine.SpyObj<JobsService>;


  beforeEach(async () => {
    const jobsServiceSpy = jasmine.createSpyObj('JobsService', ['getJobs']);

    await TestBed.configureTestingModule({
      imports: [JobsComponent],
      providers: [
        { provide: JobsService, useValue: jobsServiceSpy }
      ]
    })
    .compileComponents();

    jobsService = TestBed.inject(JobsService) as jasmine.SpyObj<JobsService>;
    jobsService.getJobs.and.returnValue(of([]));

    fixture = TestBed.createComponent(JobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {




    expect(component).toBeTruthy();
  });
});
