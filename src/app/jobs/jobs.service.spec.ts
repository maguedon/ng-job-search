import {TestBed} from '@angular/core/testing';

import {JobsService} from './jobs.service';
import {HttpTestingController, provideHttpClientTesting, TestRequest} from "@angular/common/http/testing";
import {provideHttpClient} from "@angular/common/http";
import {Job} from "./job.model";
import {DetailedJob} from "./detailed-job.model";

describe('JobsService', () => {
  let service: JobsService;
  let httpClient: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(JobsService);
    httpClient = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get jobs', () => {
    const expectation: Job[] = [
      {
        id: 96515,
        companyName: "Twitch",
        title: "Director - Communications",
        companyLogo: "https://interstate21.com/job-search-app/Twitch.jpg",
        reference: "96515-director-communications",
      },
      {
        id: 103528,
        companyName: "Subspace Network",
        title: "AI Partnerships & Business Development Lead",
        companyLogo: "https://interstate21.com/job-search-app/Subspace.jpg",
        reference: "103528-ai-partnerships-business-development-lead",
      }
    ];

    service.getJobs().subscribe(jobs =>
      expect(jobs).toEqual(expectation)
    );

    const req = httpClient.expectOne(`/jobs`);
    req.flush(expectation);
  });

  it('should get detailed job', () => {
    const expectation: DetailedJob =
      {
        id: 96515,
        companyName: "Twitch",
        title: "Director - Communications",
        companyLogo: "https://interstate21.com/job-search-app/Twitch.jpg",
        reference: "96515-director-communications",
        location: "USA",
        industries: ["Marketing &amp; Sales"],
        types: ["full-time"],
        description:
          "<p>Twitch is the world&#8217;s biggest live streaming service, with global communities built around gaming, entertainment, music, sports, cooking, and more. It is where thousands of communities come together for whatever, every day.</p>\n<p>We&#8217;re about community, inside and out. You&#8217;ll find coworkers who are eager to team up, collaborate, and smash (or elegantly solve) problems together. We&#8217;re on a quest to empower live communities, so if this sounds good to you, see what we&#8217;re up to on LinkedIn and Twitter, and discover the projects we&#8217;re solving on our Blog. Be sure to explore our Interviewing Guide and Instagram channel to learn how to ace our interview process.</p>\n<h2>About the Role:</h2>\n<p>The Director of Communications will lead a global team responsible for shaping the stories that are told about Twitch. You will oversee all aspects of Twitch&#8217;s global communications function; develop a global strategy, set the teams&#8217; priorities, and craft narratives and messaging for external and internal audiences alike. You will work closely with our CEO and the broader executive team to increase Twitch&#8217;s brand awareness, defend &amp; protect our reputation, and amplify our creators&#8217; stories and the unique opportunity on Twitch.</p>\n<p>You are curious about how things work, make the complex seem simple and bring compelling stories to life with few details. You&#8217;re a strong people manager with experience developing talent and managing agencies. You spot issues before they happen and will push the business proactively to protect against potential risk or exposure. You&#8217;re also a practiced storyteller who will explore new approaches to reach key audiences, including the Twitch Community, the media, regulators, advertisers, and employees. You know how to balance competing priorities and make decisions about trade offs quickly.</p>\n<p>This role will report to the CMO and be a part of the marketing leadership team.</p>\n<p>This role may be remote in the US, with a preference for location in San Francisco, CA; Los Angeles, CA; Irvine, CA; Seattle, WA; New York, NY.</p>\n<h2><strong>You Will:</strong></h2>\n<ul>\n<li>Inspire and develop a team of Comms professionals to tell cohesive and compelling narratives to press, the community, and Twitch employees</li>\n<li>Direct and implement global communications strategies that promote Twitch, our service and offerings, and the community</li>\n<li>Identify opportunities to engage creators and viewers around current events or other company/cultural or industry moments</li>\n<li>Advise on strategic business decisions and direct company response on crises and emerging issues</li>\n<li>Establish an understanding of Twitch&#8217;s community, product, and business</li>\n<li>Be a trusted, strategic advisor to peers and executives</li>\n<li>Work globally, and oversee roster of agencies</li>\n</ul>\n<h2>You Have:</h2>\n<ul>\n<li>10+ years of experience in public relations, including experience working in-house</li>\n<li>Established relationships with a broad range of media and outlets</li>\n<li>Experience leading campaigns or programs around entertainment, content or talent/creator storytelling</li>\n<li>Excellent written and oral communication skills and comfort being a company spokesperson</li>\n<li>Sound business judgment in sometimes ambiguous situations and environments</li>\n<li>Enthusiasm for Twitch and our community</li>\n</ul>\n<h2>Bonus Points:</h2>\n<ul>\n<li>Passion for creators or experience as one yourself</li>\n</ul>\n<h2>Perks:</h2>\n<ul>\n<li>Medical, Dental, Vision &amp; Disability Insurance</li>\n<li>401(k)</li>\n<li>Maternity &amp; Parental Leave</li>\n<li>Flexible PTO</li>\n<li>Amazon Employee Discount</li>\n<li>Monthly Contribution &amp; Discounts for Wellness Related Activities &amp; Programs (e.g., gym memberships, off-site massages)</li>\n</ul>\n<p><em>We are an equal opportunity employer and value diversity at Twitch. We do not discriminate on the basis of race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status.</em></p>\n<p><em>Pursuant to the San Francisco Fair Chance Ordinance, we will consider for employment qualified applicants with arrest and conviction records.</em></p>\n<p><em>Pursuant to the Los Angeles Fair Chance Ordinance, we will consider for employment qualified applicants with arrest and conviction records.</em></p>",
        publishDate: "2024-02-24 08:14:43"
      };

    service.getDetailedJob(96515).subscribe(job =>
      expect(job).toEqual(expectation)
    );

    const req: TestRequest = httpClient.expectOne(`/jobs/96515`);
    req.flush(expectation);
  });
});
